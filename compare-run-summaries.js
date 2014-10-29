
var runSummariesChart = "#containerRunSummaries";
var uploadRunSummariesBtnId = "#_uploadRunSummaries";
var initializeViewsBtnId = "#initializeViews";

$(uploadRunSummariesBtnId).on("change", readExecutionProfiles);
$(initializeViewsBtnId).on("click", initializeViews);

var threadCountToExecutionProfile = {};

function readExecutionProfiles(evt) {
	console.log("readExecutionProfiles");

	var files = evt.target.files;
	console.log(files)
	if (files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = JSON.parse(e.target.result);
				var executionProfile = getExecutionProfile(data.Profile, profData.dependencyData, config);
				var numThreads = executionProfile.numThreads;
				if (!(numThreads in threadCountToExecutionProfile)) {
					threadCountToExecutionProfile[numThreads] = executionProfile;
				}
			}

			file = files[i];
			reader.readAsText(file);
		}
	}
}

function initializeViews(evt) {
	console.log("initializeViews");
	console.log(threadCountToExecutionProfile);

	function addToMap(dict, k, v) {
		if (!(k in dict)) {
			dict[k] = [];
		}

		dict[k].push(v);
	}

	var xSeries = [];
	var dataSeries = {};

	for (var n in threadCountToExecutionProfile) {
		xSeries.push(n);
		executionProfile = threadCountToExecutionProfile[n];
		for (var i in executionProfile.ticTocRegions) {
			var region = executionProfile.ticTocRegions[i];
			var absTime = region.totalTime.abs;
			addToMap(dataSeries, region.name, absTime);
		}
	}

	/*
	xSeries = [1, 2, 4, 8, 16, 32];
	dataSeries = {
		"TotalAppTime" 	: [3200, 1600, 800, 400, 200, 100],
		"Region A"	   	: [2000, 1100, 500, 300, 150, 70],
		"Region B"	   	: [1200, 500, 300, 100, 50, 30]
	};
	*/

	console.log(xSeries);
	console.log(dataSeries);

	createLineChart(xSeries, dataSeries);
}

/*
function initializeViews(evt) {
	console.log("initializeViews");
	console.log(threadCountToExecutionProfile);

	xSeries = [1, 2, 4, 8, 16, 32];
	dataSeries = {
		"TotalAppTime" 	: [3200, 1600, 800, 400, 200, 100],
		"Region A"	   	: [2000, 1100, 500, 300, 150, 70],
		"Region B"	   	: [1200, 500, 300, 100, 50, 30]
	};

	createLineChart(xSeries, dataSeries);
}
*/

function createLineChart(xSeries, dataSeries) {
	var cols = [];
	var xCol = ['x'];

	for (var i in xSeries) {
		xCol.push(xSeries[i]);
	}

	cols.push(xCol);

	for (var key in dataSeries) {
		var col = [key];
		var vals = dataSeries[key];
		for (var i in vals) {
			col.push(vals[i]);
		}

		cols.push(col);
	}

	var d = {
    	x : 'x',
      	columns: cols
    }

    console.log(d);

	var chart = c3.generate({
	    bindto: runSummariesChart,
	    data: d,
	    axis: {
	    	x: { label: "Number of Threads" },
	    	y: { label: "Time (s)" }
	    }
	});
}