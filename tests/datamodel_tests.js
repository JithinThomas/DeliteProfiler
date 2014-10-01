
// IMP: In qunit-1.14.0.js: line 1386 (search for 'bad === 0')

test('Test_1 => Overall profile data processing', function() {
	var config = {"syncNodeRegex": /__sync-ExecutionThread-(\d+)-(.*)-(.*)-(\d+)$/}
	var res = getProfileData(test_1_deg.DEG.ops, test_1_profile.Profile, config)
	var expectedDependencyData = test_1_dependencyData
	var expectedTimelineData = test_1_timelineData

	test_getProfileData(res.dependencyData, res.timelineData, expectedDependencyData, expectedTimelineData)
})

function test_getProfileData(actualDepData, actualProfileData, expectedDepData, expectedProfileData) {
	testNameToIdMappingOfDNodes(actualDepData)
	testDNodeLevels(actualDepData, expectedDepData)
	testChildNodeDataOfDNodes(actualDepData, expectedDepData)
	testDNodePerfStats(actualDepData, expectedDepData)
	testDepsOfDNodes(actualDepData, expectedDepData)
	testInOutCountsOfDNodes(actualDepData.nodes)
	testParentIdOfDNodes(actualDepData, expectedDepData)
}


function testNameToIdMappingOfDNodes(dependencyData) {
	var nodeNameToId = dependencyData.nodeNameToId
	var nodes = dependencyData.nodes
	for (name in nodeNameToId) {
		var id = nodeNameToId[name]
		var node = nodes[id]
		equal(id, node.id, "[Checking sanity of nodeNameToId] Node id matches: (id == " + id + " && node.id == " + node.id + ")")
		equal(name, node.name, "[Checking sanity of nodeNameToId] Node name matches: (name == " + name + " && node.name == " + node.name + ")")
	}
}

function testDNodeLevels(actualDepData, expectedDepData) {
	actualDepData.nodes.forEach(function(n) {
		var expectedNode = getDNodeByName(n.name, expectedDepData)
		equal(n.level, expectedNode.level, "Node level matches: " + n.name)
	})
}

function testChildNodeDataOfDNodes(actualDepData, expectedDepData) {
	function helper1(actualNode, expectedNode, childType) {
		var actual = helper2(actualNode[childType])
		var expected = helper2(expectedNode[childType])
		deepEqual(actual, expected, "DNode " + childType + " matches: " + actualNode.name)
	}

	function helper2(nodes) {
		return nodes.map(function(n) {return n.name})
	}

	actualDepData.nodes.forEach(function(n) {
		var expectedNode = getDNodeByName(n.name, expectedDepData)
		helper1(n, expectedNode, "bodyOps")
		helper1(n, expectedNode, "condOps")
		helper1(n, expectedNode, "thenOps")
		helper1(n, expectedNode, "elseOps")
		helper1(n, expectedNode, "componentNodes")
		helper1(n, expectedNode, "partitions")
	})
}

function testDNodePerfStats(actualDepData, expectedDepData) {
	actualDepData.nodes.forEach(function(n) {
		var expectedNode = getDNodeByName(n.name, expectedDepData)
		equal(n.time, expectedNode.time, "Total node times match: " + n.name)
		equal(n.percentage_time.toFixed(2), expectedNode.percentage_time.toFixed(2), "Node percentage_time match: " + n.name)
		deepEqual(n.execTime, expectedNode.execTime, "Exec time stats match: " + n.name)
		deepEqual(n.syncTime, expectedNode.syncTime, "Sync time stats match: " + n.name)
	})
}

function testDepsOfDNodes(actualDepData, expectedDepData) {
	function helper1(actualNode, expectedNode, depType) {
		var actual = actualNode[depType]
		var expected = expectedNode[depType]
		deepEqual(actual, expected, "DNode " + depType + " matches: " + actualNode.name)
	}

	actualDepData.nodes.forEach(function(n) {
		var expectedNode = getDNodeByName(n.name, expectedDepData)
		helper1(n, expectedNode, "inputs")
		helper1(n, expectedNode, "outputs")
		helper1(n, expectedNode, "controlDeps")
		helper1(n, expectedNode, "antiDeps")
	})
}

function testInOutCountsOfDNodes(nodes) {
	nodes.forEach(function(n) {
		equal(n.numInputs, n.inputs.length, "numInputs == n.inputs.length (node == " + n.name + ")")
		equal(n.numOutputs, n.outputs.length, "numOutputs == n.outputs.length (node == " + n.name + ")")
	})
}

function testParentIdOfDNodes(actualDepData, expectedDepData) {
	actualDepData.nodes.forEach(function(n) {
		var expectedNode = getDNodeByName(n.name, expectedDepData)
		equal(n.parentId, expectedNode.parentId, "Parent IDs match: " + n.name)
	})
}

function getDNodeByName(name, dependencyData) {
	var id = dependencyData.nodeNameToId[name]
	return dependencyData.nodes[id]
}

// Tmp functions
function removeCircularDeps(timelineData) {
	var data = timelineData.timing
	for (level in data) {
		var nodeNameToTNodes = data[level]
		for (node in nodeNameToTNodes) {
			var runs = nodeNameToTNodes[node]
			runs.forEach(function(r) {
				r.ticTocRegions = r.ticTocRegions.map(function(r) {return {name: r.name, id: r.id }})
			})
		}
	}

	timelineData.ticTocRegions.forEach(function(r) {
		r.childNodes = r.childNodes.map(function(n) {return {id: n.id, name: n.name}})
	})
}
