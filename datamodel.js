function getProfileData(degFileNodes, rawProfileData, config) {
    var perfProfile = rawProfileData.PerfProfile
    var numThreads = getNumberOfThreads(perfProfile)
    var dependencyData = getDependencyData(degFileNodes, numThreads)
    var timelineData = getDataForTimelineView(perfProfile, dependencyData, config)
    updateTimeTakenByPartitionedKernels(dependencyData)
    updateSyncAndExecTimesOfKernels(timelineData.timing, dependencyData.maxNodeLevel)
    updateMemUsageOfDNodes(rawProfileData.MemProfile, dependencyData)
    var threadLevelPerfStats = getThreadLevelPerfStats(timelineData, numThreads)

    return {"dependencyData": dependencyData, "timelineData": timelineData, "threadLevelPerfStats": threadLevelPerfStats}
}

function updateMemUsageOfDNodes(memProfile, dependencyData) {
    for(n in memProfile) {
        if (n != "dummy") {
            var totMemUsage = sum(memProfile[n])
            var id = dependencyData.nodeNameToId[n]
            var dNode = dependencyData.nodes[id]
            if (dNode.type == "InternalNode") {  
                var parent = dependencyData.nodes[dNode.parentId]
                parent.memUsage += totMemUsage
            }

            dNode.memUsage += totMemUsage
        }
    }
}

function getNumberOfThreads(perfProfile) {
    return (perfProfile.location.filter(onlyUnique).length - 1)
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
        n["numInputs"] = n.inputs.length;
        n["numOutputs"] = n.outputs.length;
        return n;
    })

    return {"nodes": nodes, "nodeNameToId": nodeNameToId, "maxNodeLevel": getMaxNodeLevel(nodes)}
}

function getDataForTimelineView(perfProfile, dependencyData, config) {
    var nodes = dependencyData.nodes
    var nodeNameToId = dependencyData.nodeNameToId
    var dataForTimelineView = {}
    var syncNodes = []
    var totalAppTime = 0

    var maxNodeLevel = dependencyData.maxNodeLevel
    for (var i = 0; i <= maxNodeLevel; i++) dataForTimelineView[i] = {}

    function isValidKernel(n) {
        return (config.syncNodeRegex.test(n) || (n in nodeNameToId))
    }

    for (var i in perfProfile.kernels) {
        var o = {}
        o["name"] = perfProfile.kernels[i]
        if (isValidKernel(o.name)) {
            o["id"] = nodeNameToId[o.name]
            o["lane"] = perfProfile.location[i]
            o["start"] = perfProfile.start[i]
            o["duration"] = perfProfile.duration[i]
            o["end"] = o["start"] + o["duration"]
            o["node"] = nodes[o.id]
            o["level"] = getTNodeLevel(o)
            o["displayText"] = getDisplayTextForTimelineNode(o.name)
            o["childNodes"] = [] // important for nested nodes such as WhileLoop, IfThenElse, etc.
            o["syncNodes"] = []
            o["parentId"] = -1
            o["dep_thread"] = "" // important for sync nodes - specifies the thread the sync was expecting a result from
            o["dep_kernel"] = "" // important for sync nodes - specifies the kernel the sync was expecting to complete
            o["execTime"] = {"abs": NaN, "pct": NaN}
            o["syncTime"] = {"abs": NaN, "pct": NaN}
     
            if (!(config.syncNodeRegex.test(o.name))) {
                //console.log(o)
                nodes[o.id].time += o.duration
                o.type = "execution"
                addToMap(dataForTimelineView[o.level], o.name, o)
            } else {
                o.type = "sync"
                syncNodes.push(o)
            }

            if (o.name == "all") {
                totalAppTime = o.duration
            }
        }
    }

    assignSyncNodesToParents(dataForTimelineView, dependencyData, syncNodes)
    updateChildNodesOfTNodes(dataForTimelineView, maxNodeLevel, dependencyData)

    return {"timing": dataForTimelineView, "lanes": perfProfile.res, "totalAppTime": totalAppTime}
}

function getMaxNodeLevel(nodes) {
    return nodes.map(function(n) {return n.level})
                .reduce(function(a,b) {if (a >= b) {return a} else {return b}})
}

function getTNodeLevel(n) {
    if (n.node) {
        return n.node.level
    }

    return 0
}

function updateChildNodesOfTNodes(dataForTimelineView, maxNodeLevel, dependencyData) {
    function getParentName(n) {
        var dNode = n.node
        if (dNode.type == "InternalNode") {
            var parentId = dNode.parentId
            dNode = dependencyData.nodes[parentId]
        }

        var parentId = dNode.parentId
        var parent = dependencyData.nodes[parentId]
        var pType = parent.type
        if ((pType == "WhileLoop") || (pType == "Conditional") || (pType == "MultiLoop")) {
            return parent.name + "_" + n.lane
        }

        return parent.name
    }

    for (var i = maxNodeLevel; i > 0; i--) {
        var childNodes = dataForTimelineView[i]
        for (cname in childNodes) {
            var childRuns = childNodes[cname]
            childRuns.forEach(function(n) {
                if (n.type == "execution") {
                    var parentName = getParentName(n)
                    var parentRuns = dataForTimelineView[i - 1][parentName]
                    for (var j in parentRuns) {
                        var p = parentRuns[j]
                        if ((p.start <= n.start) && (n.end <= p.end)) {
                            p.childNodes.push(n)
                            n.parentId = p.id
                            break;
                        }
                    }
                }
            })
        }
    }
}

function updateTimeTakenByPartitionedKernels(dependencyData) {
    function nodeWithMaxTime(a,b) {
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
            var paritionWithMaxExecTime = n.partitions.slice(1,len).reduce(function(a,b) {return nodeWithMaxTime(a,b)})
            n.time = headerTime + paritionWithMaxExecTime.time
        }

        n.percentage_time = (n.time * 100) / totalAppTime;
    })
}

function getThreadLevelPerfStats(timelineData, numThreads) {
    var threadToData = []
    for (var i = 0; i < numThreads; i++) {
        threadToData[i] = {"execTime": {"abs": 0, "pct": 0},
                           "syncTime": {"abs": 0, "pct": 0}}
    }

    var topLevelRuns = timelineData.timing[0]
    for (tNodeName in topLevelRuns) {
        if (tNodeName != "all") {
            var runs = topLevelRuns[tNodeName]
            if (runs.length > 0) {
                var tid = runs[0].lane
                var threadStats = threadToData[tid]
                runs.forEach(function(run) {
                    if (run.type == "execution") {
                        threadStats.execTime.abs += run.execTime.abs
                        threadStats.syncTime.abs += run.syncTime.abs
                    } else if (run.type == "sync") {
                        threadStats.syncTime.abs += run.duration
                    } else {
                        console.log("WARNING: Unidentified type of tNode")
                    }
                })
            }
        }
    }

    var appTime = timelineData.totalAppTime
    for (var i = 0; i < numThreads; i++) {
        var td = threadToData[i]
        td.execTime.pct = ((td.execTime.abs * 100) / appTime).toFixed(2)
        td.syncTime.pct = ((td.syncTime.abs * 100) / appTime).toFixed(2)
    }

    console.log(threadToData)

    return threadToData
}

function updateSyncAndExecTimesOfKernels(dataForTimelineView, maxNodeLevel) {
    for (var l = maxNodeLevel; l >= 0; l--) {
        var runs = dataForTimelineView[l]
        for (tNodeName in runs) {
            computeSyncAndExecTimes(runs[tNodeName])
        }
    }

    function computeSyncAndExecTimes(tNodes) {
        if ((tNodes.length > 0) && (tNodes[0].type == "execution")) {
            var totalSyncTime = 0
            tNodes.forEach(function(n) {
                var selfSyncTime = sum(n.syncNodes.map(function(o) {return o.duration}))
                var childrenSyncTime = sum(n.childNodes.map(function(o) {return o.syncTime.abs}))
                var syncTime = selfSyncTime + childrenSyncTime
                n.syncTime.abs = syncTime
                n.syncTime.pct = (syncTime * 100) / n.duration
                n.execTime.abs = n.duration - syncTime
                n.execTime.pct = 100 - n.syncTime.pct

                totalSyncTime += syncTime
            })

            var dNode = tNodes[0].node

            dNode.syncTime.abs = totalSyncTime
            dNode.syncTime.pct = (totalSyncTime * 100) / dNode.time

            dNode.execTime.abs = dNode.time - totalSyncTime
            dNode.execTime.pct = 100 - dNode.syncTime.pct
        }
    }
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
                    percentage_time : 0,
                    execTime        : {"abs": NaN, "pct": NaN},
                    syncTime        : {"abs": NaN, "pct": NaN},
                    sourceContext   : {},
                    runs            : [], // timing data for each time this node was executed in the app
                    memUsage        : 0, // in bytes
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
        time            : 0,
        percentage_time : 0,
        execTime        : {"abs": NaN, "pct": NaN},
        syncTime        : {"abs": NaN, "pct": NaN},
        memUsage        : 0,
    }
}

function getDisplayTextForTimelineNode(name) {
    var m = name.match(config.syncNodeRegex)
    if (m) {
        //return m[3] + "(T" + m[4] + ")"
        return ""
    } 

    return name
}

function assignSyncNodesToParents(dataForTimelineView, dependencyData, syncNodes) {
    syncNodes.forEach(function(n) {
        var m = n.name.match(config.syncNodeRegex)
        var parentName = m[2]

        n.dep_kernel = m[3]
        n.dep_thread = "T" + m[4]

        if (parentName == "null") { // top-level sync barrier
            n.level = 0
        } else {
            //console.log(parentName)
            //console.log(dependencyData)
            var parentId = dependencyData.nodeNameToId[parentName]
            var parentLevel = dependencyData.nodes[parentId].level
            var parent = dataForTimelineView[parentLevel][parentName].filter(function(p) {
                return (p.start <= n.start) && (n.end <= p.end)
            })[0]   // There should be just one element in the filtered list anyways

            parent.syncNodes.push(n)
            n.level = parent.level + 1
            n.parentId = parentId
        }

        addToMap(dataForTimelineView[n.level], n.name, n)
    })
}

function createPartitionNodes(numNodes, parentName, level) {
    var newNodes = []

    newNodes.push(createInternalNode(parentName + "_h", level)) // DON'T change this order. First add header partition and then others
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

    nextId = assignParentIdsToDNodes(nodes, nodeNameToId, nextId)

    return nodeNameToId
}

function assignParentIdsToDNodes(nodes, nodeNameToId, nextId) {
    function helper(parent, childType) {
        parent[childType].forEach(function(n) {
            n.parentId = parent.id
            n.target = parent.target
        })
    }

    nodes.filter(function(node) {return (node.type == "WhileLoop") || (node.type == "MultiLoop") || (node.type == "Conditional")})
         .forEach(function(node) {
            helper(node, "condOps")
            helper(node, "bodyOps")
            helper(node, "partitions")
            helper(node, "thenOps")
            helper(node, "elseOps")

            nextId = assignParentIdsToDNodes(node.condOps, nodeNameToId, nextId)
            nextId = assignParentIdsToDNodes(node.bodyOps, nodeNameToId, nextId)
    })

    return nextId
}

function addToMap(map, key, value) {
    if (!(key in map)) {
        map[key] = []
    }

    map[key].push(value)
}

function getOrElse(obj, defaultObj) {
    if (obj) {
        return obj
    }

    return defaultObj
}

function sum(arr) {
    return arr.reduce(function(a,b) {return a + b}, 0)
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