function getProfileData(degFileNodes, rawProfileData, config) {
    var numThreads = getNumberOfThreads(rawProfileData)
    var dependencyData = getDependencyData(degFileNodes, numThreads)
    var timelineData = getDataForTimelineView(rawProfileData, dependencyData, config)
    updateTimeTakenByLoopKernels(dependencyData)

    var tmp = getDataForTimelineView_mod(rawProfileData, dependencyData, config)
    console.log(tmp)

    return {"dependencyData": dependencyData, "timelineData": timelineData}
}

function getNumberOfThreads(rawProfileData) {
    return (rawProfileData.location.filter(onlyUnique).length - 1)
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

function getDataForTimelineView(rawProfileData, dependencyData, config) {
    // TODO: Create a hierarchical model for the timeline data
    //       dataForTimelineView would be a map of NodeName -> [Timing data]
    //       Each node can have children. And when the user goes into lower levels,
    //       the node may or may not retain its opacity depending on whether it has children.
    var nodes = dependencyData.nodes
    var nodeNameToId = dependencyData.nodeNameToId
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
        o["dep_thread"] = "" // important for sync nodes - specifies the thread the sync was expecting a result from
        o["dep_kernel"] = "" // important for sync nodes - specifies the kernel the sync was expecting to complete
 
        if (!(config.syncNodeRegex.test(o.name))) {
            nodes[o.id].time += o.duration
            o.type = "execution"
            addToMap(dataForTimelineView, o.name, o)
        } else {
            o.type = "sync"
            syncNodes.push(o)
        }
    }

    assignSyncNodesToParents(dataForTimelineView, syncNodes)

    return {"timing": dataForTimelineView, "lanes": rawProfileData.res}
}

function getMaxNodeLevel(nodes) {
    return nodes.map(function(n) {return n.level})
                .reduce(function(a,b) {if (a >= b) {return a} else {return b}})
}

function getDataForTimelineView_mod(rawProfileData, dependencyData, config) {
    // TODO: Create a hierarchical model for the timeline data
    //       dataForTimelineView would be a map of NodeName -> [Timing data]
    //       Each node can have children. And when the user goes into lower levels,
    //       the node may or may not retain its opacity depending on whether it has children.


    // (i) Determine max number of levels in the node structure
    // (ii) Create the dataForTimelineView map accordingly
    // (iii) Populate dataForTimelineView - each node would have its entry and corresponding list of timing data
    // (iv) Pass this data to the timeline view
    // (v) The timeline view would flatten the data: adding the lower levels to the childNodes attribute of the nodes
    var nodes = dependencyData.nodes
    var nodeNameToId = dependencyData.nodeNameToId
    var dataForTimelineView = {}
    var syncNodes = []

    var maxNodeLevel = getMaxNodeLevel(nodes)
    for (var i = 0; i <= maxNodeLevel; i++) dataForTimelineView[i] = {}

    for (var i in rawProfileData.kernels) {
        var o = {}
        o["name"] = rawProfileData.kernels[i]
        o["id"] = nodeNameToId[o.name]
        o["lane"] = rawProfileData.location[i]
        o["start"] = rawProfileData.start[i]
        o["duration"] = rawProfileData.duration[i]
        o["end"] = o["start"] + o["duration"]
        o["node"] = nodes[o.id]
        o["level"] = getTNodeLevel(o)
        o["displayText"] = getDisplayTextForTimelineNode(o.name)
        o["childNodes"] = [] // important for nested nodes such as WhileLoop, IfThenElse, etc.
        o["syncNodes"] = []
        o["dep_thread"] = "" // important for sync nodes - specifies the thread the sync was expecting a result from
        o["dep_kernel"] = "" // important for sync nodes - specifies the kernel the sync was expecting to complete
 
        if (!(config.syncNodeRegex.test(o.name))) {
            nodes[o.id].time += o.duration
            o.type = "execution"
            addToMap(dataForTimelineView[o.level], o.name, o)
        } else {
            o.type = "sync"
            syncNodes.push(o)
        }
    }


    assignSyncNodesToParents_mod(dataForTimelineView, dependencyData, syncNodes)

    return {"timing": dataForTimelineView, "lanes": rawProfileData.res}
}

function getTNodeLevel(n) {
    if (n.node) {
        return n.node.level
    }

    return 0
}

function updateChildNodesOfTNodes(dataForTimelineView, maxNodeLevel, dependencyData, laneToThreadId) {
    for (var i = maxNodeLevel, i > 0; i--) {
        var childNodes = dataForTimelineView[i]
        for (cname in childNodes) {
            var childRuns = childNodes[cname]
            childRuns.forEach(function(n) {
                var parentId = n.node.parentId
                var parentName = dependencyData.nodes[parentId].name + "_" + laneToThreadId(n.lane)
                var parentRuns = dataForTimelineView[i - 1][parentName]
                for (var j in parentRuns) {
                    var p = parentRuns[j]
                    if ((p.start <= n.start) && (n.end <= p.end)) {
                        p.childNodes.push(n)
                        break;
                    }
                }
            })
        }
    }
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

function initializeNodeDataFromDegFile(node, level, numThreads) {
    var nodeType = node.type
    var res = []
    var condOpsData = [] // for 'WhileLoop' nodes
    var bodyOpsData = [] // for 'WhileLoop' nodes
    var componentNodes = [] // for 'MultiLoop' nodes
    var partitionNodes = [] // for 'WhileLoop' and 'MultiLoop' nodes
    var thenOpsData = [] // for 'Conditional' nodes
    var elseOpsData = [] // for 'Conditional' nodes

    function processChildNodes(childNodes) {
        var res = []
        childNodes.forEach(function(cn) {
            res = res.concat(initializeNodeDataFromDegFile(cn, level + 1, numThreads))
        })

        return res
    }

    if ((nodeType != "EOP") && (nodeType != "EOG")) {
        var name = node.kernelId;
        if (!name) name = node.outputId; // its a WhileLoop|Conditional. For such nodes, the kernelId is defined as the "outputId" attribute
        if (!name) name = "undefined"

        if (nodeType == "MultiLoop") {
            componentNodes = node.outputs // the 'outputs' attr of the MultiLoop contains the list of kernels that were merged to form the MultiLoop
            partitionNodes = createPartitionNodes(numThreads, name, level)
        } else if (nodeType == "WhileLoop") {
            condOpsData = condOpsData.concat(processChildNodes(node.condOps))
            bodyOpsData = bodyOpsData.concat(processChildNodes(node.bodyOps))
            partitionNodes = createPartitionNodes(numThreads, name, level)
        } else if (nodeType == "Conditional") {
            condOpsData = condOpsData.concat(processChildNodes(node.condOps))
            thenOpsData = thenOpsData.concat(processChildNodes(node.thenOps))
            elseOpsData = elseOpsData.concat(processChildNodes(node.elseOps))
            partitionNodes = createPartitionNodes(numThreads, name, level)
        }

        // creating the node
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
                    thenOps         : thenOpsData,
                    elseOps         : elseOpsData,
                    level           : level,
                    parentId        : -1,  // -1 indicates top-level node. For child nodes, this field will be overwritten in assignNodeIds function
                    time            : 0,
                    sourceContext   : {},
                    runs            : [], // timing data for each time this node was executed in the app
                 }

        updateSourceContext(n, node.sourceContext)
        res.push(n)
        res = res.concat(condOpsData).concat(bodyOpsData).concat(partitionNodes).concat(thenOpsData).concat(elseOpsData)

        return res
    }

    return []
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

function addToMap(map, key, value) {
    if (!(key in map)) {
        map[key] = []
    }

    map[key].push(value)
}

function getDisplayTextForTimelineNode(name) {
    var m = name.match(config.syncNodeRegex)
    if (m) {
        return m[3] + "(T" + m[4] + ")"
    } 

    return name
}

function assignSyncNodesToParents(dataForTimelineView, syncNodes) {
    syncNodes.forEach(function(n) {
        var m = n.name.match(config.syncNodeRegex)
        var parentName = m[2]
        n.dep_kernel = m[3]
        n.dep_thread = "T" + m[4]

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

function assignSyncNodesToParents_mod(dataForTimelineView, dependencyData, syncNodes) {
    syncNodes.forEach(function(n) {
        var m = n.name.match(config.syncNodeRegex)
        var parentName = m[2]

        n.dep_kernel = m[3]
        n.dep_thread = "T" + m[4]

        if (parentName == "null") { // top-level sync barrier
            addToMap(dataForTimelineView[0], n.name, n)
        } else {
            var parentId = dependencyData.nodeNameToId[parentName]
            var parentLevel = dependencyData.nodes[parentId].level
            var parent = dataForTimelineView[parentLevel][parentName].filter(function(p) {
                return (p.start <= n.start) && (n.end <= p.end)
            })[0]   // There should be just one element in the filtered list anyways

            parent.syncNodes.push(n)
        }
    })
}

function createPartitionNodes(numNodes, parentName, level) {
    var newNodes = []

    newNodes.push(createInternalNode(parentName + "_h", level)) // DONT change this order. First add header partition and then others
    for (var i = 0; i < numNodes; i++) {
        newNodes.push(createInternalNode(parentName + "_" + i, level))
    }

    return newNodes
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
                n.target = node.target
            })

            node.bodyOps.forEach(function(n) {
                n.parentId = node.id
                n.target = node.target
            })

            node.partitions.forEach(function(n) {
                n.parentId = node.id
                n.target = node.target
            })

            nextId = assignParentIdsToWhileLoopChildren(node.condOps, nodeNameToId, nextId)
            nextId = assignParentIdsToWhileLoopChildren(node.bodyOps, nodeNameToId, nextId)
    })

    return nextId
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

// helper function used to find unique values in a given array
// obtained from http://stackoverflow.com/questions/1960473/unique-values-in-an-array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function max(a,b) {
    if (a >= b) { return a }
    else { return b }
}