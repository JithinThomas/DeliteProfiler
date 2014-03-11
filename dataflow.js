
function createDataFlowGraph(cola, cfgDivClass, kernelClickHandler) {
	hljs.initHighlightingOnLoad();
	var cola = cola.d3adaptor();
	//var width = window.innerWidth;
	//var height = window.innerHeight;

	//var graph = d3.select("body").append("svg")
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

	var graphElements = graph
		.append('g')
		//.attr('transform', 'translate(250,250) scale(0.3)');
		//.attr('transform', 'translate(250,250) scale(1)');

	function redraw() {
		graphElements.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
		console.log(d3.event.scale)
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

	var nodes = []
	var nodeNameToId = {}
	var ops = deg.DEG.ops
	for (i in ops) {
	    var n = ops[i].kernelId;
	    if (!n) n = "undefined"
	    nodeNameToId[n] = i
	    nodes.push({id: i, name: n, inputs: ops[i].inputs, outputs: [], depth: 0})
	}

	var edges = []
	nodes.forEach(function (n, i) {
	    if (n.inputs) {
	        var id = parseInt(n.id)
	        n.inputs = n.inputs.map(function(_in) {return parseInt(nodeNameToId[_in])})
	        n.inputs.forEach(function(_in) {
	                    //edges.push({source: _in, target: id})
	                    //nodes[_in].outputs.push(id)
	                    if (nodes[_in]) {
	                    	edges.push({source: _in, target: id})
	                    	nodes[_in].outputs.push(id)
	                    }
	        })
	    }
	})

	function countNumberOfInputs(n) {
	    if (n) {
	        return edges.filter(function(e) {return (e.target == parseInt(n.id))}).length
	    }

	    return 0
	}

	function countNumberOfOutputs(n) {
	    if (n) {
	        return edges.filter(function(e) {return (e.source == parseInt(n.id))}).length
	    }

	    return 0
	}

	nodes = nodes.map(function(n) {
	    n["numInputs"] = countNumberOfInputs(n);
	    n["numOutputs"] = countNumberOfOutputs(n);
	    return n;
	})

	calcDepthOfNodes()

	function calcDepthOfNodes() {
	    var startingNodes = nodes.filter(function(n) {return (n != undefined) && (n.numInputs == 0)})
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

	function colorNode(n) {
	    if (n.numInputs > 0) {
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
		console.log(p)
		console.log("width " + p.width())
		console.log("height " + p.height())
		return [p.width(), p.height()];
	}

	cola
	    .linkDistance(150)
	    .avoidOverlaps(true)
	    .flowLayout('y')
	    //.size([width, height])
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
	    //.on("click", function(d) {alert(d.id)})
	    .on("click", function(d) { kernelClickHandler([1]) })
	    .attr("class", "dataflow-kernel")
	    .call(cola.drag);

	var label = graphElements.selectAll(".label")
	    .data(nodes)
	    .enter().append("text")
	    .attr("class", "label")
	    .text(function (d) { return d.name; })
	    //.on("click", function(d) {alert(d.id)})
	    .on("click", function(d) { kernelClickHandler([1]) })
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

	function controller(dct)
	{
		this.nodeNameToId = dct;
		this.highlightNode = highlightNode;
		this.unhighlightNode = unhighlightNode;

		function highlightNode(nodeName) {
			if (nodeName in nodeNameToId) {
				var nodeId = parseInt(nodeNameToId[nodeName])
				highlightNodeBorder(nodeId)
			}
		}

		function unhighlightNode(nodeName) {
			if (nodeName in nodeNameToId) {
				var nodeId = parseInt(nodeNameToId[nodeName])
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

