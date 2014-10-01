test_1_timelineData = {
  "timing": {
    "0": {
      "x0": [
        {
          "name": "x0",
          "id": 0,
          "lane": 0,
          "start": 0,
          "duration": 100,
          "end": 100,
          "node": {
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
          "level": 0,
          "displayText": "x0",
          "childNodes": [],
          "syncNodes": [],
          "parentId": -1,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 100,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region A",
              "id": 0
            }
          ],
          "type": "execution"
        }
      ],
      "x1": [
        {
          "name": "x1",
          "id": 1,
          "lane": 1,
          "start": 100,
          "duration": 100,
          "end": 200,
          "node": {
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
          "level": 0,
          "displayText": "x1",
          "childNodes": [],
          "syncNodes": [],
          "parentId": -1,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 100,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region A",
              "id": 0
            }
          ],
          "type": "execution"
        }
      ],
      "x2_0": [
        {
          "name": "x2_0",
          "id": 15,
          "lane": 0,
          "start": 100,
          "duration": 900,
          "end": 1000,
          "node": {
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
          "level": 0,
          "displayText": "x2_0",
          "childNodes": [
            {
              "name": "x4",
              "id": 4,
              "lane": 0,
              "start": 100,
              "duration": 100,
              "end": 200,
              "node": {
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
              "level": 1,
              "displayText": "x4",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 15,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 100,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region A",
                  "id": 0
                }
              ],
              "type": "execution"
            },
            {
              "name": "x6",
              "id": 13,
              "lane": 0,
              "start": 400,
              "duration": 50,
              "end": 450,
              "node": {
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
              "level": 1,
              "displayText": "x6",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 15,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 50,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                },
                {
                  "name": "Region B",
                  "id": 1
                }
              ],
              "type": "execution"
            },
            {
              "name": "x5_0",
              "id": 11,
              "lane": 0,
              "start": 450,
              "duration": 550,
              "end": 1000,
              "node": {
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
              "level": 1,
              "displayText": "x5_0",
              "childNodes": [
                {
                  "name": "x7",
                  "id": 6,
                  "lane": 0,
                  "start": 450,
                  "duration": 150,
                  "end": 600,
                  "node": {
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
                  "level": 2,
                  "displayText": "x7",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 11,
                  "dep_thread": "",
                  "dep_kernel": "",
                  "execTime": {
                    "abs": 150,
                    "pct": 100
                  },
                  "syncTime": {
                    "abs": 0,
                    "pct": 0
                  },
                  "ticTocRegions": [
                    {
                      "name": "Region C",
                      "id": 2
                    },
                    {
                      "name": "Region B",
                      "id": 1
                    }
                  ],
                  "type": "execution"
                },
                {
                  "name": "x9",
                  "id": 8,
                  "lane": 0,
                  "start": 700,
                  "duration": 300,
                  "end": 1000,
                  "node": {
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
                  "level": 2,
                  "displayText": "x9",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 11,
                  "dep_thread": "",
                  "dep_kernel": "",
                  "execTime": {
                    "abs": 300,
                    "pct": 100
                  },
                  "syncTime": {
                    "abs": 0,
                    "pct": 0
                  },
                  "ticTocRegions": [
                    {
                      "name": "Region C",
                      "id": 2
                    }
                  ],
                  "type": "execution"
                }
              ],
              "syncNodes": [
                {
                  "name": "__sync-ExecutionThread-0-x5_0-x8-1",
                  "lane": 0,
                  "start": 600,
                  "duration": 100,
                  "end": 700,
                  "level": 2,
                  "displayText": "",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 11,
                  "dep_thread": "T1",
                  "dep_kernel": "x8",
                  "execTime": {
                    "abs": null,
                    "pct": null
                  },
                  "syncTime": {
                    "abs": null,
                    "pct": null
                  },
                  "ticTocRegions": [],
                  "type": "sync"
                }
              ],
              "parentId": 15,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 450,
                "pct": 81.81818181818181
              },
              "syncTime": {
                "abs": 100,
                "pct": 18.181818181818183
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                }
              ],
              "type": "execution"
            }
          ],
          "syncNodes": [
            {
              "name": "__sync-ExecutionThread-0-x2_0-x3-1",
              "lane": 0,
              "start": 200,
              "duration": 200,
              "end": 400,
              "level": 1,
              "displayText": "",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 15,
              "dep_thread": "T1",
              "dep_kernel": "x3",
              "execTime": {
                "abs": null,
                "pct": null
              },
              "syncTime": {
                "abs": null,
                "pct": null
              },
              "ticTocRegions": [],
              "type": "sync"
            }
          ],
          "parentId": -1,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 600,
            "pct": 66.66666666666666
          },
          "syncTime": {
            "abs": 300,
            "pct": 33.333333333333336
          },
          "ticTocRegions": [],
          "type": "execution"
        }
      ],
      "x2_1": [
        {
          "name": "x2_1",
          "id": 16,
          "lane": 1,
          "start": 200,
          "duration": 820,
          "end": 1020,
          "node": {
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
          "level": 0,
          "displayText": "x2_1",
          "childNodes": [
            {
              "name": "x3",
              "id": 3,
              "lane": 1,
              "start": 200,
              "duration": 200,
              "end": 400,
              "node": {
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
              "level": 1,
              "displayText": "x3",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 16,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 200,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                }
              ],
              "type": "execution"
            },
            {
              "name": "x5_1",
              "id": 12,
              "lane": 1,
              "start": 450,
              "duration": 570,
              "end": 1020,
              "node": {
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
              "level": 1,
              "displayText": "x5_1",
              "childNodes": [
                {
                  "name": "x8",
                  "id": 7,
                  "lane": 1,
                  "start": 450,
                  "duration": 250,
                  "end": 700,
                  "node": {
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
                  "level": 2,
                  "displayText": "x8",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 12,
                  "dep_thread": "",
                  "dep_kernel": "",
                  "execTime": {
                    "abs": 250,
                    "pct": 100
                  },
                  "syncTime": {
                    "abs": 0,
                    "pct": 0
                  },
                  "ticTocRegions": [
                    {
                      "name": "Region C",
                      "id": 2
                    },
                    {
                      "name": "Region B",
                      "id": 1
                    }
                  ],
                  "type": "execution"
                },
                {
                  "name": "x10",
                  "id": 9,
                  "lane": 1,
                  "start": 1000,
                  "duration": 20,
                  "end": 1020,
                  "node": {
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
                  "level": 2,
                  "displayText": "x10",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 12,
                  "dep_thread": "",
                  "dep_kernel": "",
                  "execTime": {
                    "abs": 20,
                    "pct": 100
                  },
                  "syncTime": {
                    "abs": 0,
                    "pct": 0
                  },
                  "ticTocRegions": [],
                  "type": "execution"
                }
              ],
              "syncNodes": [
                {
                  "name": "__sync-ExecutionThread-1-x5_1-x9-0",
                  "lane": 1,
                  "start": 700,
                  "duration": 300,
                  "end": 1000,
                  "level": 2,
                  "displayText": "",
                  "childNodes": [],
                  "syncNodes": [],
                  "parentId": 12,
                  "dep_thread": "T0",
                  "dep_kernel": "x9",
                  "execTime": {
                    "abs": null,
                    "pct": null
                  },
                  "syncTime": {
                    "abs": null,
                    "pct": null
                  },
                  "ticTocRegions": [],
                  "type": "sync"
                }
              ],
              "parentId": 16,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 270,
                "pct": 47.36842105263158
              },
              "syncTime": {
                "abs": 300,
                "pct": 52.63157894736842
              },
              "ticTocRegions": [],
              "type": "execution"
            }
          ],
          "syncNodes": [
            {
              "name": "__sync-ExecutionThread-1-x2_1-x6-0",
              "lane": 1,
              "start": 400,
              "duration": 50,
              "end": 450,
              "level": 1,
              "displayText": "",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 16,
              "dep_thread": "T0",
              "dep_kernel": "x6",
              "execTime": {
                "abs": null,
                "pct": null
              },
              "syncTime": {
                "abs": null,
                "pct": null
              },
              "ticTocRegions": [],
              "type": "sync"
            }
          ],
          "parentId": -1,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 470,
            "pct": 57.31707317073171
          },
          "syncTime": {
            "abs": 350,
            "pct": 42.68292682926829
          },
          "ticTocRegions": [],
          "type": "execution"
        }
      ],
      "all": [
        {
          "name": "all",
          "id": 17,
          "lane": 2,
          "start": 0,
          "duration": 1020,
          "end": 1020,
          "node": {
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
          "level": 0,
          "displayText": "all",
          "childNodes": [],
          "syncNodes": [],
          "parentId": -1,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 1020,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [],
          "type": "execution"
        }
      ],
      "__sync-ExecutionThread-1-null-x0-0": [
        {
          "name": "__sync-ExecutionThread-1-null-x0-0",
          "lane": 1,
          "start": 0,
          "duration": 100,
          "end": 100,
          "level": 0,
          "displayText": "",
          "childNodes": [],
          "syncNodes": [],
          "parentId": -1,
          "dep_thread": "T0",
          "dep_kernel": "x0",
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "ticTocRegions": [],
          "type": "sync"
        }
      ]
    },
    "1": {
      "x4": [
        {
          "name": "x4",
          "id": 4,
          "lane": 0,
          "start": 100,
          "duration": 100,
          "end": 200,
          "node": {
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
          "level": 1,
          "displayText": "x4",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 15,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 100,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region A",
              "id": 0
            }
          ],
          "type": "execution"
        }
      ],
      "x6": [
        {
          "name": "x6",
          "id": 13,
          "lane": 0,
          "start": 400,
          "duration": 50,
          "end": 450,
          "node": {
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
          "level": 1,
          "displayText": "x6",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 15,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 50,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            },
            {
              "name": "Region B",
              "id": 1
            }
          ],
          "type": "execution"
        }
      ],
      "x3": [
        {
          "name": "x3",
          "id": 3,
          "lane": 1,
          "start": 200,
          "duration": 200,
          "end": 400,
          "node": {
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
          "level": 1,
          "displayText": "x3",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 16,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 200,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            }
          ],
          "type": "execution"
        }
      ],
      "x5_0": [
        {
          "name": "x5_0",
          "id": 11,
          "lane": 0,
          "start": 450,
          "duration": 550,
          "end": 1000,
          "node": {
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
          "level": 1,
          "displayText": "x5_0",
          "childNodes": [
            {
              "name": "x7",
              "id": 6,
              "lane": 0,
              "start": 450,
              "duration": 150,
              "end": 600,
              "node": {
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
              "level": 2,
              "displayText": "x7",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 11,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 150,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                },
                {
                  "name": "Region B",
                  "id": 1
                }
              ],
              "type": "execution"
            },
            {
              "name": "x9",
              "id": 8,
              "lane": 0,
              "start": 700,
              "duration": 300,
              "end": 1000,
              "node": {
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
              "level": 2,
              "displayText": "x9",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 11,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 300,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                }
              ],
              "type": "execution"
            }
          ],
          "syncNodes": [
            {
              "name": "__sync-ExecutionThread-0-x5_0-x8-1",
              "lane": 0,
              "start": 600,
              "duration": 100,
              "end": 700,
              "level": 2,
              "displayText": "",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 11,
              "dep_thread": "T1",
              "dep_kernel": "x8",
              "execTime": {
                "abs": null,
                "pct": null
              },
              "syncTime": {
                "abs": null,
                "pct": null
              },
              "ticTocRegions": [],
              "type": "sync"
            }
          ],
          "parentId": 15,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 450,
            "pct": 81.81818181818181
          },
          "syncTime": {
            "abs": 100,
            "pct": 18.181818181818183
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            }
          ],
          "type": "execution"
        }
      ],
      "x5_1": [
        {
          "name": "x5_1",
          "id": 12,
          "lane": 1,
          "start": 450,
          "duration": 570,
          "end": 1020,
          "node": {
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
          "level": 1,
          "displayText": "x5_1",
          "childNodes": [
            {
              "name": "x8",
              "id": 7,
              "lane": 1,
              "start": 450,
              "duration": 250,
              "end": 700,
              "node": {
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
              "level": 2,
              "displayText": "x8",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 12,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 250,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [
                {
                  "name": "Region C",
                  "id": 2
                },
                {
                  "name": "Region B",
                  "id": 1
                }
              ],
              "type": "execution"
            },
            {
              "name": "x10",
              "id": 9,
              "lane": 1,
              "start": 1000,
              "duration": 20,
              "end": 1020,
              "node": {
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
              "level": 2,
              "displayText": "x10",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 12,
              "dep_thread": "",
              "dep_kernel": "",
              "execTime": {
                "abs": 20,
                "pct": 100
              },
              "syncTime": {
                "abs": 0,
                "pct": 0
              },
              "ticTocRegions": [],
              "type": "execution"
            }
          ],
          "syncNodes": [
            {
              "name": "__sync-ExecutionThread-1-x5_1-x9-0",
              "lane": 1,
              "start": 700,
              "duration": 300,
              "end": 1000,
              "level": 2,
              "displayText": "",
              "childNodes": [],
              "syncNodes": [],
              "parentId": 12,
              "dep_thread": "T0",
              "dep_kernel": "x9",
              "execTime": {
                "abs": null,
                "pct": null
              },
              "syncTime": {
                "abs": null,
                "pct": null
              },
              "ticTocRegions": [],
              "type": "sync"
            }
          ],
          "parentId": 16,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 270,
            "pct": 47.36842105263158
          },
          "syncTime": {
            "abs": 300,
            "pct": 52.63157894736842
          },
          "ticTocRegions": [],
          "type": "execution"
        }
      ],
      "__sync-ExecutionThread-0-x2_0-x3-1": [
        {
          "name": "__sync-ExecutionThread-0-x2_0-x3-1",
          "lane": 0,
          "start": 200,
          "duration": 200,
          "end": 400,
          "level": 1,
          "displayText": "",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 15,
          "dep_thread": "T1",
          "dep_kernel": "x3",
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "ticTocRegions": [],
          "type": "sync"
        }
      ],
      "__sync-ExecutionThread-1-x2_1-x6-0": [
        {
          "name": "__sync-ExecutionThread-1-x2_1-x6-0",
          "lane": 1,
          "start": 400,
          "duration": 50,
          "end": 450,
          "level": 1,
          "displayText": "",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 16,
          "dep_thread": "T0",
          "dep_kernel": "x6",
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "ticTocRegions": [],
          "type": "sync"
        }
      ]
    },
    "2": {
      "x7": [
        {
          "name": "x7",
          "id": 6,
          "lane": 0,
          "start": 450,
          "duration": 150,
          "end": 600,
          "node": {
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
          "level": 2,
          "displayText": "x7",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 11,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 150,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            },
            {
              "name": "Region B",
              "id": 1
            }
          ],
          "type": "execution"
        }
      ],
      "x9": [
        {
          "name": "x9",
          "id": 8,
          "lane": 0,
          "start": 700,
          "duration": 300,
          "end": 1000,
          "node": {
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
          "level": 2,
          "displayText": "x9",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 11,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 300,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            }
          ],
          "type": "execution"
        }
      ],
      "x8": [
        {
          "name": "x8",
          "id": 7,
          "lane": 1,
          "start": 450,
          "duration": 250,
          "end": 700,
          "node": {
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
          "level": 2,
          "displayText": "x8",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 12,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 250,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [
            {
              "name": "Region C",
              "id": 2
            },
            {
              "name": "Region B",
              "id": 1
            }
          ],
          "type": "execution"
        }
      ],
      "x10": [
        {
          "name": "x10",
          "id": 9,
          "lane": 1,
          "start": 1000,
          "duration": 20,
          "end": 1020,
          "node": {
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
          "level": 2,
          "displayText": "x10",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 12,
          "dep_thread": "",
          "dep_kernel": "",
          "execTime": {
            "abs": 20,
            "pct": 100
          },
          "syncTime": {
            "abs": 0,
            "pct": 0
          },
          "ticTocRegions": [],
          "type": "execution"
        }
      ],
      "__sync-ExecutionThread-0-x5_0-x8-1": [
        {
          "name": "__sync-ExecutionThread-0-x5_0-x8-1",
          "lane": 0,
          "start": 600,
          "duration": 100,
          "end": 700,
          "level": 2,
          "displayText": "",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 11,
          "dep_thread": "T1",
          "dep_kernel": "x8",
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "ticTocRegions": [],
          "type": "sync"
        }
      ],
      "__sync-ExecutionThread-1-x5_1-x9-0": [
        {
          "name": "__sync-ExecutionThread-1-x5_1-x9-0",
          "lane": 1,
          "start": 700,
          "duration": 300,
          "end": 1000,
          "level": 2,
          "displayText": "",
          "childNodes": [],
          "syncNodes": [],
          "parentId": 12,
          "dep_thread": "T0",
          "dep_kernel": "x9",
          "execTime": {
            "abs": null,
            "pct": null
          },
          "syncTime": {
            "abs": null,
            "pct": null
          },
          "ticTocRegions": [],
          "type": "sync"
        }
      ]
    }
  },
  "lanes": [
    "T0",
    "T1",
    "T2"
  ],
  "totalAppTime": 1020,
  "ticTocRegions": [
    {
      "id": 2,
      "name": "Region C",
      "start": 200,
      "duration": 800,
      "end": 1000,
      "percentage_time": "78.43",
      "childNodes": [
        {
          "id": 6,
          "name": "x7"
        },
        {
          "id": 8,
          "name": "x9"
        },
        {
          "id": 7,
          "name": "x8"
        },
        {
          "id": 13,
          "name": "x6"
        },
        {
          "id": 3,
          "name": "x3"
        },
        {
          "id": 11,
          "name": "x5_0"
        }
      ],
      "childToPerf": {
        "x7": {
          "id": 6,
          "abs": 150,
          "pct": "18.75"
        },
        "x9": {
          "id": 8,
          "abs": 300,
          "pct": "37.50"
        },
        "x8": {
          "id": 7,
          "abs": 250,
          "pct": "31.25"
        },
        "x6": {
          "id": 13,
          "abs": 50,
          "pct": "6.25"
        },
        "x3": {
          "id": 3,
          "abs": 200,
          "pct": "25.00"
        },
        "x5_0": {
          "id": 11,
          "abs": 550,
          "pct": "68.75"
        }
      }
    },
    {
      "id": 1,
      "name": "Region B",
      "start": 400,
      "duration": 300,
      "end": 700,
      "percentage_time": "29.41",
      "childNodes": [
        {
          "id": 6,
          "name": "x7"
        },
        {
          "id": 7,
          "name": "x8"
        },
        {
          "id": 13,
          "name": "x6"
        }
      ],
      "childToPerf": {
        "x7": {
          "id": 6,
          "abs": 150,
          "pct": "50.00"
        },
        "x8": {
          "id": 7,
          "abs": 250,
          "pct": "83.33"
        },
        "x6": {
          "id": 13,
          "abs": 50,
          "pct": "16.67"
        }
      }
    },
    {
      "id": 0,
      "name": "Region A",
      "start": 0,
      "duration": 200,
      "end": 200,
      "percentage_time": "19.61",
      "childNodes": [
        {
          "id": 4,
          "name": "x4"
        },
        {
          "id": 0,
          "name": "x0"
        },
        {
          "id": 1,
          "name": "x1"
        }
      ],
      "childToPerf": {
        "x4": {
          "id": 4,
          "abs": 100,
          "pct": "50.00"
        },
        "x0": {
          "id": 0,
          "abs": 100,
          "pct": "50.00"
        },
        "x1": {
          "id": 1,
          "abs": 100,
          "pct": "50.00"
        }
      }
    }
  ]
} 