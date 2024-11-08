import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

export default {
  'POST /api/authenticate': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(500);
    if (password === 'admin' && username === 'admin') {
      res.send({
        success: true,
        id_token: '123',
      });
      access = 'admin';
      return;
    }
    if (password === 'user' && username === 'user') {
      res.send({
        success: true,
        id_token: '123',
      });
      access = 'user';
      return;
    }

    res.send({
      success: false,
    });
    access = 'guest';
  },
  'GET /api/user': (req: Request, res: Response) => {
    if (req.headers.authorization === 'Bearer 123') access = 'admin';
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please login first!',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      showType: 4,
      errorMessage: 'test!',
      data: {
        name: 'Leonie Chew',
        avatar: '',
        userid: '00000001',
        email: 'admin1@molex.com',
        signature: 'The best way to predict the future is to create it.',
        title: 'UIUX expert',
        group: 'UED',
        tags: [
          {
            key: '0',
            label: 'thoughtful',
          },
          {
            key: '1',
            label: 'Design focus',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: 'ZheJiang',
            key: '330000',
          },
          city: {
            label: 'Hangzhou',
            key: '330100',
          },
        },
        roles: ['admin'],
        cellIds: ['PCBA', 'SMT'],
      },
    });
  },
  'POST /api/logout': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
