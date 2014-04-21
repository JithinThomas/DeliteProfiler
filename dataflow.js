
function createDataFlowGraph(cola, destinationDivElem, dataModel, viewState, config) {
	hljs.initHighlightingOnLoad();
	var cola = cola.d3adaptor();
	var nodes = dataModel["nodes"]
	var nodeNameToId = dataModel["nodeNameToId"]

	// Filter out the nodes that need to displayed as per the config
	//updateInputsDataOfWhileLoops(nodes)

	var res = filterNodes(nodes)
	var nodesToDisplay = res.nodesToDisplay
	var nodeIdToDisplayIndex = res.nodeIdToDisplayIndex

	var edges = computeEdges(nodesToDisplay, nodeIdToDisplayIndex)

	function updateInputsDataOfWhileLoops(nodes) {
		function helper(ns) {
			var inputs = []
			var outputs = []
			ns.forEach(function(n) {
				inputs = inputs.concat(n.inputs)
				outputs = outputs.concat(n.outputs)
			})

			return {"inputs": inputs, "outputs": outputs}
		}

		nodes.filter(function(n) {return n.type == "WhileLoop"})
			.forEach(function(n) {
			 	updateInputsDataOfWhileLoops(n.condOps)
			 	updateInputsDataOfWhileLoops(n.bodyOps)

			 	tmp = helper(n.condOps)
			 	n.inputs = n.inputs.concat(tmp.inputs)
			 	n.outputs = n.inputs.concat(tmp.outputs)

			 	tmp = helper(n.bodyOps)
			 	n.inputs = n.inputs.concat(tmp.inputs)
			 	n.outputs = n.inputs.concat(tmp.outputs)
		})
	}

	function filterNodes(nodes) {
		// TODO: We would need to adjust the edges based on the level
		// eg: If x1 depends on x2, which is an inner component of WhileLoop x3,
		// then the edge should be from x3 to x1. Does that sound right?

		var nodeIdToDisplayIndex = {}
		var nodesToDisplay = nodes.filter(function(n) {return (n.type != "InternalNode")})
		/*
		var tmp = nodes.filter(function(n) {return (n.type != "InternalNode") && (n.level == 0)})
		var nodesToDisplay = []
		nodesToDisplay = nodesToDisplay.concat(tmp)
		tmp.forEach(function(n) {
			n.inputs.map(function(i) {return nodes[i]}).forEach(function(m) {if (m.level != 0) {nodesToDisplay.push(m)}})
			n.outputs.map(function(i) {return nodes[i]}).forEach(function(m) {if (m.level != 0) {nodesToDisplay.push(m)}})
		})
		*/

		nodesToDisplay.forEach(function(n, i) {nodeIdToDisplayIndex[n.id] = i})

		return {"nodesToDisplay": nodesToDisplay, "nodeIdToDisplayIndex": nodeIdToDisplayIndex}
	}

	function toDisplayIndex(nodeId) {
		return nodeIdToDisplayIndex[nodeId]
	}

	function computeEdges(nodes, nodeIdToDisplayIndex) {
		var edges = []
		nodes.forEach(function (n) {
			n.inputs.forEach(function(m) {
				edges.push({source: toDisplayIndex(m), target: toDisplayIndex(n.id)})
			})
		})

		return edges
	}

	var graph = d3.select(destinationDivElem).append("svg")
		.attr('class', 'dataflowSvg')
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("pointer-events", "all");

	graph.append('rect')
		.attr('class', 'background')
		.attr('width', "100%")
		.attr('height', "100%")
		.on("click", function() {$(".dataflow-kernel").fadeTo(0, 1)})
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
	    var startingNodes = nodesToDisplay.filter(function(n) {return (n != undefined) && (n.numInputs == 0) && (n.controlDeps) && (n.antiDeps)})
	    startingNodes.forEach(function(n1) {
	        n1.depth = 0
	        getChildren(n1).forEach(function(n2) { updateDepth(n2, 1)})
	    })
	}

	function getChildren(n) {
	    return n.outputs.map(function(id) {
	    	var displayId = toDisplayIndex(id)
	    	return nodesToDisplay[displayId]
	    });
	}

	function updateDepth(node, depth) {
	    if (node.depth < depth) {
	        node.depth = depth
	        getChildren(node).forEach(function (n) {
	            updateDepth(n, depth + 1)
	        })
	    }
	}

	// TODO: User should have the option to choose whether to include datadeps, antideps, control deps, etc. in color coding
	//		 Need to rewrite the function to consider the currently selected mode and counts of all these 3 types of deps 
	//		 when determining color
	function colorNodeBasedOnDataDeps(n) {
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

	var maxTimeTakenByAKernel = nodesToDisplay.map(function(n) {return n.percentage_time}).sort(function(a,b) {return b - a})[1]
	var colorNodeBasedOnTimeTaken = d3.scale.linear()
								    .domain([0, maxTimeTakenByAKernel])
								    .range(["white", "red"]);

	var maxMemUsageByAKernel = nodesToDisplay.map(function(n) {return n.memUsage}).sort(function(a,b) {return b - a})[1]
	var colorNodeBasedOnMemUsage = d3.scale.linear()
							    	.domain([0, maxMemUsageByAKernel])
								    .range(["white", "red"]);						  

	var constraints = []
	function generateConstraints() {
	    edges.map(function(e) {return {source: nodesToDisplay[e.source], target: nodesToDisplay[e.target]}})
	         .forEach(function(e) {
	            var s = e.source
	            var t = e.target
	            var minDiffInY = (t.depth - s.depth) * 15
	            constraints.push({"axis": "y", "left": toDisplayIndex(s.id), "right": toDisplayIndex(t.id), "gap": minDiffInY})
	         })
	}

	generateConstraints()

	function getColaDimensions() {
		var p = $('.dataflowSvg').parent()
		return [p.width(), p.height()];
	}

	cola
	    .linkDistance(150)
	    .avoidOverlaps(true)
	    .flowLayout('y')
	    .size(getColaDimensions())
	    .nodes(nodesToDisplay)
	    .links(edges)
	    .constraints(constraints)
	    .jaccardLinkLengths();

	var link = graphElements.selectAll(".link")
	    .data(edges)
	    .enter().append("line")
	    .attr("class", "link");

	var margin = 6, pad = 12;
	var node = graphElements.selectAll(".node")
	    .data(nodesToDisplay)
	    .enter().append("rect")
	    .attr("fill", colorNodeBasedOnDataDeps)
	    .attr("rx", 5).attr("ry", 5)
	    .attr("nodeId", function(d) {return d.id})
	    .on("click", nodeClickHandler)
	    .attr("class", "dataflow-kernel")
	    .call(cola.drag);

	var label = graphElements.selectAll(".label")
	    .data(nodesToDisplay)
	    .enter().append("text")
	    .attr("class", "label")
	    .text(function (d) { return d.name; })
	    .on("click", nodeClickHandler)
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
		        
		        vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, 5);})
	        .attr("x1", function (d) { return d.sourceIntersection.x; })
	        .attr("y1", function (d) { return d.sourceIntersection.y; })
	        .attr("x2", function (d) { return d.arrowStart.x; })
	        .attr("y2", function (d) { return d.arrowStart.y; });

	    label.attr("x", function (d) { return d.x })
	         .attr("y", function (d) { return d.y + (margin + pad) / 2 });
	});

	function nodeClickHandler(node) {
		var sc = node.sourceContext
		config.highlightLineInEditor(sc.file, sc.line)
		config.populateKernelInfoTable(node)
		highlightNeighbors(node)
	}

	function highlightNeighbors(node) {
		var arr = getNeighbors(node)
		arr.push(node.id)
		highlightNodes(arr)
	}

	function getNeighbors(node) {
		var neighbors = []
		if (node.type == "WhileLoop") {
			neighbors = neighbors.concat(node.condOps.map(function(n) {return n.id}))
			neighbors = neighbors.concat(node.bodyOps.map(function(n) {return n.id}))
		} else {
			neighbors = neighbors.concat(node.inputs)
			neighbors = neighbors.concat(node.outputs)
		}

		return neighbors
	}

	function highlightNodes(nodeIds) {
		$(".dataflow-kernel").fadeTo(0, 0.1)
		var s = nodeIds.reduce(function(p,c,i,a) {return p + "[nodeId=" + c + "],"}, "")
		s = s.substring(0,s.length - 1)
		$(s).fadeTo(0, 1)
	}

	function controller()
	{
		this.highlightNode = highlightNode;
		this.unhighlightNode = unhighlightNode;
		this.changeColoringScheme = changeColoringScheme;
		this.markNeighbors = markNeighbors

		function highlightNode(nodeId) {
			var n = $(".dataflow-kernel")[toDisplayIndex(nodeId)]
			n.setAttribute("stroke-width", "12px")
		}

		function unhighlightNode(nodeId) {
			var n = $(".dataflow-kernel")[toDisplayIndex(nodeId)]
			n.setAttribute("stroke-width", "0px")
		}

		function markNeighbors(nodeId) {
			var node = nodes[nodeId]
			highlightNeighbors(node)
		}

		function changeColoringScheme(scheme) {
			if (scheme == "datadeps") {
				graphElements.selectAll(".dataflow-kernel")
			    			 .attr("fill", function(d) {return colorNodeBasedOnDataDeps(d)})
			} else if (scheme == "time") {
				graphElements.selectAll(".dataflow-kernel")
			    			 .attr("fill", function(d) {return colorNodeBasedOnTimeTaken(d.percentage_time)})
			} else if (scheme == "memUsage") {
				graphElements.selectAll(".dataflow-kernel")
			    			 .attr("fill", function(d) {return colorNodeBasedOnMemUsage(d.memUsage)})
			}
		}
	}

	return new controller()
}

