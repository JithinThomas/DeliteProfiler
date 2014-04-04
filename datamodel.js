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


function initializeNodeDataFromDegFile(node) {
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
                condOpsData = condOpsData.concat(initializeNodeDataFromDegFile(condOps[a]))
            }

            var bodyOps = node.bodyOps
            for (b in bodyOps) {
                bodyOpsData = bodyOpsData.concat(initializeNodeDataFromDegFile(bodyOps[b]))
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
                    componentNodes  : componentNodes
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

    nodes.filter(function(node) {return node.type == "WhileLoop"}).forEach(function(node) {
        node.condOps.forEach(function(n) {
            n.id = nextId++
            nodeNameToId[n.name] = n.id
        })
        node.bodyOps.forEach(function(n) {
            n.id = nextId++
            nodeNameToId[n.name] = n.id
        })
    })

    return nodeNameToId
}

function getDependencyData(degFileNodes) {
    var nodes = []
    var edges = []
    for (i in degFileNodes) {
        var newNodes = initializeNodeDataFromDegFile(degFileNodes[i])
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
    if (n) {
        //return edges.filter(function(e) {return (e.target == parseIntWrapper(n.id))}).length
        return n.inputs.length
    }

    return 0
}

function countNumberOfOutputs(n, edges) {
    if (n) {
        return n.outputs.length
    }

    return 0
}

function getOrElse(obj, defaultObj) {
    if (obj) {
        return obj
    }

    return defaultObj
}