function getProfileData(degFileNodes, rawProfileData) {
    var dependencyData = getDependencyData(degFileNodes)
    var timelineData = getDataForTimelineView(rawProfileData, dependencyData.nodeNameToId)
    updateTimeTakenByEachKernel(dependencyData, timelineData)

    return {"dependencyData": dependencyData, "timelineData": timelineData}
}

function updateTimeTakenByEachKernel(dependencyData, timelineData) {
    var nodeNameToId = dependencyData.nodeNameToId
    var nodes = dependencyData.nodes
    var totalAppTime = sumAllDurations(timelineData[nodeNameToId.all])
    for (i in nodes) {
        var node = nodes[i]
        var timingData = timelineData[node.id]
        var totalTimeTakenByNode = sumAllDurations(timingData)
        var percentageOfAppTimeTakenByNode = (totalTimeTakenByNode * 100) / totalAppTime
        node["time"] = totalTimeTakenByNode
        node["percentage_time"] = percentageOfAppTimeTakenByNode
        node["num_of_runs"] = timingData.length
    }
}

function sumAllDurations(timingData) {
    var sum = timingData.reduceRight(function(currSum, currTiming, index, array) {
        return currSum + currTiming["duration"]
    }, 0)

    return sum
}

function getDataForTimelineView(rawProfileData, nodeNameToId) {
    var dataForTimelineView = []
    var count = 0
    for (i in nodeNameToId) {
        dataForTimelineView[count++] = []
    }

    for (i in rawProfileData.kernels) {
        var o = {}
        o["name"] = rawProfileData.kernels[i]
        if (!(o.name in nodeNameToId)) {    // TODO: This check needs to be removed once we start extracting bodyOps and condOps
            nodeNameToId[o.name] = count    //         parts of WhileLoop from the DEG file
            dataForTimelineView[count++] = []
            console.log(o.name)
        } 

        o["id"] = nodeNameToId[o.name]
        o["lane"] = rawProfileData.location[i]
        o["start"] = rawProfileData.start[i]
        o["duration"] = rawProfileData.duration[i]
        o["end"] = o["start"] + o["duration"]

        dataForTimelineView[o.id].push(o)
    }

    return dataForTimelineView
}


function initializeNodeDataFromDegFile(node, level) {
    var nodeType = node.type
    var res = []
    var condOpsData = [] // for 'WhileLoop' nodes
    var bodyOpsData = [] // for 'WhileLoop' nodes
    var componentNodes = [] // for 'MultiLoop' nodes
    if ((nodeType != "EOP") && (nodeType != "EOG")) {
        var n = node.kernelId;
        if (!n) n = node.outputId; // its a WhileLoop. For such nodes, the kernelId is defined as the "outputId" attribute
        if (!n) {
            n = "undefined"
        }

        if (nodeType == "MultiLoop") {
            // the 'outputs' attr of the MultiLoop contains the list of kernels that were merged to form the MultiLoop
            componentNodes = node.outputs
        } else if (nodeType == "WhileLoop") {
            var condOps = node.condOps
            for (a in condOps) {
                condOpsData = condOpsData.concat(initializeNodeDataFromDegFile(condOps[a], level + 1))
            }

            var bodyOps = node.bodyOps
            for (b in bodyOps) {
                bodyOpsData = bodyOpsData.concat(initializeNodeDataFromDegFile(bodyOps[b], level + 1))
            }
        }

        res.push({  id              : 0, 
                    name            : n, 
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
                    partitions      : [],   // For MultiLoop and WhileLoop nodes: the different partitions such as x234_1, x234_2, 
                                            // x234_h, etc. This data will be provided by the timing info
                    level           : level,
                    parentId        : -1  // -1 indicates top-level node. For child nodes, this field will be overwritten in assignNodeIds function
                })

        return res
    }

    return []
}

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

    nextId = assignIdsToWhileLoopChildren(nodes, nodeNameToId, nextId)
    console.log(nextId)

    return nodeNameToId
}

function assignIdsToWhileLoopChildren(nodes, nodeNameToId, nextId) {
    nodes.filter(function(node) {return node.type == "WhileLoop"}).forEach(function(node) {
        node.condOps.forEach(function(n) {
            n.id = nextId++
            n.parentId = node.id
            nodeNameToId[n.name] = n.id
        })

        node.bodyOps.forEach(function(n) {
            n.id = nextId++
            n.parentId = node.id
            nodeNameToId[n.name] = n.id
        })

        nextId = assignIdsToWhileLoopChildren(node.condOps, nodeNameToId, nextId)
        nextId = assignIdsToWhileLoopChildren(node.bodyOps, nodeNameToId, nextId)
    })

    return nextId
}

function getDependencyData(degFileNodes) {
    var nodes = []
    var edges = []
    for (i in degFileNodes) {
        var newNodes = initializeNodeDataFromDegFile(degFileNodes[i], 0)
        for (j in newNodes) {
            var node = newNodes[j]
            nodes.push(node)
        }
    }

    var nodeNameToId = assignNodeIds(nodes)
    nodes.forEach(function (n, i) {
        var id = n.id
        n.inputs = n.inputs.map(function(_in) {return nodeNameToId[_in]})
        n.inputs.forEach(function(_in) {
                        edges.push({source: _in, target: id})
                        nodes[_in].outputs.push(id)
        })

        n.controlDeps = n.controlDeps.map(function(_in) {return nodeNameToId[_in]})
        n.controlDeps.forEach(function(_in) {
                        nodes[_in].outputs.push(id)
        })

        n.antiDeps = n.antiDeps.map(function(_in) {return nodeNameToId[_in]})
        n.antiDeps.forEach(function(_in) {
                        nodes[_in].outputs.push(id)
        })
    })

    nodes = nodes.map(function(n) {
        n["numInputs"] = countNumberOfInputs(n, edges);
        n["numOutputs"] = countNumberOfOutputs(n, edges);
        return n;
    })

    return {"nodes": nodes, "nodeNameToId": nodeNameToId, "edges": edges}
}

function countNumberOfInputs(n, edges) {
    return n.inputs.length
}

function countNumberOfOutputs(n, edges) {
    return n.outputs.length
}

function getOrElse(obj, defaultObj) {
    if (obj) {
        return obj
    }

    return defaultObj
}