test_1_dependencyData = {
  "nodes": [
    {
      "id": 0,
      "name": "x0",
      "inputs": [],
      "outputs": [
        1,
        4
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "scala",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 0,
      "parentId": -1,
      "time": 100,
      "percentage_time": 9.803921568627452,
      "execTime": {
        "abs": 100,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "HelloWorld.scala",
        "line": 10
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 2
    },
    {
      "id": 1,
      "name": "x1",
      "inputs": [
        0
      ],
      "outputs": [
        3
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "scala",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 0,
      "parentId": -1,
      "time": 100,
      "percentage_time": 9.803921568627452,
      "execTime": {
        "abs": 100,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "HelloWorld.scala",
        "line": 12
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 1
    },
    {
      "id": 2,
      "name": "x2",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "WhileLoop",
      "condOps": [
        {
          "id": 3,
          "name": "x3",
          "inputs": [
            1
          ],
          "outputs": [
            7
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 1,
          "parentId": 2,
          "time": 200,
          "percentage_time": 19.607843137254903,
          "execTime": {
            "abs": 200,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "Ordering2Ops.scala",
            "line": 30
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 1
        },
        {
          "id": 4,
          "name": "x4",
          "inputs": [
            0
          ],
          "outputs": [
            6,
            7,
            13
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 1,
          "parentId": 2,
          "time": 100,
          "percentage_time": 9.803921568627452,
          "execTime": {
            "abs": 100,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "<unknown file>",
            "line": 0
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 3
        }
      ],
      "bodyOps": [
        {
          "id": 5,
          "name": "x5",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "WhileLoop",
          "condOps": [
            {
              "id": 6,
              "name": "x7",
              "inputs": [
                4
              ],
              "outputs": [
                7
              ],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "SingleTask",
              "condOps": [],
              "bodyOps": [],
              "componentNodes": [],
              "partitions": [],
              "thenOps": [],
              "elseOps": [],
              "level": 2,
              "parentId": 5,
              "time": 150,
              "percentage_time": 14.705882352941176,
              "execTime": {
                "abs": 150,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "sourceContext": {
                "file": "Ordering2Ops.scala",
                "line": 30
              },
              "runs": [],
              "memUsage": 0,
              "numInputs": 1,
              "numOutputs": 1
            },
            {
              "id": 7,
              "name": "x8",
              "inputs": [
                3,
                4,
                6
              ],
              "outputs": [],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "SingleTask",
              "condOps": [],
              "bodyOps": [],
              "componentNodes": [],
              "partitions": [],
              "thenOps": [],
              "elseOps": [],
              "level": 2,
              "parentId": 5,
              "time": 250,
              "percentage_time": 24.50980392156863,
              "execTime": {
                "abs": 250,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "sourceContext": {
                "file": "<unknown file>",
                "line": 0
              },
              "runs": [],
              "memUsage": 0,
              "numInputs": 3,
              "numOutputs": 0
            }
          ],
          "bodyOps": [
            {
              "id": 8,
              "name": "x9",
              "inputs": [],
              "outputs": [
                9
              ],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "SingleTask",
              "condOps": [],
              "bodyOps": [],
              "componentNodes": [],
              "partitions": [],
              "thenOps": [],
              "elseOps": [],
              "level": 2,
              "parentId": 5,
              "time": 300,
              "percentage_time": 29.41176470588235,
              "execTime": {
                "abs": 300,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "sourceContext": {
                "file": "HelloWorld.scala",
                "line": 18
              },
              "runs": [],
              "memUsage": 0,
              "numInputs": 0,
              "numOutputs": 1
            },
            {
              "id": 9,
              "name": "x10",
              "inputs": [
                8
              ],
              "outputs": [],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "SingleTask",
              "condOps": [],
              "bodyOps": [],
              "componentNodes": [],
              "partitions": [],
              "thenOps": [],
              "elseOps": [],
              "level": 2,
              "parentId": 5,
              "time": 20,
              "percentage_time": 1.9607843137254901,
              "execTime": {
                "abs": 20,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "sourceContext": {
                "file": "HelloWorld.scala",
                "line": 18
              },
              "runs": [],
              "memUsage": 0,
              "numInputs": 1,
              "numOutputs": 0
            }
          ],
          "componentNodes": [],
          "partitions": [
            {
              "id": 10,
              "name": "x5_h",
              "inputs": [],
              "outputs": [],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "InternalNode",
              "condOps": [],
              "bodyOps": [],
              "thenOps": [],
              "elseOps": [],
              "componentNodes": [],
              "partitions": [],
              "level": 1,
              "parentId": 5,
              "time": 0,
              "percentage_time": 0,
              "execTime": {
                "abs": null,
                "pct": null
              },
              "syncTime": {
                "abs": null,
                "pct": null
              },
              "memUsage": 0,
              "sourceContext": {
                "file": "",
                "line": 0
              },
              "numInputs": 0,
              "numOutputs": 0
            },
            {
              "id": 11,
              "name": "x5_0",
              "inputs": [],
              "outputs": [],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "InternalNode",
              "condOps": [],
              "bodyOps": [],
              "thenOps": [],
              "elseOps": [],
              "componentNodes": [],
              "partitions": [],
              "level": 1,
              "parentId": 5,
              "time": 550,
              "percentage_time": 53.92156862745098,
              "execTime": {
                "abs": 450,
                "pct": 81.81818181818181
              },
              "syncTime": {
                "abs": 100,
                "pct": 18.181818181818183
              },
              "memUsage": 0,
              "sourceContext": {
                "file": "",
                "line": 0
              },
              "numInputs": 0,
              "numOutputs": 0
            },
            {
              "id": 12,
              "name": "x5_1",
              "inputs": [],
              "outputs": [],
              "depth": 0,
              "controlDeps": [],
              "antiDeps": [],
              "target": "unknown",
              "type": "InternalNode",
              "condOps": [],
              "bodyOps": [],
              "thenOps": [],
              "elseOps": [],
              "componentNodes": [],
              "partitions": [],
              "level": 1,
              "parentId": 5,
              "time": 570,
              "percentage_time": 55.88235294117647,
              "execTime": {
                "abs": 270,
                "pct": 47.36842105263158
              },
              "syncTime": {
                "abs": 300,
                "pct": 52.63157894736842
              },
              "memUsage": 0,
              "sourceContext": {
                "file": "",
                "line": 0
              },
              "numInputs": 0,
              "numOutputs": 0
            }
          ],
          "thenOps": [],
          "elseOps": [],
          "level": 1,
          "parentId": 2,
          "time": 570,
          "percentage_time": 55.88235294117647,
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 6,
          "name": "x7",
          "inputs": [
            4
          ],
          "outputs": [
            7
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 150,
          "percentage_time": 14.705882352941176,
          "execTime": {
            "abs": 150,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "Ordering2Ops.scala",
            "line": 30
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 1
        },
        {
          "id": 7,
          "name": "x8",
          "inputs": [
            3,
            4,
            6
          ],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 250,
          "percentage_time": 24.50980392156863,
          "execTime": {
            "abs": 250,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "<unknown file>",
            "line": 0
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 3,
          "numOutputs": 0
        },
        {
          "id": 8,
          "name": "x9",
          "inputs": [],
          "outputs": [
            9
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 300,
          "percentage_time": 29.41176470588235,
          "execTime": {
            "abs": 300,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "HelloWorld.scala",
            "line": 18
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 0,
          "numOutputs": 1
        },
        {
          "id": 9,
          "name": "x10",
          "inputs": [
            8
          ],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 20,
          "percentage_time": 1.9607843137254901,
          "execTime": {
            "abs": 20,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "HelloWorld.scala",
            "line": 18
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 0
        },
        {
          "id": 10,
          "name": "x5_h",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 0,
          "percentage_time": 0,
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 11,
          "name": "x5_0",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 550,
          "percentage_time": 53.92156862745098,
          "execTime": {
            "abs": 450,
            "pct": 81.81818181818181
          },
          "syncTime": {
            "abs": 100,
            "pct": 18.181818181818183
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 12,
          "name": "x5_1",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 570,
          "percentage_time": 55.88235294117647,
          "execTime": {
            "abs": 270,
            "pct": 47.36842105263158
          },
          "syncTime": {
            "abs": 300,
            "pct": 52.63157894736842
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 13,
          "name": "x6",
          "inputs": [
            4
          ],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 1,
          "parentId": 2,
          "time": 50,
          "percentage_time": 4.901960784313726,
          "execTime": {
            "abs": 50,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "HelloWorld.scala",
            "line": 18
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 0
        }
      ],
      "componentNodes": [],
      "partitions": [
        {
          "id": 14,
          "name": "x2_h",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 0,
          "parentId": 2,
          "time": 0,
          "percentage_time": 0,
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 15,
          "name": "x2_0",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 0,
          "parentId": 2,
          "time": 900,
          "percentage_time": 88.23529411764706,
          "execTime": {
            "abs": 600,
            "pct": 66.66666666666666
          },
          "syncTime": {
            "abs": 300,
            "pct": 33.333333333333336
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 16,
          "name": "x2_1",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 0,
          "parentId": 2,
          "time": 820,
          "percentage_time": 80.3921568627451,
          "execTime": {
            "abs": 470,
            "pct": 57.31707317073171
          },
          "syncTime": {
            "abs": 350,
            "pct": 42.68292682926829
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        }
      ],
      "thenOps": [],
      "elseOps": [],
      "level": 0,
      "parentId": -1,
      "time": 900,
      "percentage_time": 88.23529411764706,
      "execTime": {
        "abs": null,
        "pct": null
      },
      "syncTime": {
        "abs": null,
        "pct": null
      },
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 3,
      "name": "x3",
      "inputs": [
        1
      ],
      "outputs": [
        7
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 1,
      "parentId": 2,
      "time": 200,
      "percentage_time": 19.607843137254903,
      "execTime": {
        "abs": 200,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "Ordering2Ops.scala",
        "line": 30
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 1
    },
    {
      "id": 4,
      "name": "x4",
      "inputs": [
        0
      ],
      "outputs": [
        6,
        7,
        13
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 1,
      "parentId": 2,
      "time": 100,
      "percentage_time": 9.803921568627452,
      "execTime": {
        "abs": 100,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "<unknown file>",
        "line": 0
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 3
    },
    {
      "id": 5,
      "name": "x5",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "WhileLoop",
      "condOps": [
        {
          "id": 6,
          "name": "x7",
          "inputs": [
            4
          ],
          "outputs": [
            7
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 150,
          "percentage_time": 14.705882352941176,
          "execTime": {
            "abs": 150,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "Ordering2Ops.scala",
            "line": 30
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 1
        },
        {
          "id": 7,
          "name": "x8",
          "inputs": [
            3,
            4,
            6
          ],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 250,
          "percentage_time": 24.50980392156863,
          "execTime": {
            "abs": 250,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "<unknown file>",
            "line": 0
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 3,
          "numOutputs": 0
        }
      ],
      "bodyOps": [
        {
          "id": 8,
          "name": "x9",
          "inputs": [],
          "outputs": [
            9
          ],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 300,
          "percentage_time": 29.41176470588235,
          "execTime": {
            "abs": 300,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "HelloWorld.scala",
            "line": 18
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 0,
          "numOutputs": 1
        },
        {
          "id": 9,
          "name": "x10",
          "inputs": [
            8
          ],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "SingleTask",
          "condOps": [],
          "bodyOps": [],
          "componentNodes": [],
          "partitions": [],
          "thenOps": [],
          "elseOps": [],
          "level": 2,
          "parentId": 5,
          "time": 20,
          "percentage_time": 1.9607843137254901,
          "execTime": {
            "abs": 20,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "sourceContext": {
            "file": "HelloWorld.scala",
            "line": 18
          },
          "runs": [],
          "memUsage": 0,
          "numInputs": 1,
          "numOutputs": 0
        }
      ],
      "componentNodes": [],
      "partitions": [
        {
          "id": 10,
          "name": "x5_h",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 0,
          "percentage_time": 0,
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 11,
          "name": "x5_0",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 550,
          "percentage_time": 53.92156862745098,
          "execTime": {
            "abs": 450,
            "pct": 81.81818181818181
          },
          "syncTime": {
            "abs": 100,
            "pct": 18.181818181818183
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        },
        {
          "id": 12,
          "name": "x5_1",
          "inputs": [],
          "outputs": [],
          "depth": 0,
          "controlDeps": [],
          "antiDeps": [],
          "target": "unknown",
          "type": "InternalNode",
          "condOps": [],
          "bodyOps": [],
          "thenOps": [],
          "elseOps": [],
          "componentNodes": [],
          "partitions": [],
          "level": 1,
          "parentId": 5,
          "time": 570,
          "percentage_time": 55.88235294117647,
          "execTime": {
            "abs": 270,
            "pct": 47.36842105263158
          },
          "syncTime": {
            "abs": 300,
            "pct": 52.63157894736842
          },
          "memUsage": 0,
          "sourceContext": {
            "file": "",
            "line": 0
          },
          "numInputs": 0,
          "numOutputs": 0
        }
      ],
      "thenOps": [],
      "elseOps": [],
      "level": 1,
      "parentId": 2,
      "time": 570,
      "percentage_time": 55.88235294117647,
      "execTime": {
        "abs": null,
        "pct": null
      },
      "syncTime": {
        "abs": null,
        "pct": null
      },
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 6,
      "name": "x7",
      "inputs": [
        4
      ],
      "outputs": [
        7
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 2,
      "parentId": 5,
      "time": 150,
      "percentage_time": 14.705882352941176,
      "execTime": {
        "abs": 150,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "Ordering2Ops.scala",
        "line": 30
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 1
    },
    {
      "id": 7,
      "name": "x8",
      "inputs": [
        3,
        4,
        6
      ],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 2,
      "parentId": 5,
      "time": 250,
      "percentage_time": 24.50980392156863,
      "execTime": {
        "abs": 250,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "<unknown file>",
        "line": 0
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 3,
      "numOutputs": 0
    },
    {
      "id": 8,
      "name": "x9",
      "inputs": [],
      "outputs": [
        9
      ],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 2,
      "parentId": 5,
      "time": 300,
      "percentage_time": 29.41176470588235,
      "execTime": {
        "abs": 300,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "HelloWorld.scala",
        "line": 18
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 1
    },
    {
      "id": 9,
      "name": "x10",
      "inputs": [
        8
      ],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 2,
      "parentId": 5,
      "time": 20,
      "percentage_time": 1.9607843137254901,
      "execTime": {
        "abs": 20,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "HelloWorld.scala",
        "line": 18
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 0
    },
    {
      "id": 10,
      "name": "x5_h",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 1,
      "parentId": 5,
      "time": 0,
      "percentage_time": 0,
      "execTime": {
        "abs": null,
        "pct": null
      },
      "syncTime": {
        "abs": null,
        "pct": null
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 11,
      "name": "x5_0",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 1,
      "parentId": 5,
      "time": 550,
      "percentage_time": 53.92156862745098,
      "execTime": {
        "abs": 450,
        "pct": 81.81818181818181
      },
      "syncTime": {
        "abs": 100,
        "pct": 18.181818181818183
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 12,
      "name": "x5_1",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 1,
      "parentId": 5,
      "time": 570,
      "percentage_time": 55.88235294117647,
      "execTime": {
        "abs": 270,
        "pct": 47.36842105263158
      },
      "syncTime": {
        "abs": 300,
        "pct": 52.63157894736842
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 13,
      "name": "x6",
      "inputs": [
        4
      ],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "SingleTask",
      "condOps": [],
      "bodyOps": [],
      "componentNodes": [],
      "partitions": [],
      "thenOps": [],
      "elseOps": [],
      "level": 1,
      "parentId": 2,
      "time": 50,
      "percentage_time": 4.901960784313726,
      "execTime": {
        "abs": 50,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "sourceContext": {
        "file": "HelloWorld.scala",
        "line": 18
      },
      "runs": [],
      "memUsage": 0,
      "numInputs": 1,
      "numOutputs": 0
    },
    {
      "id": 14,
      "name": "x2_h",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 0,
      "parentId": 2,
      "time": 0,
      "percentage_time": 0,
      "execTime": {
        "abs": null,
        "pct": null
      },
      "syncTime": {
        "abs": null,
        "pct": null
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 15,
      "name": "x2_0",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 0,
      "parentId": 2,
      "time": 900,
      "percentage_time": 88.23529411764706,
      "execTime": {
        "abs": 600,
        "pct": 66.66666666666666
      },
      "syncTime": {
        "abs": 300,
        "pct": 33.333333333333336
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 16,
      "name": "x2_1",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "unknown",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 0,
      "parentId": 2,
      "time": 820,
      "percentage_time": 80.3921568627451,
      "execTime": {
        "abs": 470,
        "pct": 57.31707317073171
      },
      "syncTime": {
        "abs": 350,
        "pct": 42.68292682926829
      },
      "memUsage": 0,
      "sourceContext": {
        "file": "",
        "line": 0
      },
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 17,
      "name": "all",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 0,
      "parentId": -1,
      "time": 1020,
      "percentage_time": 100,
      "execTime": {
        "abs": 1020,
        "pct": 100
      },
      "syncTime": {
        "abs": 0,
        "pct": 0
      },
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 0
    },
    {
      "id": 18,
      "name": "eop",
      "inputs": [],
      "outputs": [],
      "depth": 0,
      "controlDeps": [],
      "antiDeps": [],
      "target": "",
      "type": "InternalNode",
      "condOps": [],
      "bodyOps": [],
      "thenOps": [],
      "elseOps": [],
      "componentNodes": [],
      "partitions": [],
      "level": 0,
      "parentId": -1,
      "time": 0,
      "percentage_time": 0,
      "execTime": {
        "abs": null,
        "pct": null
      },
      "syncTime": {
        "abs": null,
        "pct": null
      },
      "memUsage": 0,
      "numInputs": 0,
      "numOutputs": 0
    }
  ],
  "nodeNameToId": {
    "x0": 0,
    "x1": 1,
    "x2": 2,
    "x3": 3,
    "x4": 4,
    "x5": 5,
    "x7": 6,
    "x8": 7,
    "x9": 8,
    "x10": 9,
    "x5_h": 10,
    "x5_0": 11,
    "x5_1": 12,
    "x6": 13,
    "x2_h": 14,
    "x2_0": 15,
    "x2_1": 16,
    "all": 17,
    "eop": 18
  },
  "maxNodeLevel": 2
}