// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {API} from './typings';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<{ data: API.CurrentUser }>('/api/user', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function getAllCellResource(options?: { [key: string]: any }) {
  return request<{ data: API.CellResource[] }>('/api/getAllCellResource', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getMfgOrdersByResId(options?: { [key: string]: any }) {
  return request<{ data: API.MfgOrderListItem[] }>('/api/getMfgOrdersByResId', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getCellMatStatList(options?: { [key: string]: any }) {
  return request<{ data: API.CellMatStatListItem[] }>('/api/getCellMatStatList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function rule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

//DG
export async function getCalendarOffsetDate(options?: { [key: string]: any }) {
  return request<{ data: { calendarOffsetDate: Date } }>('/api/getCalendarOffsetDate', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getMfgOrdersByCell(options?: { [key: string]: any }) {
  return request<{ data: API.PlannedMrOrderListItem[] }>('/api/getMfgOrdersByCell', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getMatListByOrders(options?: { [key: string]: any }) {
  return request<{ data: API.MatListItem[] }>('/api/getMatListByOrders', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function submitPlannedMR(body: any, options?: { [key: string]: any }) {
  return request('/api/submitPlannedMR', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getUnplannedReasons(options?: { [key: string]: any }) {
  return request<{ data: API.UnplanedMatReqReasonListItem[] }>('/api/getUnplannedReasons', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function submitUnplannedMR(
  body: API.UnplannedMatReq,
  options?: { [key: string]: any },
) {
  return request('/api/submitUnplannedMR', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getToListForWarehouse(options?: { [key: string]: any }) {
  return request<{ data: API.TOListItem[] }>('/api/getToListForWarehouse', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function createToTraceDetail(body: API.TOListItem, options?: { [key: string]: any }) {
  return request<{ data: API.ToTraceDetailListItem [] }>('/api/createToTraceDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getMaterialByMatPn(options?: { [key: string]: any }) {
  return request<{ data: API.MatListItem }>('/api/getMaterialByMatPn', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getCells(options?: { [key: string]: any }) {
  return request<{ data: string[] }>('/api/getCells', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getGroups(options?: { [key: string]: any }) {
  return request<{ data: API.PhysicalResourceGroupItem[] }>('/api/getPhysicalResourceGroupList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getOrderChangeOverList(options?: { [key: string]: any }) {
  return request<{ data: API.OrderChangeOverListItem[] }>('/api/getOrderChangeOverList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function changeOverOrderPrep(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/changeOverOrderPrep', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getReplenishList(options?: { [key: string]: any }) {
  return request<{ data: API.ReplenishListItem[] }>('/api/getReplenishList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getToTraceDetailByToNo(options?: { [key: string]: any }) {
  return request<{ data: API.ToTraceDetailListItem[] }>('/api/getToTraceDetailByToNo', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function assignToTraceDetailById(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/assignToTraceDetailByIds', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteToTraceDetailById(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/deleteToTraceDetailByIds', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getLineListByCells(options?: { [key: string]: any }) {
  return request<{ data: string[] }>('/api/getLineListByCells', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getMatListByLine(options?: { [key: string]: any }) {
  return request<{ data: string[] }>('/api/getMatListByLine', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getFeederList(options?: { [key: string]: any }) {
  return request<{ data: API.FeederItem[] }>('/api/getFeederList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function submitLineMatPull(body: API.ManualMatPullReq, options?: { [key: string]: any }) {
  return request('/api/submitLineMatPull', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getOrderLaneListForOneclickOperation(options?: { [key: string]: any }) {
  return request<{ data: API.OrderLaneListItem[] }>('/api/getOrderLaneListForOneclickOperation', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function orderInitiation(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/orderInitiation', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getSlotDataByOrderLane(options?: { [key: string]: any }) {
  return request<{ data: API.MatListPullItem[] }>('/api/getSlotDataByOrderLane', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function matCutting(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/matCutting', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function postPartSlotDataByOrderLane(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/partMatCutting', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

//无工单领料
export async function submitLineNoOrderMatPull(body: any, options?: { [key: string]: any }) {
  return request('/api/pullMatByBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getShortageListByOrder(options?: { [key: string]: any }) {
  return request<{ data: API.ShortageMatListItem[] }>('/api/getShortageListByOrder', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getDefectsByPanelSn(options?: { [key: string]: any }) {
  return request<{ data: API.PanelSnListItem[] }>('/api/sfc/checkcenter/getDefectsByPanelSn', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function updateDefect(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/checkcenter/updateDefect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function approveDefectDisposition(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/checkcenter/approveDefectDisposition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getDefectCodeList(options?: { [key: string]: any }) {
  return request<{ data: API.DefCodeListItem[] }>('/api/sfc/checkcenter/getDefectCodeList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getMsdConfig(options?: { [key: string]: any }) {
  return request<{ data: API.MsdMatListItem[] }>('/api/wms2/msdConfig/v1/list', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function pageOperationLogOfMSD(options?: { [key: string]: any }) {
  return request<{ data: API.OperationLogOfMSDItem[] }>('/api/wms2/specialMaterial/v1/pageOperationLogOfMSD', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function updateBakeMatData(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/msdConfig/v1/batchSaveOrUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function queryGRRecords(options?: { [key: string]: any }) {
  return request<{ data: API.GrRecordItem[] }>('/api/wms2/gr/v1/getGRRecords', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function queryIQCRecords(options?: { [key: string]: any }) {
  return request<{ data: API.IqcInfoItem[] }>('/api/wms2/iqc/v1/queryIQCRecords', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function updateIQCRecords(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/iqc/v1/updateIQCRecords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function getMaterialStorageConfig(options?: { [key: string]: any }) {
  return request<{ data: API.MsdMatInfoItem[] }>('/api/wms2/material/v1/getMaterialStorageConfig', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function updateMaterialStorageConfig(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/material/v1/updateMaterialStorageConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function delMaterialStorageConfig(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/material/v1/delMaterialStorageConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addMaterialStorageConfig(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/material/v1/addMaterialStorageConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function excelImport(body: any, options?: { [key: string]: any }) {
  return request('/api/wms2/material/v1/excelImport', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getWorkflows(options?: { [key: string]: any }) {
  return request<{ data:  API.WorkflowItem[]  }>('/api/sfc/workflow/getWorkflows', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getWorkflowGraph(options?: { [key: string]: any }) {
  return request<{ data:  API.ReportJLKB  }>('/api/sfc/workflow/getWorkflowGraph', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function getRealtimeSlotData(options?: { [key: string]: any }) {
  return request<{ data:  API.ReportJLKB  }>('/api/getRealtimeSlotData', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function summaryQueryOfMaterialIssuanceAndReturnRecords(options?: { [key: string]: any }) {
  return request<{ data:  API.MaterialList  }>('/api/material/return/summaryQueryOfMaterialIssuanceAndReturnRecords', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function queryOfMaterialIssuanceAndReturnDetails(options?: { [key: string]: any }) {
  return request<{ data:  API.ReportGDFLDetail  }>('/api/material/return/queryOfMaterialIssuanceAndReturnDetails', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function getSfcProductNoList(options?: { [key: string]: any }) {
  return request<{ data:  API.SfcProduct []  }>('/api/sfc/product/getProductNoList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function getProductSettingByPid(options?: { [key: string]: any }) {
  return request<{ data: API.ProductSetting  }>('/api/sfc/product/getProductSettingByPid', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function submitSfcProduct(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/product/saveProductSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function submitSfcWorkflowItem(body: API.WorkflowItem, options?: { [key: string]: any }) {
  return request('/api/sfc/workflow/saveWorkflow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function submitSfcWorkflowGraph(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/workflow/saveWorkflowGraph', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getPackagingResources(options?: { [key: string]: any }) {
  return request<{ data:  API.FviPackingInfo  }>('/api/sfc/res/getPackagingResources', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function packageCheck(options?: { [key: string]: any }) {
  return request<{ data:  API.PackingCheckInfo  }>('/api/sfc/packaging/packageCheck', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function packageSubmit(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/packaging/packageSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function defectSubmit(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/production/defectSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function scrapPcb(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/production/update/pcb/qcstat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function componentIssueForOpc(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/order/componentIssueForOpc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function setResouceOrder(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/res/setResouceOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getGroupNamesForOrderSetting(options?: { [key: string]: any }) {
  return request<{ data:  API.LineListItem  }>('/api/sfc/res/getGroupNamesForOrderSetting', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}

export async function getFeedList(options?: { [key: string]: any }) {
  return request<{ data:  API.FeederListBean  }>('/api/sfc/feeding/getFeedList', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function getPnAndOrderNoByResGroupId(options?: { [key: string]: any }) {
  return request<{ data:  API.FeederListBean  }>('/api/sfc/res/getPnAndOrderNoByResGroupId', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function singleMaterialLoading(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/feeding/singleMaterialLoading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function materialLoadingSubmit(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/feeding/materialLoadingSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function materialBatchUnloading(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/feeding/materialBatchUnloading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function materialReplenish(body: any, options?: { [key: string]: any }) {
  return request('/api/sfc/feeding/materialReplenish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function getAllTraceHistory(options?: { [key: string]: any }) {
  return request<{ data:  API.ProductTraceHistory []  }>('/api/sfc/production/getAllTraceHistory', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
export async function getProductSubItems(options?: { [key: string]: any }) {
  return request<{ data:  { productNo: string, subItemQty: number  ,subItems: API.ProductSubItem []}  }>('/api/sfc/production/getProductSubItems', {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}