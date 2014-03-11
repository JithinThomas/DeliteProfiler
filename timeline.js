
var rectHeight = 20;

function createTimeline(timelineDivClass, selectKernelNodeOnCfg, items) {
	var table = d3.select(timelineDivClass).append("table")
	    .attr("class", "tooltip")
	    .attr("position", "absolute")
	    .style("opacity", 0);

	  table.append("col")
	  	.style("width", "60%")

	  table.append("col")
	  	.style("width", "40%")


	  var columns = ["name", "value"]
	  var datapoints = ["target", "type", "# runs", "time", "% of tot time", "mem_alloc"]
	  var valuesOfDataPoints = ["Scala", "MultiLoop", "3", "40s", "30%", "164 MB"]
	  var data = []
	  for (i in datapoints) {
	  	data.push({name: datapoints[i], value: valuesOfDataPoints[i]})
	  }

	  function tabulate(data, columns) {
	  	// In the next statement, any non-empty array can be used as input to 'data'
	  	// Refer to http://stackoverflow.com/questions/14514776/updating-an-html-table-in-d3-js-using-a-reusable-chart
	  	table.selectAll('thead').data([0]).enter().append('thead');
	  	var thead = table.select('thead');

	  	table.selectAll('tbody').data([0]).enter().append('tbody');
	  	var tbody = table.select('tbody');

	  	/*
	    	// append the header row
	    	thead.selectAll('tr').data([0]).enter().append("tr")
	        	.selectAll("th")
	        	.data(columns)
	        	.enter()
	        	.append("th")
	          .text(function(column) { return column; });
	  	*/

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
	  
	//var lanes = ["T1","T2","T3"],
	var lanes = ["TO", "T1","T2","T3"],
		numLanes = lanes.length,
		/*
		items = [{"lane": 0, "id": "x1", "start": 5, "end": 205},
				{"lane": 0, "id": "x2", "start": 265, "end": 420},
				{"lane": 0, "id": "x3", "start": 580, "end": 615},
				{"lane": 0, "id": "x4", "start": 620, "end": 900},
				{"lane": 0, "id": "x5", "start": 960, "end": 1265},
				{"lane": 0, "id": "x6", "start": 1270, "end": 1365},
				{"lane": 0, "id": "x7", "start": 1370, "end": 1640},
				{"lane": 0, "id": "x8", "start": 1645, "end": 1910},
				{"lane": 1, "id": "x9", "start": 300, "end": 530},
				{"lane": 1, "id": "x10", "start": 550, "end": 700},
				{"lane": 1, "id": "x11", "start": 710, "end": 790},
				{"lane": 1, "id": "x12", "start": 800, "end": 1180},
				{"lane": 1, "id": "x13", "start": 1190, "end": 1330},
				{"lane": 1, "id": "x14", "start": 1340, "end": 1560},
				{"lane": 1, "id": "x15", "start": 1610, "end": 1860},
				{"lane": 1, "id": "x16", "start": 1870, "end": 1900},
				{"lane": 1, "id": "x17", "start": 1910, "end": 1920},
				{"lane": 1, "id": "x18", "start": 1925, "end": 1985},
				{"lane": 1, "id": "x19", "start": 1990, "end": 1995},
				{"lane": 2, "id": "x20", "start": 10, "end": 670},
				{"lane": 2, "id": "x21", "start": 690, "end": 900},
				{"lane": 2, "id": "x22", "start": 920, "end": 1380},
				{"lane": 2, "id": "x23", "start": 1390, "end": 1890},
				{"lane": 2, "id": "x24", "start": 1900, "end": 1945}]
		*/
		//timeBegin = 0,
		//timeEnd = 2000;
		timeBegin = 2500,
		timeEnd = 512800;

	var parentDiv = $('.timeline')
	//console.log(parentDiv.width())
	//console.log(parentDiv.height())
	var m = [20, 15, 15, 120], //top right bottom left
		//chartWidth = parentDiv.width(),
		chartWidth = 92000,
		chartHeight = parentDiv.height();

	//scales
	var x = d3.scale.linear()
			.domain([timeBegin, timeEnd + 50])
			.range([m[3], chartWidth]);
			//.range([m[3], 1100 - m[1] + 20]);
	var y = d3.scale.linear()
			.domain([0, numLanes])
			.range([0, chartHeight]);

	/*
	var div1 = d3.select(timelineDivClass)
				.append("div")
				.attr("width", "20%")
				.attr("height", "100%")
				.attr("float", "left")
	*/

	var div2 = d3.select(timelineDivClass)
				.append("div")
				//.attr("width", "80%")
				//.attr("width", "100%") // For div elements, width and height properties are CSS attributes
				//.attr("height", "100%")
				.attr("float", "right")
				//.attr("overflow-x", "scroll")
				.attr("class", "timeLineWrapper")

	$('timeLineWrapper').css("width", "" + parentDiv.width() + "px")

	//var chart = d3.select("body")
	var chart = div2
				.append("svg")
				//.attr("transform", "scale(3,0)")
				.attr("width", chartWidth)
				//.attr("height", chartHeight)
				.attr("class", "chart");

	console.log($('.chart').width())

	var timelineGraph = chart.append("g")
				//.attr("transform", "translate(" + m[3] + ",0)")
				//.attr("width", 2000)
				.attr("width", chartWidth)
				//.attr("height", chartHeight)
				//.attr("width", "100%")
				//.attr("height", "100%")
				.attr("class", "mini");

	function mousemove(d) {
        d3.select("table")
          //.html("Tooltip is here")
          .style("left", d3.select(this).attr("x") + "px")     
    	  .style("top", (parseFloat(d3.select(this).attr("y")) + rectHeight + 1) + "px");
    }

  	function mouseover(p) {
      	d3.select("table").transition()
          .duration(500)
          .style("opacity", 1);
      	d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
      	d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
      	tabulate(data, columns)
  	}

  	function mouseout() {
      	d3.select("table").transition()
          .duration(500)
          .style("opacity", 1e-6);
      //d3.selectAll("text").classed("active", false);
  	}

	//timeline lanes and texts
	timelineGraph.append("g").selectAll(".laneLines")
		.data(items)
		.enter().append("line")
		.attr("x1", m[3])
		.attr("y1", function(d) {return y(d.lane + 0.5);})
		.attr("x2", chartWidth)
		.attr("y2", function(d) {return y(d.lane + 0.5);})
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
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

	//timline item rects
	timelineGraph.append("g").selectAll("miniItems")
		.data(items)
		.enter().append("rect")
		.attr("class", function(d) {return "miniItem" + d.lane;})
		.attr("x", function(d) {return x(d.start);})
		.attr("y", function(d) {return y(d.lane + .5) - rectHeight/2;})
		.attr("width", function(d) {return x(d.end) - x(d.start);})
		.attr("height", rectHeight)
		.attr("id", function(d) {return d.id})
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
		.on("contextmenu", function(data, index) {
		    console.log("ContextMenu event fired!!")
		    //d3.event.preventDefault();
		});

	//timeline labels
	var minDurationReqForDisplayingLabel = 30
	var eventsWithLabel = items.filter(function(d) {return (d.end - d.start) >= minDurationReqForDisplayingLabel})
	timelineGraph.append("g").selectAll(".miniLabels")
		.data(eventsWithLabel)
		.enter().append("text")
		.text(function(d) {return d.id;})
		.attr("x", function(d) {return (x(d.start) + x(d.end))/2;})
		.attr("y", function(d) {return y(d.lane + .5);})
		.attr("dy", ".5ex")
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
		.on("click", selectNode)
		.attr("text-anchor", "middle");

	function selectNode(d) {
		var kernelId = "" + d.id
		selectKernelNodeOnCfg(kernelId)
	}

	function scrollTimeLine(numPixels) {
		$('.timeLineWrapper').scrollleft(numPixels)
	}
}