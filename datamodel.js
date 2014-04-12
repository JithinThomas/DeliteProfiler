function getProfileData(degFileNodes, rawProfileData, config) {
    var numThreads = getNumberOfThreads(rawProfileData)
    var dependencyData = getDependencyData(degFileNodes, numThreads)
    //var timelineData = getDataForTimelineView(rawProfileData, dependencyData.nodes, dependencyData.nodeNameToId, config)
    var timelineData = getDataForTimelineView_mod(rawProfileData, dependencyData.nodes, dependencyData.nodeNameToId, config)
    updateTimeTakenByLoopKernels(dependencyData)

    return {"dependencyData": dependencyData, "timelineData": timelineData}
}

function updateTimeTakenByLoopKernels(dependencyData) {
    function helper(a,b) {
        var tmp = max(a.time, b.time)
        if (tmp == a.time) { return a }
        else { return b }
    }

    var nodes = dependencyData.nodes
    var totalAppTime = nodes[dependencyData.nodeNameToId.all].time
    nodes.forEach(function (n) {
        var len = n.partitions.length
        if (len > 0) {
            var headerTime = n.partitions[0].time
            var paritionWithMaxExecTime = n.partitions.slice(1,len).reduce(function(a,b) {return helper(a,b)})
            n.time = headerTime + paritionWithMaxExecTime.time
        }

        n.percentage_time = (n.time * 100) / totalAppTime;
    })
}

function getDataForTimelineView(rawProfileData, nodes, nodeNameToId, config) {
    var dataForTimelineView = []

    for (var i in rawProfileData.kernels) {
        var o = {}
        o["name"] = rawProfileData.kernels[i]
        o["id"] = nodeNameToId[o.name]
        o["lane"] = rawProfileData.location[i]
        o["start"] = rawProfileData.start[i]
        o["duration"] = rawProfileData.duration[i]
        o["end"] = o["start"] + o["duration"]
        o["node"] = nodes[o.id]

        if (!(config.syncNodeRegex.test(o.name))) {
            nodes[o.id].time += o.duration
        }
        
        dataForTimelineView.push(o)
    }

    return {"timing": dataForTimelineView, "lanes": rawProfileData.res}
}

function addToMap(map, key, value) {
    if (!(key in map)) {
        map[key] = []
    }

    map[key].push(value)
}

function getDataForTimelineView_mod(rawProfileData, nodes, nodeNameToId, config) {
    // TODO: Create a hierarchical model for the timeline data
    //       dataForTimelineView would be a map of NodeName -> [Timing data]
    //       Each node can have children. And when the user goes into lower levels,
    //       the node may or may not retain its opacity depending on whether it has children.
    var dataForTimelineView = {}
    var syncNodes = []

    for (var i in rawProfileData.kernels) {
        var o = {}
        o["name"] = rawProfileData.kernels[i]
        o["id"] = nodeNameToId[o.name]
        o["lane"] = rawProfileData.location[i]
        o["start"] = rawProfileData.start[i]
        o["duration"] = rawProfileData.duration[i]
        o["end"] = o["start"] + o["duration"]
        o["node"] = nodes[o.id]
        o["displayText"] = getDisplayTextForTimelineNode(o.name)
        o["syncNodes"] = []

        if (!(config.syncNodeRegex.test(o.name))) {
            nodes[o.id].time += o.duration
            addToMap(dataForTimelineView, o.name, o)
        } else {
            syncNodes.push(o)
        }
    }

    assignSyncNodesToParents(dataForTimelineView, syncNodes)

    return {"timing": dataForTimelineView, "lanes": rawProfileData.res}
}

function getDisplayTextForTimelineNode(name) {
    var m = name.match(config.syncNodeRegex)
    if (m) {
        return m[3] + "(T" + m[4] + ")"
    } 

    return name
}

function assignSyncNodesToParents(dataForTimelineView, syncNodes) {
    console.log(dataForTimelineView)
    syncNodes.forEach(function(n) {
        var m = n.name.match(config.syncNodeRegex)
        var parentName = m[2]
        //console.log("node: " + n.name + " parent: " + parentName)
        //console.log(n)
        //console.log(parentName)
        //console.log(dataForTimelineView[parentName])
        if (parentName == "null") { // top-level sync barrier
            addToMap(dataForTimelineView, n.name, n)
        } else {
            var parent = dataForTimelineView[parentName].filter(function(p) {
                return (p.start <= n.start) && (n.end <= p.end)
            })[0]   // There should be just one element in the filtered list anyways

            parent.syncNodes.push(n)
        }
    })
}

function createInternalNode(name, level) {
    return {
        id              : 0,
        name            : name,
        inputs          : [], 
        outputs         : [], 
        depth           : 0, 
        controlDeps     : [], 
        antiDeps        : [],
        target          : "",
        type            : "InternalNode",
        condOps         : [],
        bodyOps         : [],
        componentNodes  : [],
        partitions      : [],   // For MultiLoop and WhileLoop nodes: the different partitions such as x234_1, 
                                            // x234_2, x234_h, etc. This data will be provided by the timing info
        level           : level,
        parentId        : -1,  // -1 indicates top-level node. For child nodes, this field will be overwritten in assignNodeIds function
        time            : 0
    }
}

function createPartitionNodes(numNodes, parentName, level) {
    var newNodes = []

    newNodes.push(createInternalNode(parentName + "_h", level)) // DONT change this order. First add header partition and then others
    for (var i = 0; i < numNodes; i++) {
        newNodes.push(createInternalNode(parentName + "_" + i, level))
    }

    return newNodes
}

function initializeNodeDataFromDegFile(node, level, numThreads) {
    var nodeType = node.type
    var res = []
    var condOpsData = [] // for 'WhileLoop' nodes
    var bodyOpsData = [] // for 'WhileLoop' nodes
    var componentNodes = [] // for 'MultiLoop' nodes
    var partitionNodes = [] // for 'WhileLoop' and 'MultiLoop' nodes
    if ((nodeType != "EOP") && (nodeType != "EOG")) {
        var name = node.kernelId;
        if (!name) name = node.outputId; // its a WhileLoop. For such nodes, the kernelId is defined as the "outputId" attribute
        if (!name) {
            name = "undefined"
        }

        if (nodeType == "MultiLoop") {
            // the 'outputs' attr of the MultiLoop contains the list of kernels that were merged to form the MultiLoop
            componentNodes = node.outputs
            //partitionNodes = createPartitionNodes(numThreads, name, level + 1)
            partitionNodes = createPartitionNodes(numThreads, name, level)
        } else if (nodeType == "WhileLoop") {
            var condOps = node.condOps
            for (a in condOps) {
                condOpsData = condOpsData.concat(initializeNodeDataFromDegFile(condOps[a], level + 1, numThreads))
            }

            var bodyOps = node.bodyOps
            for (b in bodyOps) {
                bodyOpsData = bodyOpsData.concat(initializeNodeDataFromDegFile(bodyOps[b], level + 1, numThreads))
            }

            //partitionNodes = createPartitionNodes(numThreads, name, level + 1)
            partitionNodes = createPartitionNodes(numThreads, name, level)
        }

        var n =  {  id              : 0, 
                    name            : name, 
                    inputs          : getOrElse(node.inputs, []), 
                    outputs         : [], 
                    depth           : 0, 
                    controlDeps     : getOrElse(node.controlDeps, []), 
                    antiDeps        : getOrElse(node.antiDeps, []),
                    target          : getKernelTargetPlatform(node.supportedTargets, "unknown"),
                    type            : getOrElse(nodeType, "unknown"),
                    condOps         : condOpsData,
                    bodyOps         : bodyOpsData,
                    componentNodes  : componentNodes,
                    partitions      : partitionNodes,   // For MultiLoop and WhileLoop nodes: the different partitions such as x234_1, 
                                                        // x234_2, x234_h, etc. This data will be provided by the timing info
                    level           : level,
                    parentId        : -1,  // -1 indicates top-level node. For child nodes, this field will be overwritten in assignNodeIds function
                    time            : 0,
                    sourceContext   : {},
                 }

        updateSourceContext(n, node.sourceContext)
        res.push(n)
        res = res.concat(condOpsData).concat(bodyOpsData).concat(partitionNodes)

        return res
    }

    return []
}

function updateSourceContext(node, sc) {
    var sourceContext = {"file": "", "line": 0}
    if (sc) {
        var arr = sc.fileName.split("/")
        sourceContext.file = arr[arr.length - 1]
        sourceContext.line = parseInt(sc.line)
    } else {
        console.log("WARNING: SourceContext info not available for kernel: " + ((node.name)))
    }

    node.sourceContext = sourceContext
}

// TODO: Find out the resolution strategy used in Delite when a kernel has been generated for multiple targets
function getKernelTargetPlatform(supportedTargets, defaultVal) {
    if (supportedTargets) {
        return supportedTargets[0]
    }

    return defaultVal
}

function assignNodeIds(nodes) {
    var nodeNameToId = {}
    var nextId = 0
    nodes.forEach(function(node) {
        node.id = nextId++
        nodeNameToId[node.name] = node.id

        // assign same id to the nodes that fused to form this given node.
        node.componentNodes.forEach(function(comp) {nodeNameToId[comp] = node.id}) 
    })

    nextId = assignParentIdsToWhileLoopChildren(nodes, nodeNameToId, nextId)

    return nodeNameToId
}

function assignParentIdsToWhileLoopChildren(nodes, nodeNameToId, nextId) {
    nodes.filter(function(node) {return (node.type == "WhileLoop") || (node.type == "MultiLoop")})
         .forEach(function(node) {
            node.condOps.forEach(function(n) {
                n.parentId = node.id
            })

            node.bodyOps.forEach(function(n) {
                n.parentId = node.id
            })

            node.partitions.forEach(function(n) {
                n.parentId = node.id
            })

            nextId = assignParentIdsToWhileLoopChildren(node.condOps, nodeNameToId, nextId)
            nextId = assignParentIdsToWhileLoopChildren(node.bodyOps, nodeNameToId, nextId)
    })

    return nextId
}

function getDependencyData(degFileNodes, numThreads) {
    var nodes = []
    for (i in degFileNodes) {
        var newNodes = initializeNodeDataFromDegFile(degFileNodes[i], 0, numThreads)
        for (j in newNodes) {
            var node = newNodes[j]
            nodes.push(node)
        }
    }

    nodes.push(createInternalNode("all", 0)) // HACK: Dummy node to store the total time taken by the app
    nodes.push(createInternalNode("eop", 0)) // HACK: Dummy node

    var nodeNameToId = assignNodeIds(nodes)
    nodes.forEach(function (n, i) {
        var id = n.id
        n.inputs = n.inputs.map(function(_in) {return nodeNameToId[_in]})
        n.inputs.forEach(function(_in) {
                        nodes[_in].outputs.push(id)
        })

        n.controlDeps = n.controlDeps.map(function(_in) {return nodeNameToId[_in]})
        n.antiDeps = n.antiDeps.map(function(_in) {return nodeNameToId[_in]})
    })

    nodes = nodes.map(function(n) {
        n["numInputs"] = countNumberOfInputs(n);
        n["numOutputs"] = countNumberOfOutputs(n);
        return n;
    })

    return {"nodes": nodes, "nodeNameToId": nodeNameToId}
}

function countNumberOfInputs(n) {
    return n.inputs.length
}

function countNumberOfOutputs(n) {
    return n.outputs.length
}

function getOrElse(obj, defaultObj) {
    if (obj) {
        return obj
    }

    return defaultObj
}

function getNumberOfThreads(rawProfileData) {
    return (rawProfileData.location.filter(onlyUnique).length - 1)
}

// helper function used to find unique values in a given array
// obtained from http://stackoverflow.com/questions/1960473/unique-values-in-an-array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function max(a,b) {
    if (a >= b) { return a }
    else { return b }
}