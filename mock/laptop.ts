import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'GET /api/getAllCellResource': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          cellId: '1201-ASSY-C01',
          cellName: '1201-ASSY-C01',
          resources: [
            { id: 'A1710812', name: 'ZQ Sub Module' },
            { id: 'A1704262', name: 'ZS Sub Module' },
          ],
        },
        {
          cellId: '1201-ASSY-C02',
          cellName: '1201-ASSY-C02',
          resources: [{ id: 'AMC452', name: 'Impact DC ESD Clip' }],
        },
        {
          cellId: '1201-ASSY-C03',
          cellName: '1201-ASSY-C03',
          resources: [
            { id: 'AN784881', name: 'Mini PCI' },
            { id: 'AN785721', name: 'Care Fusion' },
          ],
        },
        { cellId: '1201-ASY2-C01', cellName: '1201-ASY2-C01', resources: [] },
        {
          cellId: '1201-ASY2-C02',
          cellName: '1201-ASY2-C02',
          resources: [
            { id: 'A1720092', name: 'Impel Dell Node Wafer Marriage - R' },
            { id: 'A172140P', name: 'Impel RAM Post' },
          ],
        },
        {
          cellId: '1201-ASY2-C03',
          cellName: '1201-ASY2-C03',
          resources: [
            { id: 'A1735201', name: 'Impulse Insert' },
            { id: 'A1735203', name: 'Impulse Post' },
            { id: 'A1735381', name: 'Impulse Insert' },
            { id: 'A1735382', name: 'Impulse Post' },
          ],
        },
      ],
      success: true,
    });
  },
  'GET /api/getMfgOrdersByResId': (req: Request, res: Response) => {
    res.send({
      data: [
        {
          orderNo: '84841234',
          pn: '170001234',
          pnDesc: 'Impel 6Px16C DC Ungd Assy',
          startDate: '2023-07-24T18:01:00.000Z',
          finishDate: '2023-07-29T12:01:00.000Z',
          orderQty: 1200,
          balanceQty: 0,
          stat: 'ok',
          compInfos: [
            {
              id: '1500001111',
              desc: '',
              action: 'Message 1',
              reqQty: 1000,
              asmQty: 800,
              trQty: 200,
              toQty: 200,
              stat: 'ok',
            },
            {
              id: '1500001112',
              desc: 'Component 1500001112 description',
              action: '',
              reqQty: 1000,
              asmQty: 900,
              trQty: 100,
              toQty: 100,
              stat: 'ok',
            },
            {
              id: '1500001113',
              desc: '',
              action: 'Message 3',
              reqQty: 1000,
              asmQty: 900,
              trQty: 100,
              toQty: 100,
              stat: 'ok',
            },
            {
              id: '1500001114',
              desc: '',
              action: '',
              reqQty: 1000,
              asmQty: 850,
              trQty: 150,
              toQty: 150,
              stat: 'ok',
            },
          ],
        },
        {
          orderNo: '84841211',
          pn: '170005678',
          pnDesc: '',
          startDate: '2023-07-24T22:01:00.000Z',
          finishDate: '2023-07-27T22:01:00.000Z',
          orderQty: 300,
          balanceQty: 20,
          stat: 'nostock',
          compInfos: [
            {
              id: '1500002110',
              desc: 'comp 1500002111 desc',
              action: 'Message 21',
              reqQty: 1000,
              asmQty: 100,
              trQty: 600,
              toQty: 500,
              stat: 'shortage',
            },
            {
              id: '1500002111',
              desc: '',
              action: 'Message 22',
              reqQty: 1000,
              asmQty: 400,
              trQty: 100,
              toQty: 0,
              stat: 'nostock',
            },
            {
              id: '1500002112',
              desc: '',
              action: 'Message 23',
              reqQty: 1000,
              asmQty: 1200,
              trQty: 100,
              toQty: 0,
              stat: 'excess',
            },
          ],
        },
      ],
      success: true,
    });
  },
};
