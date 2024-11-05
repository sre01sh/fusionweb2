import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/getCellMatStatList': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          id: 1,
          cellId: '1201-ASSY-C01',
          shortage: 5,
          nostock: 1,
          excess: 2,
          orders: [
            {
              orderNo: '84841211',
              resources: [{ id: 'A1704262', name: 'ZS Sub Module', stat: 'nostock', count: -650 }],
            },
            {
              orderNo: '84841212',
              resources: [
                { id: 'A1710813', name: 'ZQ Sub Module', stat: 'shortage', count: -1100 },
              ],
            },
            {
              orderNo: '84841213',
              resources: [{ id: 'A1710813', name: 'ZQ Sub Module', stat: 'shortage', count: -200 }],
            },
          ],
        },
        {
          id: 2,
          cellId: '1201-ASSY-C02',
          shortage: 1,
          nostock: 0,
          excess: 0,
          orders: [
            {
              orderNo: '84841221',
              resources: [{ id: 'AMC542', name: 'Impact XTR DC', stat: 'shortage', count: -120 }],
            },
          ],
        },
        { id: 3, cellId: '1201-ASSY-C03', shortage: 0, nostock: 0, excess: 0, orders: [] },
        { id: 4, cellId: '1201-ASY2-C01', shortage: 0, nostock: 0, excess: 0, orders: [] },
        {
          id: 5,
          cellId: '1201-ASY2-C02',
          shortage: 1,
          nostock: 2,
          excess: 3,
          orders: [
            {
              orderNo: '84841251',
              resources: [
                { id: 'A172140P', name: 'Impel RAM Post', stat: 'nostock', count: -50 },
                { id: 'A173460P', name: 'DELL Node A', stat: 'shortage', count: -40 },
              ],
            },
            {
              orderNo: '84841252',
              resources: [
                {
                  id: 'A1720092',
                  name: 'Impel Dell Node Wafer Marriage - R',
                  stat: 'excess',
                  count: +100,
                },
                {
                  id: 'A1720093',
                  name: 'Impel Dell Node Wafer Marriage -L',
                  stat: 'shortage',
                  count: -35,
                },
                { id: 'A171510P', name: 'DELL Node B', stat: 'shortage', count: -60 },
                // {
                //   id: 'A1734601',
                //   name: 'Dell Node A Ushield / Wafer Insert',
                //   stat: 'shortage',
                //   count: 20,
                // },
              ],
            },
            {
              orderNo: '84841253',
              resources: [
                {
                  id: 'A1734602',
                  name: 'Dell Node A Aligner/Stiffener',
                  stat: 'nostock',
                  count: -50,
                },
              ],
            },
          ],
        },
        { id: 6, cellId: '1201-ASY2-C03', shortage: 0, nostock: 0, excess: 0, orders: [] },
        { id: 7, cellId: '1201-ASY2-C04', shortage: 0, nostock: 0, excess: 0, orders: [] },
        { id: 8, cellId: '1201-ASY2-C05', shortage: 0, nostock: 0, excess: 0, orders: [] },
        { id: 9, cellId: '1201-ASY2-C06', shortage: 0, nostock: 0, excess: 0, orders: [] },
        {
          id: 10,
          cellId: '1201-ASY2-C07',
          shortage: 0,
          nostock: 1,
          excess: 0,
          orders: [
            {
              orderNo: '8484125a2',
              resources: [
                { id: 'A1713392', name: 'Impel DC/DC+ Wafer', stat: 'nostock', count: -300 },
              ],
            },
          ],
        },
        { id: 11, cellId: '1201-ASY3-C01', shortage: 0, nostock: 0, excess: 0 },
        { id: 12, cellId: '1201-ASY3-C02', shortage: 0, nostock: 0, excess: 0 },
        { id: 13, cellId: '1201-ASY3-C03', shortage: 0, nostock: 0, excess: 0 },
      ],
      success: true,
    });
  },
  'GET /api/getCells': (req: Request, res: Response) => {
    res.send({
      data: ['PCBA', 'SMT'],
      success: true,
    });
  },
  'GET /api/getPhysicalResourceGroupList': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          id: 1,
          groupName: 'SMTL08-A',
          line: 'SMTL08',
          lan: 'Lane1',
        },
        {
          id: 2,
          groupName: 'SMTL08-B',
          line: 'SMTL08',
          lan: 'Lane2',
        },
      ],
      success: true,
    });
  },
  'GET /api/getOrderChangeOverList': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          id: '1',
          line: 'PCBA1',
          orderNo: '819770922',
          pn: '6871794903',
          startDate: '2023-11-24T18:01:00.000Z',
          endDate: '2023-11-24T18:01:00.000Z',
          orderQty: 1000,
          status: 'Partial',
        },
        {
          id: '2',
          line: 'PCBA2',
          orderNo: '819771090',
          pn: '686030406',
          startDate: '2023-11-24T18:01:00.000Z',
          endDate: '2023-11-24T18:01:00.000Z',
          orderQty: 1200,
          status: 'Prepared',
        },
        {
          id: '3',
          line: 'PCBA3',
          orderNo: '819771092',
          pn: '686030406',
          startDate: '2023-11-24T18:01:00.000Z',
          orderQty: 900,
          status: 'Inprep',
        },
        {
          id: '4',
          line: 'PCBA3',
          orderNo: '819771087',
          pn: '686030406',
          startDate: '2023-11-24T18:01:00.000Z',
          orderQty: 1200,
          status: 'Pending',
        },
        {
          id: '5',
          line: 'PCBA3',
          orderNo: '819782092',
          pn: '686030402',
          startDate: '2023-11-27T18:01:00.000Z',
          orderQty: 1200,
          status: 'Plan',
        },
      ],
      success: true,
    });
  },
  'POST /api/changeOverOrderPrep': (req: Request, res: Response) => {
    res.send({
      success: true,
    });
  },
  'GET /api/getReplenishList': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          id: '127718',
          machineNo: 'M01',
          lane: '1',
          slot: '01',
          side: 'L',
          productName: '132180411',
          matPn: '172004020',
          remainQty: 1100.0,
          remainTime: '2023-11-22T13:10:00Z',
          status: 'Inprep',
          drawQty: 11200,
          throwQty: 1010,
          throwRate: 0.051,
        },
        {
          id: '127719',
          machineNo: 'M01',
          lane: '1',
          slot: '02',
          side: 'L',
          productName: '132180411',
          matPn: '132180401',
          remainTime: '2023-11-29T13:10:00Z',
          remainQty: 101.2,
          status: 'Inprep',
          drawQty: 200,
          throwQty: 10,
          throwRate: 0.02,
        },
        {
          id: '127219',
          machineNo: 'M01',
          lane: '1',
          slot: '02',
          side: 'L',
          productName: '132180411',
          matPn: '1321804012',
          remainTime: '2023-11-29T13:10:00Z',
          status: 'Inprep',
          drawQty: 200,
          throwQty: 10,
          throwRate: 0.042,
        },
      ],
      success: true,
    });
  },
};
