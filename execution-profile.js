
//====================================================
// Global variables
//====================================================

var defaultTime = new Time(0, 0);

//====================================================
// Data structures used in the backend data model
//====================================================

function ExecutionProfile() {
	this.memUsageData = [];
	this.nodeNameToSummary = {}; // node name to a summary of its timing stats
	this.numThreads = 0;
	this.threadLevelPerfStats = [];
	this.ticTocRegions = [];
	this.timelineData = {};
	this.totalAppTime = 0;
}

ExecutionProfile.prototype.tryAddNode = function(nodeName) {
	if (!(nodeName in this.nodeNameToSummary)) {
		this.nodeNameToSummary[nodeName] = new NodeSummary(nodeName);
	}
}

ExecutionProfile.prototype.setNumThreads = function(n) {
	this.numThreads = n;
}

ExecutionProfile.prototype.setTotalAppTime = function(totalAppTime) {
	this.totalAppTime = totalAppTime;
}

ExecutionProfile.prototype.setTotalTime = function(nodeName, time) {
	this.nodeNameToSummary[nodeName].totalTime.abs = time;
}

ExecutionProfile.prototype.incrementTotalTime = function(nodeName, inc) {
	this.nodeNameToSummary[nodeName].totalTime.abs += inc;
}

ExecutionProfile.prototype.computePercentageTimeForAllNodes = function() {
	for (nodeName in this.nodeNameToSummary) {
		var s = this.nodeNameToSummary[nodeName];
		s.totalTime.pct = (s.totalTime.abs * 100) / this.totalAppTime;
	}
}

ExecutionProfile.prototype.setSyncTime = function (nodeName, syncTime)  {
	var s = this.nodeNameToSummary[nodeName];
	var totalAbsTime = s.totalTime.abs;
	syncTimePct = (syncTime * 100) / totalAbsTime;

	s.syncTime = new Time(syncTime, syncTimePct);
	s.execTime = new Time(totalAbsTime - syncTime, 100 - syncTimePct);
}

ExecutionProfile.prototype.updateTimeTakenByParitionedKernels = function() {
	for (nodeName in this.nodeNameToSummary) {
		var s = this.nodeNameToSummary[nodeName];
		var numPartitions = s.partitions.length;
		if (numPartitions > 0) {
			var headerName = s.partitions[0].nodeName;
			var headerTime = s.partitions[0].time
            var paritionWithMaxExecTime = n.partitions.slice(1,len).reduce(function(a,b) {return nodeWithMaxTime(a,b)})
            n.time = headerTime + paritionWithMaxExecTime.time
		}
	}
}

ExecutionProfile.prototype.incrementMemUsage = function(nodeName, inc) {
	this.nodeNameToSummary[nodeName].memUsage += inc;
}

ExecutionProfile.prototype.summaryOf = function(nodeName) {
	return this.nodeNameToSummary[nodeName];
}

ExecutionProfile.prototype.totalTime = function(nodeName) {
	if (nodeName in this.nodeNameToSummary) {
		return this.nodeNameToSummary[nodeName].totalTime;
	}

	return defaultTime;
}

ExecutionProfile.prototype.execTime = function(nodeName) {
	return this.nodeNameToSummary[nodeName].execTime;
}

ExecutionProfile.prototype.syncTime = function(nodeName) {
	return this.nodeNameToSummary[nodeName].syncTime;
}

ExecutionProfile.prototype.memUsage = function(nodeName) {
	return this.nodeNameToSummary[nodeName].memUsage;
}

function NodeSummary(nodeName) {
	this.nodeName = nodeName;
	this.totalTime = new Time(0, 0); // Summary of time taken by all instances of the node
	this.execTime = new Time(0, 0); // Summary of execution (non-synchronization) time of all instances of the node
	this.syncTime = new Time(0, 0); // Summary of the time spent in synchronization by all instances of the node
	this.memUsage = 0; // Total memory allocated by all instances of the node
}

function Time(abs, pct) {
	this.abs = abs; // Absolute time
	this.pct = pct; // The absolute time as % of some other time value (eg: totalAppTime, etc.)
}