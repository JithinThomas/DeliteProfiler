
var runSummariesChart = "#compareRunSummariesDiv";
var uploadRunSummariesBtnId = "#_uploadRunSummariesBtn";
var initializeViewsBtnId = "#initializeViewsBtn";

$(uploadRunSummariesBtnId).on("change", readExecutionProfiles);
$(initializeViewsBtnId).on("click", initializeViews);
$("#compareRunSummariesMetricOptions").change(function() {
	initializeViews();
});

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
	var metric = $("#compareRunSummariesMetricOptions").val();
	console.log(metric);

	var xSeries = [];
	var dataSeries = {};

	for (var n in threadCountToExecutionProfile) {
		xSeries.push(n);
		executionProfile = threadCountToExecutionProfile[n];
		for (var i in executionProfile.ticTocRegions) {
			var region = executionProfile.ticTocRegions[i];
			//var absTime = region.totalTime.abs;
			var absTime = region[metric].abs;
			addToMap(dataSeries, region.name, absTime);
		}
	}

	createLineChart(xSeries, dataSeries, "Number of Threads", "Time (ms)");
}

function createLineChart(xSeries, dataSeries, xAxisLabel, yAxisLabel) {
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

	var chart = c3.generate({
	    bindto: runSummariesChart,
	    data: {
	    	x : 'x',
      		columns: cols
	    },
	    axis: {
	    	x: { label: xAxisLabel },
	    	y: { label: yAxisLabel }
	    }
	});
}

function addToMap(dict, k, v) {
	if (!(k in dict)) {
		dict[k] = [];
	}

	dict[k].push(v);
}