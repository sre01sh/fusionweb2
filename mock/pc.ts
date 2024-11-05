import {Request, Response} from 'express';

const waitTime = (time: number = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default {
  'GET /api/getCalendarOffsetDate': (req: Request, res: Response) => {
    res.send({
      data: {calendarOffsetDate: new Date()},
      success: true,
    });
  },
  'GET /api/getMfgOrdersByCell': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          id: 3014,
          mfgOrder: '860266511',
          productName: '685324456',
          productDesc: '',
          cell: 'SMT',
          mfgOrderQty: 2150.0,
          mfgOrderStatus: 'Dispatched',
          plannedStartDate: '2023-10-19T16:00:00Z',
          plannedCompletionDate: '2024-07-30T04:53:20Z',
          matPnNo: 59,
          shortageNo: 66,
          requestedNo: 59,
          mrStatus: "Completed"
        },
        {
          id: 3015,
          mfgOrder: '860269733',
          productName: '685324458',
          productDesc: '',
          cell: 'SMT',
          mfgOrderQty: 1000.0,
          mfgOrderStatus: 'Dispatched',
          plannedStartDate: '2023-10-19T16:00:00Z',
          plannedCompletionDate: '2024-07-30T04:53:20Z',
          matPnNo: 59,
          shortageNo: 0,
          requestedNo: 59,
          mrStatus: "Completed"
        },
        {
          id: 33,
          mfgOrder: '860266512',
          productName: '685324496',
          productDesc: '',
          cell: 'SMT',
          mfgOrderQty: 2150.0,
          mfgOrderStatus: 'Dispatched',
          plannedStartDate: '2023-10-19T16:00:00Z',
          plannedCompletionDate: '2024-07-30T04:53:20Z',
          matPnNo: 59,
          shortageNo: 66,
          requestedNo: 59,
          mrStatus: "Initial"
        },
        {
          id: 12,
          mfgOrder: '860269723',
          productName: '685324448',
          productDesc: '',
          cell: 'SMT',
          mfgOrderQty: 1000.0,
          mfgOrderStatus: 'Dispatched',
          plannedStartDate: '2023-10-19T16:00:00Z',
          plannedCompletionDate: '2024-07-30T04:53:20Z',
          matPnNo: 59,
          shortageNo: 0,
          requestedNo: 59,
          mrStatus: "Initial"
        },
      ],
      success: true,
    });
  },
  'POST /api/submitPlannedMR': async (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  },
  'GET /api/getMatListByOrders': async (req: Request, res: Response) => {
    const data = [];
    data.push({
      matPn: '170001701',
      matDesc: 'Impel 6Px16C DC Ungd Assy',
      reqQty: 10500,
      trQty: 10500,
    });
    data.push({
      matPn: '170001802',
      matDesc: 'Impel 6Px18C DC',
      reqQty: 2900,
      trQty: 2900,
    });
    data.push({
      matPn: '170002206',
      matDesc: 'Impel 6Px16C DC Ungd Assy Chipset',
      reqQty: 120000,
      trQty: 120000,
    });
    for (let i = 0; i < 0; i++) {
      const matPn = Math.floor(Math.random() * 1000000000).toString();
      data.push({
        matPn: matPn,
        matDesc: `Impel 6Px16C DC Ungd Assy Chipset`,
        reqQty: 120000,
        trQty: 120000,
      });
    }
    await waitTime();
    res.send({
      data: data,
      success: true,
    });
  },
  'GET /api/getUnplannedReasons': (req: Request, res: Response) => {
    res.send({
      data: [
        {reasonCode: 'NP', reasonDesc: '试制新产品'},
        {reasonCode: 'APPEND', reasonDesc: '补料'},
        {reasonCode: 'NG', reasonDesc: '试制新工艺'},
      ],
      success: true,
    });
  },
  'POST /api/submitUnplannedMR': async (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  },
  'GET /api/getToListForWarehouse': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      data: [
        {
          toNo: '1029382',
          trUserId: 'userId1',
          trUserName: '张三',
          trUserExt: '2938',
          trBranch: '三厂',
          trCell: 'PCBA',
          trFloor: '3F',
          toUserId: 'keeperId1',
          toUserName: '仓库管理员',
          toUserExt: '2093',
          toBranch: '外仓',
          init: 1,
          ppu: 2,
          inTransit: 3,
          delivered: 4,
        },
        {
          toNo: '10293821',
          trUserId: 'userId2',
          trUserName: '李四',
          trUserExt: '3138',
          trBranch: '二厂',
          trCell: 'SMT',
          trFloor: '2F',
          toUserId: 'keeperId1',
          toUserName: '仓库管理员',
          toUserExt: '2093',
          toBranch: '外仓',
        },
        {
          toNo: '10293822',
          trUserId: 'userId21',
          trUserName: '李四',
          trUserExt: '3138',
          trBranch: '二厂',
          trCell: 'SMT',
          trFloor: '2F',
          toUserId: 'keeperId1',
          toUserName: '仓库管理员',
          toUserExt: '2093',
          toBranch: '外仓',
        },
      ],
      success: true,
    });
  },
  'POST /api/createToTraceDetail': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      success: true,
      data: [
        {
          id: 111,
          toNo: '1029382a',
          palletId: '1029382a-f',
          isUrgent: 'Y',
          destBranch: '外仓',
          createTimestamp: '2023-12-03T16:49:36Z',
          updateTimestamp: '2023-12-03T16:49:36Z',
          status: 'INIT',
        },
        {
          id: 112,
          toNo: '1029382a',
          palletId: '1029382a-a',
          isUrgent: 'N',
          destBranch: '外仓',
          createTimestamp: '2023-12-03T16:48:44Z',
          updateTimestamp: '2023-12-03T16:48:44Z',
          status: 'INIT',
        },
      ],
    });
  },
  'POST /api/assignToTraceDetailByIds': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      success: true,
    });
  },
  'POST /api/deleteToTraceDetailByIds': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      success: true,
    });
  },
  'Get /api/getToTraceDetailByToNo': async (req: Request, res: Response) => {
    res.send({
      success: true,
      data: [
        {
          id: 118,
          toNo: '1029382',
          palletId: '1029382-118',
          isUrgent: 'Y',
          destBranch: '外仓',
          createTimestamp: '2023-12-03T16:49:36Z',
          updateTimestamp: '2023-12-03T16:49:36Z',
          status: 'INIT',
        },
        {
          id: 117,
          toNo: '1029382',
          palletId: '1029382-117',
          isUrgent: 'N',
          destBranch: '外仓',
          createTimestamp: '2023-12-03T16:48:44Z',
          updateTimestamp: '2023-12-03T16:48:44Z',
          status: 'INIT',
        },
        {
          id: 116,
          toNo: '1029382',
          palletId: '1029382-116',
          isUrgent: 'Y',
          destBranch: '外仓',
          createTimestamp: '2023-12-03T16:48:12Z',
          updateTimestamp: '2023-12-03T16:48:12Z',
          status: 'PENDING_PICKUP',
        },
      ],
    });
  },
  'GET /api/getMaterialByMatPn': (req: Request, res: Response) => {
    const matPn = req.query.matPn;
    res.send({
      data: {
        matPn: '',
        matDesc: 'Desc ' + matPn,
      },
      success: true,
    });
  },
  'GET /api/getLineListByCells': async (req: Request, res: Response) => {
    await waitTime();
    const cell = req.query.cells;
    if (cell === 'SMT')
      res.send({
        data: ['SMTL08', 'SMTL09'],
        success: true,
      });
    else
      res.send({
        data: ['PCBA05', 'PCBA06'],
        success: true,
      });
  },
  'GET /api/getMatListByLine': async (req: Request, res: Response) => {
    await waitTime();
    const line = req.query.line;
    if (line === 'PCBA05')
      res.send({
        data: ['572109901', '572109900', '572106607'],
        success: true,
      });
    else if (line === 'PCBA06')
      res.send({
        data: ['672109901', '672109900'],
        success: true,
      });
    else if (line === 'SMTL08') {
      res.send({
        data: ['872109901', '872109900', '872106607'],
        success: true,
      });
    } else
      res.send({
        data: [],
        success: true,
      });
  },
  'Get /api/getFeederList': async (req: Request, res: Response) => {
    const matPn = req.query.matPn;
    if (matPn === '572109901')
      res.send({
        success: true,
        data: [
          {
            id: 'PDSMT0XID1',
            machineNo: 'PDSMT01_1',
            slot: '9901',
            side: 'L',
          },
          {
            id: 'PDSMT0XID2',
            machineNo: 'PDSMT02_1',
            slot: '9901',
            side: 'R',
          },
          {
            id: 'PDSMT0XID8',
            machineNo: 'PDSMT02_1',
            slot: '9901',
            side: 'R',
          },
        ],
      });
    else if (matPn === '572109900')
      res.send({
        success: true,
        data: [
          {
            id: 'PDSMT0XID1',
            machineNo: 'PDSMT01_1',
            slot: '9900',
            side: 'L',
          },
        ],
      });
    else if (matPn === '572106607')
      res.send({
        success: true,
        data: [
          {
            id: 'PDSMT0XID1',
            machineNo: 'PDSMT02_1',
            slot: '6607',
            side: 'L',
          },
        ],
      });
    else
      res.send({
        success: true,
        data: [],
      });
  },
  'POST /api/submitLineMatPull': async (req: Request, res: Response) => {
    await waitTime();
    res.send({
      success: true,
    });
  },
  'Get /api/getOrderLaneListForOneclickOperation': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      success: true,
      data: [
        {
          orderNo: '102938221',
          lane: 'lane1',
          programNo: '8-710023A-NPM_T01',
          currentProgramNo: '8-710023A-NPM_T01',
          pn: '172099800',
          cell: 'SMT',
          line: 'SMT08',
          status: 'Dispatched',
        },
        {
          orderNo: '102938222',
          lane: 'lane1',
          programNo: '8-710023A-NPM_T00_123',
          currentProgramNo: '8-710022A-NPM_T00_123',
          pn: '172099801',
          cell: 'SMT',
          line: 'SMT09',
          status: 'Partial',
        },
        {
          orderNo: '102938223',
          lane: 'lane2',
          programNo: '8-710023A-NPM_T02',
          currentProgramNo: '8-710023A-NPM_T02',
          pn: '172099802',
          cell: 'PCBA',
          line: 'PCBA02',
          status: 'Partial',
        },
        {
          orderNo: '102938226',
          lane: 'lane2',
          programNo: '8-710023A-NPM_T03',
          pn: '172099800',
          cell: 'SMT',
          line: 'SMT09',
          status: 'Dispatched',
        },
      ],
    });
  },
  'POST /api/orderInitiation': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      success: true,
    });
  },
  'POST /api/matCutting': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      success: true,
    });
  },
  'Get /api/getSlotDataByOrderLane': async (req: Request, res: Response) => {
    const orderNo = req.query.orderNo;
    await waitTime();
    if (orderNo === '102938222')
      res.send({
        success: true,
        data: [
          {
            machineNo: 'PDSMT01_1',
            slot: '10011',
            side: 'L',
            matPn: '172099800',
            matQty: -10,
            reelId: 'aabc1',
          },
          {
            machineNo: 'PDSMT01_1',
            slot: '10012',
            side: 'R',
            matPn: '172099800',
            matQty: 1200,
            reelId: 'aabc2',
          },
          {
            machineNo: 'PDSMT01_1',
            slot: '10003',
            side: 'L',
            matPn: '172099812',
            matQty: -20,
            reelId: 'aabc3',
          },
          {
            machineNo: 'PDSMT01_1',
            slot: '10006',
            side: 'R',
            matPn: '172099800',
            matQty: 1601,
            reelId: 'aabc4',
          },
        ],
      });
    else
      res.send({
        success: true,
        data: [
          {
            machineNo: 'PDSMT01_1',
            slot: '10011',
            side: 'L',
            matPn: '172099800',
            matQty: 210,
            reelId: 'aabc1',
          },
        ],
      });
  },
  'POST /api/partMatCutting': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      success: true,
      data: [
        {
          machineNo: "PSMT02_5",
          slot: "H1-20",
          side: "S",
          matPn: "172100730",
          matQty: 511.0,
          reelId: "F6U0992"
        }
      ],
      "traceId": "854a41d13257c7df"
    });
  },
  'POST /api/pullMatByBatch': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "data": {
        "cell": "SMT",
        "line": "SMTL01",
        "reasonCode": "PP",
        "requestor": "System",
        "matList": [
          {
            "matPn": "172102270",
            "batchNo": "TEST001"
          },
          {
            "matPn": "172102270",
            "batchNo": "TEST002"
          }
        ],
        "orderNo": "0000000PP"
      },
      "traceId": "2e175f6863540ff7"
    });
  },
  'GET /api/getShortageListByOrder': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          "id": 1,
          "mfgOrder": "860385412",
          "material": "172082620",
          "qty": 27615.0,
          "createTime": "2024-07-31T03:41:54Z",
          "updateTime": "2024-07-31T03:41:54Z",
          "matPn": "172082620",
          "reqQty": 75000.0,
          "trQty": 28000.0,
          "invQty": 424000.0
        },
        {
          "id": 2,
          "mfgOrder": "860385412",
          "material": "172082990",
          "qty": 14420.0,
          "createTime": "2024-07-31T03:41:54Z",
          "updateTime": "2024-07-31T03:41:54Z",
          "matPn": "172082990",
          "reqQty": 20000.0,
          "trQty": 20000.0,
          "invQty": 0.0
        }
      ],
      success: true,
    });
  },
  'GET /api/sfc/checkcenter/getDefectsByPanelSn': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          "id": 111,
          "mainSn": "P111",
          "subSn": "002",
          "preQcStat": "SUSP",
          "inspResult": "PASS",
          "dispositionAction": "REWORK",
          "origDefectLocation": "D3",
          "origDefectCode": "MISALIGNMENT",
          "origDefectSubcode": "",
          "updateDefectLocation": "",
          "updateDefectCode": "",
          "updateDefectSubcode": "",
          "processTag": "A",
          "resourceId": 9,
          "opNodeId": 2,
          "closed": false,
          "cell": "SMTL08",
          "area": "PCBA",
          "createUser": "PCBA_SIGMAXD_01",
          "createTimestamp": "2024-07-31T07:57:58Z"
        },
        {
          "id": 223,
          "mainSn": "P111",
          "subSn": "002",
          "preQcStat": "SUSP",
          "inspResult": "PASS",
          "dispositionAction": "REWORK",
          "origDefectLocation": "D3",
          "origDefectCode": "MISALIGNMENT",
          "origDefectSubcode": "",
          "updateDefectLocation": "L1",
          "updateDefectCode": "C1",
          "updateDefectSubcode": "SUB1",
          "note": "note1",
          "processTag": "A",
          "resourceId": 9,
          "opNodeId": 2,
          "closed": false,
          "cell": "SMTL08",
          "area": "PCBA",
          "createUser": "PCBA_SIGMAXD_01",
          "createTimestamp": "2024-07-31T07:58:53Z",
          "updateUser": "SFC",
          "updateTimestamp": "2024-07-31T13:48:23Z"
        }
      ],
      success: true,
    });
  },
  'GET /api/sfc/checkcenter/getDefectCodeList': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          "id": 1,
          "defectCode": "defect_123",
          "defectDesc": "defect_desc"
        }, {
          "id": 2,
          "defectCode": "defect_33",
          "defectDesc": "defect_desc"
        }
      ],
      success: true,
    });
  },
  'POST /api/sfc/checkcenter/updateDefect': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/checkcenter/approveDefectDisposition': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'GET /api/wms2/msdConfig/v1/list': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          "id": "1",
          "matPn": "L00001",
          "lifeTime": 3.0,
          "bakeTime": 30.0,
          "bakeTimeTolerance": 5.0,
          "bakeTemperature": 75.0,
          "bakeTemperatureTolerance": 15.0
        }, {
          "id": "2",
          "matPn": "L00002",
          "lifeTime": 6.0,
          "bakeTime": 35.0,
          "bakeTimeTolerance": 5.0,
          "bakeTemperature": 75.0,
          "bakeTemperatureTolerance": 15.0
        }
      ],
      success: true,
    });
  },
  'GET /api/wms2/specialMaterial/v1/pageOperationLogOfMSD': (req: Request, res: Response) => {
    res.send({
      data: {
        "content": [
          {
            "id": "1",
            "reelId": "R000001",
            "matPn": "L001",
            "operation": "LOADING",
            "qty": 1000,

            "residualLife": 12,
            "operator": "Jason",
            "createTime": "2024-08-06T02:57:22Z"
          },
          {
            "id": "2",
            "reelId": "R000001",
            "matPn": "L001",
            "operation": "UNLOADING",
            "qty": 650,

            "residualLife": 10,
            "operator": "Jason",
            "createTime": "2024-08-06T04:57:53Z"
          }
        ],
        "pageable": {
          "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": false
          },
          "offset": 0,
          "pageNumber": 0,
          "pageSize": 10,
          "unpaged": false,
          "paged": true
        },
        "last": true,
        "totalPages": 1,
        "totalElements": 2,
        "number": 0,
        "size": 10,
        "sort": {
          "empty": true,
          "unsorted": true,
          "sorted": false
        },
        "numberOfElements": 2,
        "first": true,
        "empty": false
      },
      success: true,
    });
  },
  'POST /api/wms2/msdConfig/v1/batchSaveOrUpdate': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'GET /api/wms2/iqc/v1/queryIQCRecords': (req: Request, res: Response) => {
    res.send({
      "data": {
        "content": [
          {
            "id": 29,
            "serialNo": "099407c6-97d1-47fa-8b40-94ec1bccef1d",
            "sccNo": "SCC0000003141",
            "batchNo": "3000298713",
            "palletNo": "B01",
            "matPn": "1110680161",
            "qty": 1.0,
            "productionDate": "2024-07-21",
            "grDate": "2024-09-04T07:41:07Z",
            "qwi": "QWI-QA-071",
            "firstBatch": false,
            "samplingProcedure": "C=0",
            "vendorCode": "208451",
            "vendorName": "Belden Hirschmann Industries(Suzhou",
            "purchaseDoc": "1011461137",
            "stockCategory": "Q",
            "status": "PENDING",
            "isActive": true,
            "createTime": "2024-09-04T07:41:18Z"
          },
          {
            "id": 30,
            "serialNo": "1d448dd7-0b82-4abf-8695-3326824c0b0e",
            "sccNo": "SCC0000003141",
            "batchNo": "3000298711",
            "palletNo": "A03",
            "matPn": "2090530041",
            "qty": 1.0,
            "productionDate": "2024-07-29",
            "grDate": "2024-09-04T08:18:15Z",
            "inspectionLotNo": "60734932",
            "qwi": "QWI-QA-071",
            "firstBatch": false,
            "samplingProcedure": "C=0",
            "vendorCode": "208451",
            "vendorName": "Belden Hirschmann Industries(Suzhou",
            "purchaseDoc": "1011462759",
            "stockCategory": "",
            "status": "PENDING",
            "isActive": true,
            "createTime": "2024-09-04T08:18:26Z"
          }
        ],
        "pageable": {
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "pageNumber": 0,
          "pageSize": 10,
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "last": true,
        "totalPages": 1,
        "totalElements": 2,
        "first": true,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "numberOfElements": 2,
        "size": 10,
        "number": 0,
        "empty": false
      },
      success: true,
    });
  },
  'GET /api/wms2/material/v1/getMaterialStorageConfig': (req: Request, res: Response) => {
    res.send({
      data: {
        content: [
          {
            "id": 1,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:06Z",
            "specialStock": ""
          },
          {
            "id": 2,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:10Z",
            "specialStock": ""
          },
          {
            "id": 3,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:11Z",
            "specialStock": ""
          },
          {
            "id": 4,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:12Z",
            "specialStock": ""
          },
          {
            "id": 5,
            "matPn": "1110680161",
            "storageEnv": "xx",
            "storageArea": "xx",
            "customer": "xx",
            "matType": "xx",
            "controlCategory": "xx",
            "matGroup": "xx",
            "isActive": true,
            "createUser": "richard.cao",
            "createTime": "2024-09-02T02:19:26Z",
            "updateTime": "2024-09-02T02:19:26Z",
            "specialStock": ""
          },
          {
            "id": 6,
            "matPn": "2090530041",
            "storageEnv": "xxx",
            "storageArea": "xxx",
            "customer": "xxx",
            "matType": "xxx",
            "controlCategory": "xxx",
            "matGroup": "xxx",
            "isActive": true,
            "createUser": "richard.cao",
            "createTime": "2024-09-02T06:31:46Z",
            "updateTime": "2024-09-02T06:31:46Z",
            "specialStock": ""
          },
          {
            "id": 7,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:06Z",
            "specialStock": ""
          },
          {
            "id": 8,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:10Z",
            "specialStock": ""
          },
          {
            "id": 9,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:11Z",
            "specialStock": ""
          },
          {
            "id": 10,
            "matPn": "21459608871",
            "storageEnv": "测试2",
            "storageArea": "test2",
            "customer": "Dusk",
            "matType": "包材",
            "controlCategory": "断点",
            "matGroup": "TE",
            "isActive": true,
            "createUser": "Liu, Dusk (Consultant)",
            "createTime": "2024-08-29T03:13:12Z",
            "specialStock": ""
          },
          {
            "id": 11,
            "matPn": "1110680161",
            "storageEnv": "xx",
            "storageArea": "xx",
            "customer": "xx",
            "matType": "xx",
            "controlCategory": "xx",
            "matGroup": "xx",
            "isActive": true,
            "createUser": "richard.cao",
            "createTime": "2024-09-02T02:19:26Z",
            "updateTime": "2024-09-02T02:19:26Z",
            "specialStock": ""
          },
          {
            "id": 12,
            "matPn": "2090530041",
            "storageEnv": "xxx",
            "storageArea": "xxx",
            "customer": "xxx",
            "matType": "xxx",
            "controlCategory": "xxx",
            "matGroup": "xxx",
            "isActive": true,
            "createUser": "richard.cao",
            "createTime": "2024-09-02T06:31:46Z",
            "updateTime": "2024-09-02T06:31:46Z",
            "specialStock": ""
          }
        ],
        "pageable": {
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "pageNumber": 0,
          "pageSize": 10,
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "last": true,
        "totalPages": 2,
        "totalElements": 12,
        "first": true,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "numberOfElements": 6,
        "size": 10,
        "number": 0,
        "empty": false
      }
    });
  },
  'GET /api/wms2/gr/v1/getGRRecords': (req: Request, res: Response) => {
    res.send({
      "data": {
        "content": [
          {
            "id": 13,
            "serialNo": "fedf2871-f0fe-4b77-a164-5c26691690a9",
            "sccNo": "SCC0000003140",
            "palletNo": "A03",
            "matPn": "2090530041",
            "qty": 1.0,
            "productionDate": "2024-07-20",
            "description": "Nearstack Pnl Mnt Plug Casing Top",
            "baseUnit": "PC",
            "batchNo": "3000298707",
            "storageEnv": "xxx",
            "storageArea": "xxx",
            "customer": "xxx",
            "matType": "xxx",
            "controlCategory": "xxx",
            "purchDoc": "1011462736",
            "matGroup": "103",
            "buyerId": "K03",
            "status": "IN_PROCESS",
            "grOperator": "richard.cao",
            "printCount": 0,
            "pkgCount": 1,
            "vendorCode": "208451",
            "vendorName": "Belden Hirschmann Industries(Suzhou",
            "dateCode": "29",
            "basicMaterial": "RoHS & ELV Compliant",
            "lowHalogenStatus": "Low-Halogen",
            "isActive": true,
            "createTime": "2024-09-05T01:00:21Z"
          }
        ],
        "pageable": {
          "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
          },
          "offset": 0,
          "pageNumber": 0,
          "pageSize": 20,
          "paged": true,
          "unpaged": false
        },
        "last": true,
        "totalElements": 1,
        "totalPages": 1,
        "size": 20,
        "number": 0,
        "sort": {
          "empty": false,
          "sorted": true,
          "unsorted": false
        },
        "first": true,
        "numberOfElements": 1,
        "empty": false
      },
      success: true,
    });
  },
  'POST /api/wms2/material/v1/updateMaterialStorageConfig': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/wms2/material/v1/delMaterialStorageConfig': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/wms2/material/v1/addMaterialStorageConfig': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/wms2/material/v1/excelImport': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/wms2/iqc/v1/updateIQCRecords': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'Get /api/getRealtimeSlotData': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": {
        "content": [
          {
            "id": 1,
            "lane": "Lane2",
            "machineNo": "PDSMT01_4",
            "slot": "80011",
            "side": "L",
            "mfgOrder": "860806049",
            "matPn": "798550771",
            "remainQty": 676.0,
            "cuttingQty": 676.0,
            "drawQty": 194.0,
            "throwQty": 11.0,
            "throwRate": 2.6E-4,
            "createTime": "2024-08-21T05:39:26Z",
            "updateTime": "2024-08-29T05:54:56Z"
          },
          {
            "id": 2,
            "lane": "Lane2",
            "machineNo": "PDSMT01_5",
            "slot": "100022",
            "side": "L",
            "mfgOrder": "860806049",
            "matPn": "172059993",
            "remainQty": 680.0,
            "cuttingQty": 680.0,
            "drawQty": 1049.0,
            "throwQty": 6.0,
            "throwRate": 0.005758,
            "createTime": "2024-08-22T05:39:26Z",
            "updateTime": "2024-08-29T05:54:57Z"
          },
          {
            "id": 3,
            "lane": "Lane2",
            "machineNo": "PDSMT01_4",
            "slot": "80013",
            "side": "L",
            "mfgOrder": "860806049",
            "matPn": "4502222951",
            "remainQty": 1276.0,
            "cuttingQty": 1276.0,
            "drawQty": 194.0,
            "throwQty": 10.0,
            "throwRate": 5.31E-4,
            "createTime": "2024-08-23T05:39:26Z",
            "updateTime": "2024-08-29T05:54:57Z"
          },
          {
            "id": 4,
            "lane": "Lane2",
            "machineNo": "PDSMT01_5",
            "slot": "100020",
            "side": "L",
            "mfgOrder": "860806049",
            "matPn": "908140204",
            "remainQty": 1305.0,
            "cuttingQty": 1305.0,
            "drawQty": 195.0,
            "throwQty": 3.0,
            "throwRate": 0.015385,
            "createTime": "2024-08-24T05:39:26Z",
            "updateTime": "2024-08-29T05:54:57Z"
          },
          {
            "id": 5,
            "lane": "Lane2",
            "machineNo": "PDSMT01_4",
            "slot": "80010",
            "side": "L",
            "mfgOrder": "860806049",
            "matPn": "4502221703",
            "remainQty": 1306.0,
            "cuttingQty": 1306.0,
            "drawQty": 194.0,
            "throwQty": 16.0,
            "throwRate": 8.41E-4,
            "createTime": "2024-08-25T05:39:26Z",
            "updateTime": "2024-08-29T05:54:57Z"
          }
        ],
        "pageable": {
          "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
          },
          "offset": 0,
          "pageSize": 5,
          "pageNumber": 0,
          "unpaged": false,
          "paged": true
        },
        "totalElements": 14,
        "totalPages": 3,
        "last": false,
        "size": 5,
        "number": 0,
        "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
        },
        "first": true,
        "numberOfElements": 5,
        "empty": false
      },
    });
  },
  'Get /api/material/return/summaryQueryOfMaterialIssuanceAndReturnRecords': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": {
        "orderNo": "860977741",
        "pn": "4000113071",
        "orderQty": 1000.0,
        "materialList": [
          {
            "rownum": 1,
            "materialNo": "172013633",
            "pullQty": 2000.0,
            "qty": 1000.0,
            "consumeQty": 1008.0,
            "returnQty": 40.0,
            "lossQty": 952.0,
            "lossRate": 0.476
          },
          {
            "rownum": 2,
            "materialNo": "172054610",
            "pullQty": 4000.0,
            "qty": 3000.0,
            "consumeQty": 3024.0,
            "returnQty": 100.0,
            "lossQty": 876.0,
            "lossRate": 0.219
          }
        ]
      },
    });
  },
  'Get /api/material/return/queryOfMaterialIssuanceAndReturnDetails': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": [
        {
          "rownum": 1,
          "pn": "4000113071",
          "pullDid": 79997,
          "materialNo": "172054610",
          "reelId": "F7C0617",
          "pullQty": 1200.0,
          "pullTime": "2024-09-04 08:11:47",
          "returnQty": 20.0,
          "returnTime": "2024-09-04 08:20:25"
        },
        {
          "rownum": 2,
          "pn": "4000113071",
          "pullDid": 79997,
          "materialNo": "172054610",
          "reelId": "F8P0027",
          "pullQty": 1200.0,
          "pullTime": "2024-09-04 08:11:47",
          "returnQty": 40.0,
          "returnTime": "2024-09-04 08:20:25"
        }
      ],
    });
  },
  'Get /api/sfc/res/getPackagingResources': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": [
        {
          "id": 46,
          "name": "外检包装01",
          "description": "L8外检包装",
          "multiChannel": false,
          "channel": "",
          "multiOperation": false,
          "sharing": false,
          "resType": "MANUAL",
          "createUser": "SFC",
          "createTimestamp": "2024-09-18T02:04:48Z"
        },
        {
          "id": 47,
          "name": "外检包装02",
          "description": "L8外检包装",
          "multiChannel": false,
          "channel": "",
          "multiOperation": false,
          "sharing": false,
          "resType": "MANUAL",
          "createUser": "SFC",
          "createTimestamp": "2024-09-18T02:04:48Z"
        }
      ],
    });
  },
  'Get /api/sfc/packaging/packageCheck': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": {
        "packageSPQ": 5,
        "lastPackage": false,
        "needPallet": false
      }
    });
  },
  'POST /api/sfc/packaging/packageSubmit': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/production/defectSubmit': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/production/update/pcb/qcstat': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/order/componentIssueForOpc': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/res/setResouceOrder': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/feeding/singleMaterialLoading': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'Get /api/sfc/res/getGroupNamesForOrderSetting': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": [
        {
          "id": 2,
          "name": "L8_Frontend_A",
          "cell": "SMTL08",
          "area": "PCBA",
          "category": "PRODUCTION",
          "operationTag": "A",
          "moveMode": "ARRAY",
          "feedCheckType": "FEEDLIST",
          "createUser": "SFC",
          "createTimestamp": "2024-07-07T04:58:01Z"
        },
        {
          "id": 3,
          "name": "L8_Frontend_B",
          "cell": "SMTL08",
          "area": "PCBA",
          "category": "PRODUCTION",
          "operationTag": "B",
          "moveMode": "ARRAY",
          "feedCheckType": "FEEDLIST",
          "createUser": "SFC",
          "createTimestamp": "2024-07-07T04:58:01Z"
        },
        {
          "id": 4,
          "name": "Toyota_Auto_Assembly",
          "cell": "SMTL08",
          "area": "PCBA",
          "category": "PRODUCTION",
          "operationTag": "",
          "moveMode": "SINGLE",
          "feedCheckType": "BOM",
          "createUser": "SFC",
          "createTimestamp": "2024-07-07T04:58:01Z"
        }
      ],
    });
  },
  'Get /api/sfc/res/getGroupNamesForFeeding': async (req: Request, res: Response) => {
    res.send({
      success: true,
      "data": [
        {
          "id": 1,
          "name": "Line08_Frontend_A",
          "cell": "SMT8",
          "area": "TEST2",
          "category": "",
          "createUser": "CCCC",
          "createTimestamp": "2024-09-18T02:04:48Z"
        },
        {
          "id": 2,
          "name": "Line08_Frontend_B",
          "cell": "L8外检包装",
          "area": "TEST1",
          "category": "",
          "createUser": "AAA",
          "createTimestamp": "2024-09-18T02:04:48Z"
        }
      ],
    });
  },
  'Get /api/sfc/feeding/getFeedList': async (req: Request, res: Response) => {
    res.send({
      "success": true,
      "data": {
        "line": "SMTL08",
        "productNo": "6830710021",
        "orderNo": "2121212",
        "txnId": "eaf71972f1a34a758c94c3bbf4b24791",
        "slots": [
          {
            "slotCode": "L09M22301L",
            "matCat": "",
            "consRate": 3.1999999999999997,
            "consQty": 24.0,
            "matPns": [
              "172004020",
              "172095670"
            ],
            "matNo": ""
          },
          {
            "slotCode": "L08M16108L",
            "matCat": "",
            "consRate": 0.7384615384615384,
            "consQty": 104.0,
            "matPns": [
              "172107270"
            ],
            "matNo": ""
          },
          {
            "slotCode": "TTM4ASSY01_SLOT001",
            "matNo": "F7407221"
          }
        ],
        "traceId": "9c3a612d70408fe4"
      }
    });
  },
  'POST /api/sfc/feeding/materialLoadingSubmit': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/feeding/materialBatchUnloading': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'POST /api/sfc/feeding/materialReplenish': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      "success": true,
      "traceId": "2e175f6863540ff7"
    });
  },
  'Get /api/sfc/res/getPnAndOrderNoByResGroupId': async (req: Request, res: Response) => {
    res.send({
      "success": true,
      "data": {
        "line": "SMTL08",
        "productNo": "6830710021",
        "orderNo": "2121212",
        "traceId": "9c3a612d70408fe4"
      }
    });
  },
};
