
//====================================================
// Global variables
//====================================================

var ticTocRegionId = 0

//====================================================
// Data structures
//====================================================

function TicTocRegion(name, start, duration, numThreads) {
	this.id = ticTocRegionId++;
	this.name = name;
	this.start = start;
	this.totalTime = new Time(duration,0);
	this.end = start + duration;
	this.parent = null;
	this.childNodes = [];
	this.childToPerf = {};
	this.execTimeStats = createThreadLevelTimeStats(numThreads);
	this.syncTimeStats = createThreadLevelTimeStats(numThreads);
}

//====================================================
// Helper functions (used only within this file)
//====================================================

function createThreadLevelTimeStats(numThreads) {
    var tidToTime = {};
    for (var tid = 0; tid < numThreads; tid++) {
        tidToTime[tid] = new Time(0, 0);
    }

    return tidToTime;
}