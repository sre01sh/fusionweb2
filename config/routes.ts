export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/pc',
    name: 'pc',
    icon: 'laptop',
    routes: [
      {
        name: 'oneclickOperation',
        path: '/pc/oneclickOperation',
        component: './PC/OneclickOperation',
        access: 'canMaterialHandlerAndLineLeader',
      },
      {
        name: 'partOperation',
        path: '/pc/partOperation',
        component: './PC/PartOperation',
        access: 'canMaterialHandlerAndLineLeader',
      },
      {
        name: 'manualMatPrep',
        path: '/pc/manualMatPrep',
        component: './PC/ManualMatPrep',
        access: 'canMaterialHandlerAndLineLeader',
      },
      {
        name: 'plannedMR',
        path: '/pc/plannedMR',
        component: './PC/PlannedMR',
        access: 'canMaterialHandler',
      },
      {
        name: 'unplannedMR',
        path: '/pc/unplannedMR',
        component: './PC/UnplannedMR',
        access: 'canMaterialHandler',
      },
      {
        name: 'materialIssuing',
        path: '/pc/materialIssuing',
        component: './PC/MaterialIssuing',
        access: 'canStockKeeper',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/warehouse',
    name: 'WH',
    icon: 'shop',
    routes: [
      {
        name: 'GrRecord',
        path: '/warehouse/grRecord',
        component: './Warehouse/GrRecord',
        access: 'canWhKeeper',//根据这个方法名去找对应得role查看权限
      },
      {
        name: 'MatManagement',
        path: '/warehouse/matManagement',
        component: './Warehouse/MatManagement',
        access: 'canWhKeeper',
      },
      {
        name: 'IqcInfo',
        path: '/warehouse/iqcInfo',
        component: './Warehouse/IQCInfo',
        access: 'canWhKeeper',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/sfc',
    name: 'SFC',
    icon: 'apartment',
    routes: [
      {
        name: 'checkCenter',
        path: '/sfc/checkCenter',
        component: './SFC/CheckCenter',
        access: 'canSfcKeeper',
      },
      {
        name: 'qcCheckCenter',
        path: '/sfc/qcCheckCenter',
        component: './SFC/QcCheckCenter',
        access: 'canSfcKeeper',
      },
      {
        name: 'matSetting',
        path: '/sfc/msdMatSetting',
        component: './SFC/MSDMatSetting',
        access: 'canSfcKeeper',
      },
      {
        name: 'bakeRecord',
        path: '/sfc/msdBakeRecord',
        component: './SFC/MSDBakeRecord',
        access: 'canSfcKeeper',
      },
      {
        name: 'FviPacking',
        path: '/sfc/fviPacking',
        component: './SFC/FviPacking',
        access: 'canSfcKeeper',
      },
      {
        name: 'PCBScrap',
        path: '/sfc/pcbaScrap',
        component: './SFC/PcbaScrap',
        access: 'canSfcKeeper',
      },
      {
        name: '物料上报',
        path: '/sfc/matReporting',
        component: './SFC/MatReporting',
        access: 'canSfcKeeper',
      },{
        name: '订单设置',
        path: '/sfc/orderSetting',
        component: './SFC/OrderSetting',
        access: 'canSfcKeeper',
      },{
        name: '上料',
        path: '/sfc/upMaterial',
        component: './SFC/UpMaterial',
        access: 'canSfcKeeper',
      },{
        name: '下料',
        path: '/sfc/downMaterial',
        component: './SFC/DownMaterial',
        access: 'canSfcKeeper',
      },
      {
        name: '接料',
        path: '/sfc/changeMaterial',
        component: './SFC/ChangeMaterial',
        access: 'canSfcKeeper',
      },
      {
        name: 'WorkflowConfig',
        path: '/sfc/workflowConfig',
        component: './SFC/WorkflowConfig',
        access: 'canAdmin',
        hideInMenu: true,
      },
      {
        name: 'productSetting',
        path: '/sfc/productSetting',
        component: './SFC/ProductSetting',
        access: 'canAdmin',
      },
      {
        name: 'traceHistoryQuery',
        path: '/sfc/traceHistoryQuery',
        component: './SFC/TraceHistoryQuery',
        access: 'canAdmin',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/tv',
    name: 'tv',
    icon: 'desktop',
    routes: [
      {
        name: 'changeoverBoard',
        path: '/tv/changeoverBoard',
        menuRender: false,
        headerRender: false,
        component: './TV/ChangeOverBoard',
      },
      {
        name: 'feederBoard',
        path: '/tv/feederBoard',
        menuRender: false,
        headerRender: false,
        component: './TV/FeederBoard',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/reports',
    name: 'Reports',
    icon: 'file',
    routes: [
      {
        name: 'SMT 接料看板抛料率统计表',
        path: '/reports/rejectRateStatisticsReport',
        component: './Reports/RejectRateStatisticsReport',
      },
      {
        name: '工单发料点料记录表',
        path: '/reports/orderReleaseReport',
        component: './Reports/OrderReleaseReport',
      },
      {
        name: '',
        path: '/reports/orderReleaseDetailReport',
        component: './Reports/OrderReleaseDetailReport',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: './Welcome',
    hideInMenu: true,
  },
  {
    component: './404',
  },
];
