
// IMP: In qunit-1.14.0.js: line 1386 (search for 'bad === 0')

test('Test_1 => Overall profile data processing', function() {
	var config = configObject();
	var actualDependencyData = getDependencyData(test_1_deg.DEG.ops, 2);
	var actualExecutionProfile = getExecutionProfile(test_1_profile.Profile, actualDependencyData, config);
	var expectedDependencyData = test_1_dependencyData;
	var expectedTimelineData = test_1_timelineData;

	testNameToIdMappingOfDNodes(actualDependencyData);

	var expectedDNodeLevels = {
		"x0"  : 0,
		"x1"  : 0,
		"x2"  : 0,
		"x3"  : 1,
		"x4"  : 1,
		"x5"  : 1,
		"x6"  : 1,
		"x7"  : 2,
		"x8"  : 2,
		"x9"  : 2,
		"x10" : 2
	};

	testDNodeLevels(actualDependencyData, expectedDNodeLevels);

	var expectedChildNodeMapping = {
		"x0"  : createChildNodeMapping([], [], [], [], []),
		"x1"  : createChildNodeMapping([], [], [], [], []),
		"x2"  : createChildNodeMapping(["x5","x6","x7","x8","x9","x10"], ["x3","x4"], [], [], []),
		"x3"  : createChildNodeMapping([], [], [], [], []),
		"x4"  : createChildNodeMapping([], [], [], [], []),
		"x5"  : createChildNodeMapping(["x9","x10"], ["x7","x8"], [], [], []),
		"x6"  : createChildNodeMapping([], [], [], [], []),
		"x7"  : createChildNodeMapping([], [], [], [], []),
		"x8"  : createChildNodeMapping([], [], [], [], []),
		"x9"  : createChildNodeMapping([], [], [], [], []),
		"x10" : createChildNodeMapping([], [], [], [], []),
	}

	testChildNodeDataOfDNodes(actualDependencyData, expectedChildNodeMapping);
	testInOutCountsOfDNodes(actualDependencyData.nodes);

	var expectedParentNames = {
		"x0"  : "",
		"x1"  : "",
		"x2"  : "",
		"x3"  : "x2",
		"x4"  : "x2",
		"x5"  : "x2",
		"x6"  : "x2",
		"x7"  : "x5",
		"x8"  : "x5",
		"x9"  : "x5",
		"x10" : "x5"
	}

	testParentNamesOfDNodes(actualDependencyData, expectedParentNames);

	var expectedTotalTimes = {
		"x0"  : 100,
		"x1"  : 100,
		"x2"  : 900,
		"x3"  : 200,
		"x4"  : 100,
		"x5"  : 570,
		"x6"  : 50,
		"x7"  : 150,
		"x8"  : 250,
		"x9"  : 300,
		"x10" : 20,
		"all" : 1020
		/*
		"Region A" : 200,
		"Region B" : 300,
		"Region C" : 800,
		
		*/
	}

	var expectedTotalTimeStats = toTotalTimeStats(expectedTotalTimes);
	testTotalTimeStats(actualExecutionProfile.nodeNameToSummary, expectedTotalTimeStats);

	testTotalAppTime(actualExecutionProfile);

	var expectedTicTocTimes = {
		"Region A" : 200,
		"Region B" : 300,
		"Region C" : 800,
		"all"	   : 1020
	}

	var expectedTicTocStats = toTicTocStats(expectedTicTocTimes);
	testTicTocStats(actualExecutionProfile.ticTocRegions, expectedTicTocStats);
})

function toTotalTimeStats(expectedTotalTimes) {
	var totalTimeStats = {};
	var totalAppTime = expectedTotalTimes["all"];
	for (var nodeName in expectedTotalTimes) {
		var stats = {};
		stats.abs = expectedTotalTimes[nodeName];
		stats.pct = ((stats.abs * 100) / totalAppTime);
		totalTimeStats[nodeName] = stats;
	}

	return totalTimeStats;
}

function testTotalTimeStats(actualExecutionSummary, expectedTotalTimeStats) {
	for (var nodeName in expectedTotalTimeStats) {
		var expectedStats = expectedTotalTimeStats[nodeName];
		var summary = actualExecutionSummary[nodeName];
		equal(summary.totalTime.abs, expectedStats.abs, "Absolute value of totalTime matches for node '" + nodeName + "'");
		equal(summary.totalTime.pct.toFixed(0), expectedStats.pct.toFixed(0), "Percentage value of totalTime matches for node '" + nodeName + "'");
	}
}

function testTotalAppTime(executionProfile) {
	equal(executionProfile.totalAppTime, executionProfile.nodeNameToSummary["all"].totalTime.abs, "nodeNameToSummary['all'] == executionProfile.totalAppTime");
}

function toTicTocStats(expectedTicTocTimes) {
	var totalAppTime = expectedTicTocTimes["all"];
	var stats = {};

	for (var ticTocRegionName in expectedTicTocTimes) {
		var abs = expectedTicTocTimes[ticTocRegionName];
		var pct = (abs * 100) / totalAppTime;
		stats[ticTocRegionName] = {"abs": abs, "pct": pct};
	}

	return stats;
}

function testTicTocStats(actualTicTocStats, expectedTicTocStats) {
	for (var i in actualTicTocStats) {
		var actualStats = actualTicTocStats[i];
		var expectedStats = expectedTicTocStats[actualStats.name];

		equal(actualStats.totalTime.abs, expectedStats.abs, "Comparing absolute time of tic-toc region '" + actualStats.name + "'")
		equal(actualStats.totalTime.pct.toFixed(2), expectedStats.pct.toFixed(2), "Comparing percentage time of tic-toc region '" + actualStats.name + "'")
	}
}

function testNameToIdMappingOfDNodes(dependencyData) {
	var nodeNameToId = dependencyData.nodeNameToId;
	var nodes = dependencyData.nodes;
	for (name in nodeNameToId) {
		var id = nodeNameToId[name];
		var node = nodes[id];
		equal(id, node.id, "[Checking sanity of nodeNameToId] Node id matches: (id == " + id + " && node.id == " + node.id + ")");
		equal(name, node.name, "[Checking sanity of nodeNameToId] Node name matches: (name == " + name + " && node.name == " + node.name + ")");
	}
}

function testDNodeLevels(actualDepData, expectedLevelValues) {
	actualDepData.nodes.forEach(function(n) {
		var expectedLevel = expectedLevelValues[n.name];
		equal(n.level, expectedLevel, "Node level matches: " + n.name)
	})
}

function testChildNodeDataOfDNodes(actualDepData, expectedChildNodeMapping) {
	function helper(actualNode, expectedChildNodes, childType) {
		var actual = actualNode[childType].map(function(n) {return n.name;}).sort();
		var expected = expectedChildNodes[childType].sort();
		equal(actual.length, expected.length, "# of child nodes of type '" + childType + "' matches for '" + actualNode.name + "'");
		deepEqual(actual, expected, "DNode " + childType + " matches: " + actualNode.name);
	}

	actualDepData.nodes.forEach(function(n) {
		var expectedChildNodes = expectedChildNodeMapping[n.name];
		helper(n, expectedChildNodes, "bodyOps")
		helper(n, expectedChildNodes, "condOps")
		helper(n, expectedChildNodes, "thenOps")
		helper(n, expectedChildNodes, "elseOps")
		helper(n, expectedChildNodes, "componentNodes")
	})
}

// 'expectedDeps'
// {
//   "nodeName_1" => {
//	    "inputs": [0,1,2],
//	    "outputs" : [3,4,5],
//	    ...
//	 }
//   ...
// }
function testDepsOfDNodes(actualDepData, expectedNodeDeps) {
	function helper1(actualNode, expectedNode, depType) {
		var actual = actualNode[depType];
		var expected = expectedNode[depType];
		deepEqual(actual, expected, "DNode " + depType + " matches: " + actualNode.name);
	};

	actualDepData.nodes.forEach(function(n) {
		var expectedDeps = expectedNodeDeps[n.name];
		helper1(n, expectedDeps, "inputs");
		helper1(n, expectedDeps, "outputs");
		helper1(n, expectedDeps, "controlDeps");
		helper1(n, expectedDeps, "antiDeps");
	});
}

function testInOutCountsOfDNodes(nodes) {
	nodes.forEach(function(n) {
		equal(n.numInputs, n.inputs.length, "numInputs == n.inputs.length (node == " + n.name + ")");
		equal(n.numOutputs, n.outputs.length, "numOutputs == n.outputs.length (node == " + n.name + ")");
	});
}

function testParentNamesOfDNodes(actualDepData, expectedParentNames) {
	actualDepData.nodes.forEach(function(n) {
		var actualParentName = "";
		if (n.parentId >= 0) {
			actualParentName = actualDepData.nodes[n.parentId].name;
		}

		equal(actualParentName, expectedParentNames[n.name], "Parent Names match: " + n.name);
	});
}

function getDNodeByName(name, dependencyData) {
	var id = dependencyData.nodeNameToId[name]
	return dependencyData.nodes[id]
}

function configObject() {
	return {
		syncNodeRegex : /__sync-ExecutionThread-(\d+)-(.*)-(.*)-(\d+)$/,
		re_partition  : /^(.*)_(\d+)$/,
		re_header     : /^(.*)_h$/
	};
}

function createChildNodeMapping(bodyOps, condOps, thenOps, elseOps, componentNodes) {
	return {
		"bodyOps"  		 : bodyOps,
		"condOps"  		 : condOps,
		"thenOps"  		 : thenOps,
		"elseOps"  		 : elseOps,
		"componentNodes" : componentNodes
	}
}
