// @ts-ignore
/* eslint-disable */

import {pageOperationLogOfMSD} from "@/services/api";

declare namespace API {
  type CurrentUser = {
    name?: string;
    // avatar?: string;
    userid?: string;
    email?: string;
    // signature?: string;
    // title?: string;
    // group?: string;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    // access?: string;
    // geographic?: {
    //   province?: { label?: string; key?: string };
    //   city?: { label?: string; key?: string };
    // };
    roles?: string[];
    cellIds?: string[];
  };

  type CellResource = {
    cellId: string;
    cellName: string;
    resources: Resource[];
  };

  type Resource = {
    id: string;
    name: string;
  };

  type CellMatStatListItem = {
    id: number;
    cellId: string;
    shortage: number;
    nostock: number;
    excess: number;
    orders: OrderResStatListItem[];
  };

  type OrderResStatListItem = {
    orderNo: string;
    resources?: ResourceStat[];
  };

  type ResourceStat = {
    id: string;
    name: string;
    stat: 'ok' | 'shortage' | 'nostock' | 'excess';
    count: number;
  };

  type MfgOrderListItem = {
    orderNo: string;
    pn: string;
    pnDesc: string;
    startDate: string;
    finishDate: string;
    orderQty: number;
    balanceQty: number;
    stat: 'ok' | 'shortage' | 'nostock' | 'excess';
    compInfos: ComponentInfo[];
  };

  type MatListItem = {
    matPn: string;
    matDesc: string;
    invQty: number;
    reqQty: number;
    trQty: number;
    isShortage: boolean;
  };

  type PlannedMatReq = {
    orders: string[];
    matList: MatListItem[];
    requestor: string;
  };

  type UnplanedMatReqReasonListItem = {
    reasonCode: string;
    reasonDesc: string;
  };

  type UnplanedMatReqListItem = {
    id?: React.Key;
    matPn?: string;
    matDesc?: string;
    reqQty?: number;
    reasonCode?: string;
  };

  type UnplannedMatReq = {
    matList: UnplanedMatReqListItem[];
    requestor: string;
  };

  type TOListItem = {
    toNo?: string;
    urgent: string;
    palletQty: number;
    dispatched?: boolean;
    trUserId?: string;
    trUserName?: string;
    trUserExt?: string;
    trBranch?: string;
    trCell?: string;
    trFloor?: string;
    toUserId?: string;
    toUserName?: string;
    toUserExt?: string;
    toBranch?: string;
    init?: number;
    ppu?: number;
    inTransit?: number;
    delivered?: number;
    ppuChecked?: boolean;
  };

  type ToTraceDetailListItem = {
    id: string;
    toNo: string;
    isUrgent: string;
    palletId: string;
    status: string;
    createTimestamp: string;
    updateTimestamp: string;
  };

  type ComponentInfo = {
    id: string;
    desc: string;
    action: string;
    reqQty: number;
    asmQty: number;
    trQty: number;
    toQty: number;
    stat: 'ok' | 'shortage' | 'nostock' | 'excess';
  };

  type OrderChangeOverListItem = {
    id: string;
    line: string;
    orderNo: string;
    pn: string;
    startDate: string;
    endDate: string;
    orderQty: number;
    status: string;
  };

  type ReplenishListItem = {
    id: string;
    lane: string;
    machineNo: string;
    slot: string;
    side: string;
    productName: string;
    matPn: string;
    remainQty: number;
    remainTime: string;
    status: string;
    drawQty: number;
    throwQty: number;
    throwRate: number;
  };

  type PhysicalResourceGroupItem = {
    id: string;
    groupName: string;
    line: string;
    lane: string;
  };

  type LoginResult = {
    success?: boolean; // if request is success
    id_token?: string;
    errorCode?: string; // code for errorType
    errorMessage?: string; // message display to user
    showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
    traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
    host?: string; // onvenient for backend Troubleshooting: host of current access server
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    errorCode: string;
    /** business error message */
    errorMessage?: string;
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type FeederItem = {
    id: string;
    machineNo: string;
    slot: string;
    side: string;
  };

  type MatListPullItem = {
    matPn: string;
    matQty: number;
    feederId: string;
    machineNo: string;
    slot: string;
    side: string;
    reelId?: string;
  };

  type ManualMatPullReq = {
    reqType: string;
    cell: string;
    line: string;
    reasonCode: string;
    requestor: string;
    orderNo?: string;
    orderDuration?: number;
    pn?: string;
    pnQty?: number;
    matList?: MatListPullItem[];
  };

  type OrderLaneListItem = {
    orderNo: string;
    pn: string;
    programNo: string;
    currentProgramNo?: string;
    cell: string;
    line: string;
    status: 'Dispatched' | 'Partial';
  };
  type PlannedMrOrderListItem = {
    id: number;
    cell: string;
    productName: string;
    mfgOrder: string;
    plannedStartDate: string;
    mfgOrderQty: number;
    matPnNo: number;
    shortageNo: number;
    requestedNo: number;
    mrStatus: string;
  };
  type ShortageMatListItem = {
    matPn: string;
    invQty: number;
    reqQty: number;
    trQty: number;
  };
  type PanelSnListItem = {
    naturalId: React.ReactNode;
    id: number;
    mainSn: string;
    subSn: string;
    preQcStat: string;
    inspResult: string;
    dispositionAction: string;
    note: string;
    origDefectLocation: string;
    origDefectCode: string;
    origDefectSubcode: string;
    updateDefectLocation: string;
    updateDefectCode: string;
    updateDefectSubcode: string;
    processTag: string;
    resourceId: string;
    opNodeId: string;
    closed: boolean;
    cell: string;
    area: string;
    createUser: string;
    createTimestamp: string;
  };
  type UpdateDefectResponse = {
    success?: boolean;
    traceId: string;
  };
  type DefCodeListItem = {
    id: number;
    defectCode: string;
    defectDesc: string;
  };
  type MsdMatListItem = {
    id: number;
    matPn: string;
    lifeTime: string;
    bakeTime: string;
    bakeTimeTolerance: string;
    bakeTemperature: string;
    bakeTemperatureTolerance: string;
  };
  type MsdMatBakeRecordItem = {
    id: number;
    matPn: string;
    lifeTime: string;
    openTime: string;
    operator: string;
    sealTime: string;
    status: string;
    residualLife: string;
  };

  type OperationLogOfMSDItem = {
    id: number;
    reelId: string;
    qty: number;
    matPn: string;
    operation: string;
    residualLife: string;
    operator: string;
    createTime: string;
    actualBakeTemperature: string;
    actualBakeTime: string;
  };
  type GrRecordItem = {
    naturalId: React.ReactNode;
    id: number;
    sccNo: string;
    vendorCode: string;
    serialNo: number;
    updateTime: string;
    count: string;
    status: string;
    palletNo: string;
    matPn: string;
    qty: string;
    productionDate: string;
    grDate: string;
    datetime: string;
    description: string;
    baseUnit: string;
    batchNo: string;
    sled: string;
    matCategory: string;
    specialStock: string;
    stockCategory: string;
    documentNo: string;
    storageEnv: string;
    storageArea: string;
    customer: string;
    matType: string;
    controlCategory: string;
    matGroup: string;
    buyerId: string;
    reason: string;
    operator: string;
    plant: string;
    storageLocation: string;
    basicMaterial: string;
    lowHalogenStatus: string;
  };
  type IqcInfoItem = {
    naturalId: React.ReactNode;
    id: number;
    sccNo: string;
    serialNo: string;
    matPn: string;
    palletNo: string;
    qty: number;
    productionDate: string;
    description: string;
    grDate: string;
    inspectionLotNo: string;
    purchaseDoc: string;
    qwi: string;
    purchDoc: string;
    firstBatch: number;
    vendorCode: string;
    vendorName: string;
    stockCategory: string;
    remark: string;
    operator: string;
    status: string;
    updateTime: string;
  };
  type MsdMatInfoItem = {
    naturalId: React.ReactNode;
    id: number;
    matPn: string;
    storageEnv: string;
    storageArea: string;
    customer: string;
    matType: string;
    controlCategory: string;
    matGroup: string;
    specialStock: string;
    createUser: string;
    updateUser: string;
    createTime: string;
    updateTime: string;
  };
  type WorkflowItem = {
    id: string;
    name: string;
    description: number;
    version: string;
    area: string;
  };
  type WorkflowGraph = {
    workflowId: string;
    nodes: [];
    edges: [];
  };
  type ReportJLKB = {
    content: any;
    id: number;
    matPn: string;
    lane: string;
    machineNo: string;
    slot: string;
    side: string;
    mfgOrder: string;
    remainQty: string;
    cuttingQty: string;
    drawQty: string;
    throwQty: string;
    throwRate: string;
    createTime: string;
    updateTime: string;
  };

  type ReportGDFL = {
    orderQty: string;
    pn: number;
    orderNo: string;
    materialList: MaterialList;

  };
  type MaterialList = {
    naturalId: React.ReactNode;
    lossRate: number;
    lossQty: number;
    returnQty: number;
    consumeQty: number;
    qty: number;
    pullQty: string;
    materialNo: string;
    rownum: string;
  };
  type ReportGDFLDetail = {
    naturalId: React.ReactNode;
    rownum: number;
    pullDid: number;
    pn: number;
    materialNo: string;
    reelId: string;
    pullQty: string;
    pullTime: string;
    returnQty: string;
    returnTime: string;
  };
  type SfcProduct = {
    id: string;
    productFamily: string;
    productNo: string;
    name: string;
    uom: string;
    sideType: string;
    arrayQty: number;
    timeControlA: number;
    customer: string;
    category: string;
    description: string;
    secondaryPkgTrace: boolean;
    tertiaryPkgTrace: boolean;
    secondarySpq: number;
    tertiarySpq: number;
    maxTestCount: number;
    area: string;
  };
  type FviPackingInfo = {
    id: number;
    name: string;
    description: string;
    multiChannel: boolean;
    channel: string;
    multiOperation: boolean;
    sharing: boolean;
    resType: string;
    createUser: string;
    createTimestamp: string;
  };
  type PackingCheckInfo = {
    packageSPQ: number;
    lastPackage: boolean;
    needPallet: boolean;
  };
  type LineListItem = {
    id: number;
    name: string;
    cell: string;
    area: string;
    category: string;
    operationTag: string;
    moveMode: string;
    feedCheckType: string;
    createUser: string;
    createTimestamp: string;
  };
  type FeederListBean = {
    line: string;
    productNo: string;
    orderNo: string;
    txnId: string;
    slots: SlotInfo[];
  };
  type SlotInfo = {
    slotCode?: string;
    matNo?: string;
    matCat?: string;
    matPns?: string[];
    scanData?: string;
  };
  type ProductTraceHistory = {
    traceId: string;
    traceSn: string;
    orderNo: string;
    workflowId: string;
    workflowName: string;
    productNo: string;
    opNodeId: string;
    opNodeName: string;
    opNodeType: string;
    opStat: string;
    qcStat: string;
    moveMode: string;
    resourceId: string;
    resName: string;
    materialTxnId: string;
    area: string;
    cell: string;
    createUser: string;
    createTimestamp: string;
  };
  type ProductSubItem = {
    id: string;
    panelSn: string;
    pcbSn: string;
    inspResult: string;
    boardType: string;
    boardIndex: string;
    createUser: string;
    createTimestamp: string;
    updateUser: string;
    updateTimestamp: string;
  };
  type ProductSetting = {
    product?: SfcProduct;
    workflowId?: string;
  };
}

