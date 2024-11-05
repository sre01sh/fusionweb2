import {Request, Response} from 'express';

const waitTime = (time: number = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default {
  'Get /api/sfc/product/getProductNoList': async (req: Request, res: Response) => {
    res.send({
        "success": true,
        "data": [
            {
                "id": 1,
                "productNo": "6853247351"
            },
            {
                "id": 65,
                "productNo": "799190807"
            },
            {
                "id": 66,
                "productNo": "799190808"
            },
            {
                "id": 67,
                "productNo": "799190809"
            },
            {
                "id": 68,
                "productNo": "685324721"
            },
            {
                "id": 69,
                "productNo": "685324722"
            },
            {
                "id": 70,
                "productNo": "685324714"
            },
            {
                "id": 71,
                "productNo": "685324715"
            },
            {
                "id": 72,
                "productNo": "798601276"
            },
            {
                "id": 73,
                "productNo": "798601278"
            },
            {
                "id": 74,
                "productNo": "685324734"
            },
            {
                "id": 75,
                "productNo": "685324735"
            },
            {
                "id": 76,
                "productNo": "685324736"
            },
            {
                "id": 77,
                "productNo": "685324737"
            },
            {
                "id": 78,
                "productNo": "685324538"
            },
            {
                "id": 79,
                "productNo": "685324539"
            },
            {
                "id": 80,
                "productNo": "685324540"
            },
            {
                "id": 81,
                "productNo": "685324541"
            },
            {
                "id": 82,
                "productNo": "685324542"
            },
            {
                "id": 83,
                "productNo": "685324543"
            },
            {
                "id": 84,
                "productNo": "685324544"
            },
            {
                "id": 85,
                "productNo": "685324545"
            },
            {
                "id": 86,
                "productNo": "685324557"
            },
            {
                "id": 87,
                "productNo": "685324559"
            },
            {
                "id": 88,
                "productNo": "685324529"
            },
            {
                "id": 89,
                "productNo": "685324522"
            },
            {
                "id": 90,
                "productNo": "685324523"
            },
            {
                "id": 91,
                "productNo": "6830710011"
            },
            {
                "id": 92,
                "productNo": "6830710021"
            },
            {
                "id": 93,
                "productNo": "6830710022"
            },
            {
                "id": 94,
                "productNo": "6830710023"
            },
            {
                "id": 95,
                "productNo": "6830710024"
            },
            {
                "id": 96,
                "productNo": "6830710028"
            },
            {
                "id": 118,
                "productNo": "726129001"
            }
        ],
        "traceId": "037eb7db9c12bfad"
    });
  },
  'Get /api/sfc/product/getProductSettingByPid': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
        "success": true,
        "data": {
            "product": {
                "id": 117,
                "productNo": "726125001",
                "name": "B Side",
                "sideType": "NA",
                "customer": "Toyota",
                "description": "B Side",
                "secondaryPkgTrace": true,
                "secondarySpq": 105,
                "tertiaryPkgTrace": false,
                "area": "PCBA",
                "createUser": "SFC",
                "createTimestamp": "2024-08-12T14:23:23Z"
            },
            "workflowId": 2
        },
        "traceId": "c972229b53e01c92"
    });
  },
  'POST /api/sfc/product/saveProductSetting': async (req: Request, res: Response) => {
    await waitTime();
    console.log(req.body);
    res.send({
      success: true,
    });
  },
  'Get /api/sfc/workflow/getWorkflows': async (req: Request, res: Response) => {
    res.send({
        "success": true,
        "data": [
            {
                "id": 1,
                "name": "SMT_Frontend",
                "description": "SMT前段",
                "version": "1",
                "area": "PCBA",
                "isDeleted": "N",
                "createUser": "SFC",
                "createTimestamp": "2024-07-07T07:19:24Z"
            },
            {
                "id": 2,
                "name": "Toyota自动组装",
                "description": "Toyota自动组装",
                "version": "1",
                "area": "PCBA",
                "isDeleted": "N",
                "createUser": "SFC",
                "createTimestamp": "2024-07-07T07:19:24Z"
            },
            {
                "id": 3,
                "name": "SMT_TEST",
                "version": "a",
                "area": "PCBA",
                "isDeleted": "N",
                "createUser": "anonymousUser",
                "createTimestamp": "2024-10-06T14:12:25Z"
            }
        ]
    });
  },
  'Get /api/sfc/workflow/getWorkflowGraph': async (req: Request, res: Response) => {
    const wid = req.query.wid;
    if (wid === '3')
      res.send({
        "success": true,
        "data": {
            "workflowId": 3,
            "nodes": [
                {
                    "id": "19a",
                    "type": "STANDARD",
                    "position": {
                        "x": -429.57118,
                        "y": -376.01029
                    },
                    "data": {
                        "label": "组装&测试A",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "21a",
                    "type": "STANDARD",
                    "position": {
                        "x": -428.52144,
                        "y": -49.65352
                    },
                    "data": {
                        "label": "测试B",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "22a",
                    "type": "STANDARD",
                    "position": {
                        "x": -222.83705,
                        "y": 354.33619
                    },
                    "data": {
                        "label": "外检&包装",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "25a",
                    "type": "REWORK",
                    "position": {
                        "x": 333.37564,
                        "y": 563.94854
                    },
                    "data": {
                        "label": "外检&包装rework",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "P13TDJJAH1",
                    "type": "STANDARD",
                    "position": {
                        "x": -614.0,
                        "y": 681.0
                    },
                    "data": {
                        "label": "newNode2",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                }
            ],
            "edges": [
                {
                    "id": "27a",
                    "source": "19a",
                    "target": "21a"
                },
                {
                    "id": "29a",
                    "source": "21a",
                    "target": "22a"
                },
                {
                    "id": "31a",
                    "source": "22a",
                    "target": "25a"
                },
                {
                    "id": "32a",
                    "source": "25a",
                    "target": "22a"
                },
                {
                    "id": "owNUU2Gbit",
                    "source": "22a",
                    "target": "P13TDJJAH1"
                }
            ]
        },
        "traceId": "1b4a1fcf7a10cbe0"
    });
      if (wid === '1')
        res.send({
            "success": true,
            "data": {
                "workflowId": 1,
                "nodes": [
                    {
                        "id": "1",
                        "type": "STANDARD",
                        "position": {
                            "x": -1503.0,
                            "y": -1395.5
                        },
                        "data": {
                            "label": "Laser",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "10",
                        "type": "REWORK",
                        "position": {
                            "x": -522.0,
                            "y": -404.0
                        },
                        "data": {
                            "label": "SPI_B_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "11",
                        "type": "REWORK",
                        "position": {
                            "x": -900.0,
                            "y": -944.0
                        },
                        "data": {
                            "label": "Mount_A_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "12",
                        "type": "REWORK",
                        "position": {
                            "x": -302.0,
                            "y": -138.0
                        },
                        "data": {
                            "label": "Mount_B_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "13",
                        "type": "REWORK",
                        "position": {
                            "x": -792.0,
                            "y": -640.0
                        },
                        "data": {
                            "label": "AOI_A_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "14",
                        "type": "REWORK",
                        "position": {
                            "x": -250.0,
                            "y": 189.75
                        },
                        "data": {
                            "label": "AOI_B_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "15",
                        "type": "STANDARD",
                        "position": {
                            "x": -54.0,
                            "y": -1445.5
                        },
                        "data": {
                            "label": "X_ray",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "16",
                        "type": "STANDARD",
                        "position": {
                            "x": 56.0,
                            "y": -1052.0
                        },
                        "data": {
                            "label": "ICT",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "17",
                        "type": "STANDARD",
                        "position": {
                            "x": 206.0,
                            "y": -418.0
                        },
                        "data": {
                            "label": "UV_AOI",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "18",
                        "type": "STANDARD",
                        "position": {
                            "x": 286.0,
                            "y": -100.0
                        },
                        "data": {
                            "label": "DePanel",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "2",
                        "type": "STANDARD",
                        "position": {
                            "x": -1422.0,
                            "y": -1106.0
                        },
                        "data": {
                            "label": "SPI_A",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "23",
                        "type": "REWORK",
                        "position": {
                            "x": 444.0,
                            "y": -1230.0
                        },
                        "data": {
                            "label": "ICT_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "24",
                        "type": "STANDARD",
                        "position": {
                            "x": 134.0,
                            "y": -730.0
                        },
                        "data": {
                            "label": "Coating&Curing",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "3",
                        "type": "STANDARD",
                        "position": {
                            "x": -888.0,
                            "y": -250.0
                        },
                        "data": {
                            "label": "SPI_B",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "4",
                        "type": "STANDARD",
                        "position": {
                            "x": -1394.0,
                            "y": -842.0
                        },
                        "data": {
                            "label": "Mount_A",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "5",
                        "type": "STANDARD",
                        "position": {
                            "x": -754.0,
                            "y": 30.0
                        },
                        "data": {
                            "label": "Mount_B",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "6",
                        "type": "STANDARD",
                        "position": {
                            "x": -1204.0,
                            "y": -552.0
                        },
                        "data": {
                            "label": "AOI_A",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "7",
                        "type": "STANDARD",
                        "position": {
                            "x": -596.0,
                            "y": 327.0
                        },
                        "data": {
                            "label": "AOI_B",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "8",
                        "type": "REWORK",
                        "position": {
                            "x": -1162.0,
                            "y": -1548.0
                        },
                        "data": {
                            "label": "Laser_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    },
                    {
                        "id": "9",
                        "type": "REWORK",
                        "position": {
                            "x": -1022.0,
                            "y": -1272.0
                        },
                        "data": {
                            "label": "SPI_A_rework",
                            "allowAutoMoveIn": false,
                            "materialTrace": false
                        }
                    }
                ],
                "edges": [
                    {
                        "id": "1",
                        "source": "1",
                        "target": "2"
                    },
                    {
                        "id": "10",
                        "source": "9",
                        "target": "2"
                    },
                    {
                        "id": "11",
                        "source": "3",
                        "target": "10"
                    },
                    {
                        "id": "12",
                        "source": "10",
                        "target": "3"
                    },
                    {
                        "id": "13",
                        "source": "4",
                        "target": "11"
                    },
                    {
                        "id": "14",
                        "source": "11",
                        "target": "4"
                    },
                    {
                        "id": "15",
                        "source": "12",
                        "target": "5"
                    },
                    {
                        "id": "16",
                        "source": "5",
                        "target": "12"
                    },
                    {
                        "id": "17",
                        "source": "6",
                        "target": "13"
                    },
                    {
                        "id": "18",
                        "source": "13",
                        "target": "6"
                    },
                    {
                        "id": "19",
                        "source": "7",
                        "target": "14"
                    },
                    {
                        "id": "2",
                        "source": "2",
                        "target": "4"
                    },
                    {
                        "id": "20",
                        "source": "14",
                        "target": "7"
                    },
                    {
                        "id": "21",
                        "source": "7",
                        "target": "15"
                    },
                    {
                        "id": "22",
                        "source": "15",
                        "target": "16"
                    },
                    {
                        "id": "23",
                        "source": "16",
                        "target": "24"
                    },
                    {
                        "id": "24",
                        "source": "17",
                        "target": "18"
                    },
                    {
                        "id": "25",
                        "source": "16",
                        "target": "23"
                    },
                    {
                        "id": "26",
                        "source": "23",
                        "target": "16"
                    },
                    {
                        "id": "3",
                        "source": "4",
                        "target": "6"
                    },
                    {
                        "id": "30",
                        "source": "24",
                        "target": "17"
                    },
                    {
                        "id": "4",
                        "source": "6",
                        "target": "3"
                    },
                    {
                        "id": "5",
                        "source": "3",
                        "target": "5"
                    },
                    {
                        "id": "6",
                        "source": "5",
                        "target": "7"
                    },
                    {
                        "id": "7",
                        "source": "1",
                        "target": "8"
                    },
                    {
                        "id": "8",
                        "source": "8",
                        "target": "1"
                    },
                    {
                        "id": "9",
                        "source": "2",
                        "target": "9"
                    }
                ]
            },
            "traceId": "d1f290d16e3a2c20"
        });
    if (wid === '2')
    res.send({
        "success": true,
        "data": {
            "workflowId": 2,
            "nodes": [
                {
                    "id": "19",
                    "type": "STANDARD",
                    "position": {
                        "x": -305.59863,
                        "y": -534.04117
                    },
                    "data": {
                        "label": "组装&测试A",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "21",
                    "type": "STANDARD",
                    "position": {
                        "x": -417.5506,
                        "y": -228.44254
                    },
                    "data": {
                        "label": "测试B",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "22",
                    "type": "STANDARD",
                    "position": {
                        "x": -257.18696,
                        "y": 118.00343
                    },
                    "data": {
                        "label": "外检&包装",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                },
                {
                    "id": "25",
                    "type": "REWORK",
                    "position": {
                        "x": 226.92967,
                        "y": -60.51458
                    },
                    "data": {
                        "label": "外检&包装rework",
                        "allowAutoMoveIn": false,
                        "materialTrace": false
                    }
                }
            ],
            "edges": [
                {
                    "id": "27",
                    "source": "19",
                    "target": "21"
                },
                {
                    "id": "29",
                    "source": "21",
                    "target": "22"
                },
                {
                    "id": "31",
                    "source": "22",
                    "target": "25"
                },
                {
                    "id": "32",
                    "source": "25",
                    "target": "22"
                }
            ]
        },
        "traceId": "8eb89416e7557b77"
    });
  },
  'POST /api/sfc/workflow/saveWorkflow': async (req: Request, res: Response) => {
    await waitTime();
    console.log(req.body);
    res.send({
      success: true,
    });
  },
  'POST /api/sfc/workflow/saveWorkflowGraph': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      success: true,
    });
  },
  'Get /api/sfc/production/getAllTraceHistory': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
        "success": true,
        "data": [
            {
                "id": 705,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "18",
                "opNodeName": "DePanel",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 40,
                "resName": "L08AOI3",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AOI3",
                "createTimestamp": "2024-10-15T06:20:46Z"
            },
            {
                "id": 704,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "17",
                "opNodeName": "UV_AOI",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 40,
                "resName": "L08AOI3",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AOI3",
                "createTimestamp": "2024-10-15T06:20:46Z"
            },
            {
                "id": 703,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "17",
                "opNodeName": "UV_AOI",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 38,
                "resName": "L08CC1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08CC1",
                "createTimestamp": "2024-10-15T06:20:46Z"
            },
            {
                "id": 702,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "24",
                "opNodeName": "Coating&Curing",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 38,
                "resName": "L08CC1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08CC1",
                "createTimestamp": "2024-10-15T06:20:46Z"
            },
            {
                "id": 701,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "24",
                "opNodeName": "Coating&Curing",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 34,
                "resName": "L08ICT1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "ICTAdmin",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 700,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "16",
                "opNodeName": "ICT",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 34,
                "resName": "L08ICT1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "ICTAdmin",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 699,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "16",
                "opNodeName": "ICT",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 37,
                "resName": "L08AX1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AX1",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 698,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "15",
                "opNodeName": "X_ray",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "SCRAP",
                "moveMode": "ARRAY",
                "resourceId": 37,
                "resName": "L08AX1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AX1",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 697,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "15",
                "opNodeName": "X_ray",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 32,
                "resName": "L08AOI2",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AOI2",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 696,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "7",
                "opNodeName": "AOI_B",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "SUSP",
                "moveMode": "ARRAY",
                "resourceId": 32,
                "resName": "L08AOI2",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AOI2",
                "createTimestamp": "2024-10-15T06:20:45Z"
            },
            {
                "id": 695,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "7",
                "opNodeName": "AOI_B",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 30,
                "resName": "L08A02",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08A02",
                "createTimestamp": "2024-10-15T06:20:44Z"
            },
            {
                "id": 694,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "5",
                "opNodeName": "Mount_B",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 30,
                "resName": "L08A02",
                "materialTxnId": "KzPAL84t1O",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08A02",
                "createTimestamp": "2024-10-15T06:20:44Z"
            },
            {
                "id": 693,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "5",
                "opNodeName": "Mount_B",
                "opNodeType": "REWORK",
                "opStat": "MOVEIN",
                "qcStat": "SUSP",
                "moveMode": "ARRAY",
                "resourceId": 28,
                "resName": "L08SPI2",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SPI2",
                "createTimestamp": "2024-10-15T06:20:44Z"
            },
            {
                "id": 692,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "3",
                "opNodeName": "SPI_B",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 28,
                "resName": "L08SPI2",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SPI2",
                "createTimestamp": "2024-10-15T06:20:44Z"
            },
            {
                "id": 691,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "3",
                "opNodeName": "SPI_B",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 26,
                "resName": "L08SP2",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SP2",
                "createTimestamp": "2024-10-15T06:20:42Z"
            },
            {
                "id": 690,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "6",
                "opNodeName": "AOI_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 31,
                "resName": "L08AOI1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08AOI1",
                "createTimestamp": "2024-10-15T06:20:42Z"
            },
            {
                "id": 689,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "6",
                "opNodeName": "AOI_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 29,
                "resName": "L08A01",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08A01",
                "createTimestamp": "2024-10-15T06:20:41Z"
            },
            {
                "id": 688,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "4",
                "opNodeName": "Mount_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 29,
                "resName": "L08A01",
                "materialTxnId": "jGcNXmKCK2",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08A01",
                "createTimestamp": "2024-10-15T06:20:41Z"
            },
            {
                "id": 687,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "4",
                "opNodeName": "Mount_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 27,
                "resName": "L08SPI1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SPI1",
                "createTimestamp": "2024-10-15T06:20:41Z"
            },
            {
                "id": 686,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "2",
                "opNodeName": "SPI_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 27,
                "resName": "L08SPI1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SPI1",
                "createTimestamp": "2024-10-15T06:20:41Z"
            },
            {
                "id": 685,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "2",
                "opNodeName": "SPI_A",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 25,
                "resName": "L08SP1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08SP1",
                "createTimestamp": "2024-10-15T06:20:39Z"
            },
            {
                "id": 684,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "1",
                "opNodeName": "Laser",
                "opNodeType": "STANDARD",
                "opStat": "MOVEOUT",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 24,
                "resName": "L08LM1",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "L08LM1",
                "createTimestamp": "2024-10-15T06:20:39Z"
            },
            {
                "id": 683,
                "traceId": "cFvxL50hEV",
                "traceSn": "P10",
                "orderNo": "860906788",
                "workflowId": 1,
                "workflowName": "SMT_Frontend",
                "productNo": "799190809",
                "opNodeId": "1",
                "opNodeName": "Laser",
                "opNodeType": "STANDARD",
                "opStat": "MOVEIN",
                "qcStat": "PASS",
                "moveMode": "ARRAY",
                "resourceId": 1,
                "resName": "PCBA_1LD_01",
                "materialTxnId": "",
                "area": "PCBA",
                "cell": "SMTL08",
                "createUser": "PCBA_1LD_01",
                "createTimestamp": "2024-10-15T06:20:38Z"
            }
        ],
        "traceId": "1042bf9aa422a376"
    });
  },
  'GET /api/sfc/production/getProductSubItems': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
        "success": true,
        "data": {
            "productNo": "799190809",
            "subItemQty": 8,
            "subItems": [
                {
                    "id": 1635,
                    "panelSn": "P10",
                    "pcbSn": "",
                    "inspResult": "PASS",
                    "boardType": "PANEL",
                    "boardIndex": "",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:00Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:00Z"
                },
                {
                    "id": 1636,
                    "panelSn": "P10",
                    "pcbSn": "P10-0",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "0",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:00Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:00Z"
                },
                {
                    "id": 1637,
                    "panelSn": "P10",
                    "pcbSn": "P10-1",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "1",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:00Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:00Z"
                },
                {
                    "id": 1638,
                    "panelSn": "P10",
                    "pcbSn": "P10-2",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "2",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:00Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:00Z"
                },
                {
                    "id": 1639,
                    "panelSn": "P10",
                    "pcbSn": "P10-3",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "3",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:01Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:01Z"
                },
                {
                    "id": 1640,
                    "panelSn": "P10",
                    "pcbSn": "P10-4",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "4",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:01Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:01Z"
                },
                {
                    "id": 1641,
                    "panelSn": "P10",
                    "pcbSn": "P10-5",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "5",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:01Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:01Z"
                },
                {
                    "id": 1642,
                    "panelSn": "P10",
                    "pcbSn": "P10-6",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "6",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:01Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:01Z"
                },
                {
                    "id": 1643,
                    "panelSn": "P10",
                    "pcbSn": "P10-7",
                    "inspResult": "PASS",
                    "boardType": "PCB",
                    "boardIndex": "7",
                    "createUser": "PCBA_1LD_01",
                    "createTimestamp": "2024-10-16T07:31:01Z",
                    "updateUser": "PCBA_1LD_01",
                    "updateTimestamp": "2024-10-16T07:31:01Z"
                }
            ]
        },
        "traceId": "081895b0e67b102d"
    });
  },
};
