
function createDataFlowGraph(cola, cfgDivClass, kernelClickHandler, dataModel) {
	hljs.initHighlightingOnLoad();
	var cola = cola.d3adaptor();
	var nodes = dataModel["nodes"]
	var nodeNameToId = dataModel["nodeNameToId"]
	var edges = dataModel["edges"]

	var graph = d3.select(cfgDivClass).append("svg")
		.attr('class', 'dataflowSvg')
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("pointer-events", "all");

	graph.append('rect')
		.attr('class', 'background')
		.attr('width', "100%")
		.attr('height', "100%")
		.call(d3.behavior.zoom().on("zoom", redraw));

	var graphElements = graph.append('g')

	function redraw() {
		graphElements.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
	}

	graph.append('svg:defs').append('svg:marker')
		.attr('id', 'end-arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 8)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.append('svg:path')
		.attr('d', 'M0,-5L10,0L0,5L2,0')
		.attr('stroke-width', '0px')
		.attr('fill', '#000');

	calcDepthOfNodes()

	function calcDepthOfNodes() {
	    //var startingNodes = nodes.filter(function(n) {return (n != undefined) && (n.numInputs == 0)})
	    var startingNodes = nodes.filter(function(n) {return (n != undefined) && (n.numInputs == 0) && (n.controlDeps) && (n.antiDeps)})
	    startingNodes.forEach(function(n1) {
	        n1.depth = 0
	        getChildren(n1).forEach(function(n2) {updateDepth(n2, 1)})
	    })
	}

	function updateDepth(node, depth) {
	    if (node.depth < depth) {
	        node.depth = depth
	        getChildren(node).forEach(function (n) {
	            updateDepth(n, depth + 1)
	        })
	    }
	}

	function getChildren(n) {
	    return n.outputs.map(function(i) {return nodes[i]});
	}

	// TODO: User should have the option to choose whether to include datadeps, antideps, control deps, etc. in color coding
	//		 Need to rewrite the function to consider the currently selected mode and counts of all these 3 types of deps 
	//		 when determing color
	function colorNode(n) {
	    if ((n.numInputs > 0) || ((n.controlDeps) && (n.controlDeps.length > 0)) || ((n.antiDeps) && (n.antiDeps.length > 0))) {
	        if (n.numOutputs > 0){
	            return "orange"
	        }
	        return "red"
	    } else {    // numInputs == 0
	        if (n.numOutputs > 0) {
	            return "green"
	        } else {
	            return "lightblue"
	        }
	    }
	}

	var constraints = []
	function generateConstraints1() {
	    edges.map(function(e) {return {source: nodes[e.source], target: nodes[e.target]}})
	         .forEach(function(e) {
	            var s = e.source
	            var t = e.target
	            var minDiffInY = (t.depth - s.depth) * 15
	            constraints.push({"axis": "y", "left": s.id, "right": t.id, "gap": minDiffInY})
	         })
	}

	function generateConstraints2() {
	    nodes.forEach(function(n1) {
	        nodes.forEach(function(n2) {
	            if (n1.depth < n2.depth) {
	                var minDiffInY = (n2.depth - n1.depth) * 15
	                constraints.push({"axis": "y", "left": n1.id, "right": n2.id, "gap": minDiffInY})
	            } else if (n1.depth > n2.depth) {
	                var minDiffInY = (n1.depth - n2.depth) * 15
	                constraints.push({"axis": "y", "left": n2.id, "right": n1.id, "gap": minDiffInY})
	            }
	        })
	    })
	}

	generateConstraints1()

	function getColaDimensions() {
		var p = $('.dataflowSvg').parent()
		//console.log(p)
		//console.log("width " + p.width())
		//console.log("height " + p.height())
		return [p.width(), p.height()];
	}

	cola
	    .linkDistance(150)
	    .avoidOverlaps(true)
	    .flowLayout('y')
	    .size(getColaDimensions())
	    .nodes(nodes)
	    .links(edges)
	    .constraints(constraints)
	    .jaccardLinkLengths();

	var link = graphElements.selectAll(".link")
	    .data(edges)
	    .enter().append("line")
	    .attr("class", "link");

	var margin = 6, pad = 12;
	var node = graphElements.selectAll(".node")
	    .data(nodes)
	    .enter().append("rect")
	    .attr("fill", function(d) {return colorNode(d)})
	    .attr("rx", 5).attr("ry", 5)
	    .on("click", function(d) { console.log(d) })
	    .attr("class", "dataflow-kernel")
	    .call(cola.drag);

	var label = graphElements.selectAll(".label")
	    .data(nodes)
	    .enter().append("text")
	    .attr("class", "label")
	    .text(function (d) { return d.name; })
	    .on("click", function(d) { console.log(d) })
	    .call(cola.drag)
	    .each(function (d) {
	        var b = this.getBBox();
	        var extra = 2 * margin + 2 * pad;
	        d.width = b.width + extra;
	        d.height = b.height + extra;
	    });

	cola.start(20, 20, 20).on("tick", function () {
	    node.each(function (d) { d.innerBounds = d.bounds.inflate(-margin); })
	        .attr("x", function (d) { return d.innerBounds.x; })
	        .attr("y", function (d) { return d.innerBounds.y; })
	        .attr("width", function (d) { return d.innerBounds.width(); })
	        .attr("height", function (d) { return d.innerBounds.height(); });

	    link.each(function (d) {
		        if (d.source === d.target) {
		            // self edge... need to do something better here.
		            d.sourceIntersection = { x: d.source.x, y: d.source.y };
		            d.arrowStart = { x: d.target.x, y: d.target.y };
		            return;
		        }
		        vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, 5);
		        if (isIE()) this.parentNode.insertBefore(this, this);})
	        .attr("x1", function (d) { return d.sourceIntersection.x; })
	        .attr("y1", function (d) { return d.sourceIntersection.y; })
	        .attr("x2", function (d) { return d.arrowStart.x; })
	        .attr("y2", function (d) { return d.arrowStart.y; });

	    label.attr("x", function (d) { return d.x })
	         .attr("y", function (d) { return d.y + (margin + pad) / 2 });
	});

	function isIE() { 
		return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 
	}

	function parseIntWrapper(n) {
		return n
	}

	function controller(dct)
	{
		this.nodeNameToId = dct;
		this.highlightNode = highlightNode;
		this.unhighlightNode = unhighlightNode;

		function highlightNode(nodeName) {
			if (nodeName in nodeNameToId) {
				var nodeId = parseIntWrapper(nodeNameToId[nodeName])
				highlightNodeBorder(nodeId)
			}
		}

		function unhighlightNode(nodeName) {
			if (nodeName in nodeNameToId) {
				var nodeId = parseIntWrapper(nodeNameToId[nodeName])
				unhighlightNodeBorder(nodeId)
			}
		}

		function highlightNodeBorder(nodeId) {
			var n = $(".dataflow-kernel")[nodeId]
			n.setAttribute("stroke-width", "12px")

			return n
		}

		function unhighlightNodeBorder(nodeId) {
			var n = $(".dataflow-kernel")[nodeId]
			n.setAttribute("stroke-width", "0px")
		}
	}

	return new controller(nodeNameToId)
}

