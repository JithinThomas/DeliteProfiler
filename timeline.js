
var rectHeight = 20;

function createTimeline(timelineDivClass, profileData, config) {
	var highlightNodeOnGraphView = config.markGraphNode
	items = [].concat.apply([], profileData.timelineData)

	///*
	var table = d3.select(timelineDivClass).append("table")
	    .attr("class", "tooltip")
	    .attr("position", "absolute")
	    .style("opacity", 0);

	table.append("col")
		.style("width", "60%")

	table.append("col")
		.style("width", "40%")
	//*/

	var columns = ["name", "value"]
	var datapoints = ["name", "target", "type", "# runs", "time", "% of tot time", "mem_alloc"]
	var valuesOfDataPoints = ["Generic", "Scala", "MultiLoop", "3", "40s", "30%", "164 MB"]
	var data = []
	for (i in datapoints) {
		data.push({name: datapoints[i], value: valuesOfDataPoints[i]})
	}

	function tabulate(data, columns) {
		/*
		var table = d3.select(timelineDivClass).append("table")
		    .attr("class", "tooltip")
		    .attr("position", "absolute")
		    .style("opacity", 0);

		table.append("col")
			.style("width", "60%")

		table.append("col")
			.style("width", "40%")
		*/

		// In the next statement, any non-empty array can be used as input to 'data'
		// Refer to http://stackoverflow.com/questions/14514776/updating-an-html-table-in-d3-js-using-a-reusable-chart
		table.selectAll('thead').data([0]).enter().append('thead');
		var thead = table.select('thead');

		table.selectAll('tbody').data([0]).enter().append('tbody');
		var tbody = table.select('tbody');

		// create a row for each object in the data
		var rows = tbody.selectAll("tr")
			.data(data)
			.enter()
			.append("tr");

		// create a cell in each row for each column
		var cells = rows.selectAll("td")
			.data(function(row) {
		    	return columns.map(function(column) {
		        	return {column: column, value: row[column]};
		    	});
			})
			.enter()
			.append("td")
			.attr("class", "tooltipValue")
		  	.text(function(d) { return d.value; });

		return table;
	}

	function getDisplayDataForNode(node) {
		console.log(node)
		var data = [node.name,
					node.target,
					node.type,
					node.num_of_runs,
					node.time,
					node.percentage_time,
					"NA"]
		return data
	}
	  
	// TODO: i.  Find the number of lanes and generate their names automatically
	//		 ii. Find the values for timeBegin and timeEnd automatically
	var lanes = ["T0", "T1","T2","T3", "T4"],
		numLanes = lanes.length,
		timeBegin = 2500,
		timeEnd = 512800;

	var parentDiv = $('#timeline')

	var m = [20, 15, 15, 120], //top right bottom left
		chartWidth = 2000,	// TODO: Set the width of the timeline view dynamically
		chartHeight = parentDiv.height();

	//scales
	var x = d3.scale.linear()
			.domain([timeBegin, timeEnd + 50])
			.range([m[3], chartWidth]);

	var y = d3.scale.linear()
			.domain([0, numLanes])
			.range([0, chartHeight]);
	
	var div2 = d3.select(timelineDivClass)
				.append("div")
				.attr("float", "right")
				.attr("class", "timeLineWrapper")

	//console.log(div2)

	$('timeLineWrapper').css("width", "" + parentDiv.width() + "px")

	var chart = div2
				.append("svg")
				.attr("width", chartWidth)
				.attr("class", "chart");

	//console.log($('.chart').width())

	var timelineGraph = chart.append("g")
				.attr("width", chartWidth)
				.attr("class", "mini");

	function mousemove(d) {
        d3.select("table")
          .style("left", d3.select(this).attr("x") + "px")     
    	  .style("top", (parseFloat(d3.select(this).attr("y")) + rectHeight + 1) + "px");
    }

  	function mouseover(p) {
      	d3.select("table").transition()
          .duration(500)
          .style("opacity", 1);
      	d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
      	d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });

      	/*
      	console.log(p.id)
      	var displayDataForNode = getDisplayDataForNode(profileData.dependencyData.nodes[p.id])
      	var data = []
		for (i in datapoints) {
			data.push({name: datapoints[i], value: displayDataForNode[i]})
		}
		*/

      	tabulate(data, columns)
  	}

  	function mouseout() {
      	d3.select("table").transition()
          .duration(500)
          .style("opacity", 1e-6);
  	}

  	//console.log(timelineGraph)

	//timeline lanes and texts
	timelineGraph.append("g").selectAll(".laneLines")
		.data(items)
		.enter().append("line")
		.attr("x1", m[3])
		.attr("y1", function(d) {return y(d.lane + 0.5);})
		.attr("x2", chartWidth)
		.attr("y2", function(d) {return y(d.lane + 0.5);})
		//.on("mouseover", mouseover)
		//.on("mouseout", mouseout)
		//.on("mousemove", mousemove)
		.attr("stroke", "black");

	timelineGraph.append("g").selectAll(".laneText")
		.data(lanes)
		.enter().append("text")
		.text(function(d) {return d;})
		.attr("x", m[3] - 60)
		.attr("y", function(d, i) {return y(i + .5);})
		.attr("dy", ".5ex")
		.attr("text-anchor", "end")
		.attr("class", "laneText");

	//timeline item rects
	timelineGraph.append("g").selectAll("miniItems")
		.data(items)
		.enter().append("rect")
		.attr("class", function(d) {return "miniItem" + d.lane;})
		.attr("x", function(d) {return x(d.start);})
		.attr("y", function(d) {return y(d.lane + .5) - rectHeight/2;})
		.attr("width", function(d) {return x(d.end) - x(d.start);})
		.attr("height", rectHeight)
		//.attr("id", function(d) {return d.id})
		.attr("id", function(d) {return d.id})
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
		.on("click", selectNode)
		.on("contextmenu", function(data, index) {
		    console.log("ContextMenu event fired!!")
		    //d3.event.preventDefault();
		});

	/*
	//timeline labels
	var minDurationReqForDisplayingLabel = 30
	var eventsWithLabel = items.filter(function(d) {return (d.end - d.start) >= minDurationReqForDisplayingLabel})
	timelineGraph.append("g").selectAll(".miniLabels")
		.data(eventsWithLabel)
		.enter().append("text")
		.text(function(d) {return d.id;})
		//.text(function(d) {return d.name;})
		.attr("x", function(d) {return (x(d.start) + x(d.end))/2;})
		.attr("y", function(d) {return y(d.lane + .5);})
		.attr("dy", ".5ex")
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
		.on("click", selectNode)
		.attr("text-anchor", "middle");
	*/

	function selectNode(d) {
		highlightNodeOnGraphView(d.id)
	}

	function scrollTimeLine(numPixels) {
		$('.timeLineWrapper').scrollleft(numPixels)
	}
}