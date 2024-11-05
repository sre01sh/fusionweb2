import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, Checkbox, Col, DatePicker, message, Modal, Row, Select, Space, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {getMatListByOrders, getMfgOrdersByCell, getShortageListByOrder, submitPlannedMR,} from '@/services/api';
import {FormattedMessage, useModel} from 'umi';
import type {RangePickerProps} from 'antd/es/date-picker';
import moment from 'moment';
import PlannedMR_ModalTable from './components/PlannedMR_ModalTable';
import {exportToExcel} from '../components/Json2excel';
import {DownloadOutlined} from '@ant-design/icons';
import ShortageDetailModal from "@/pages/PC/components/ShortageDetailModal";
import type {CheckboxValueType} from "antd/lib/checkbox/Group";
import type {API} from "@/services/typings";

const CheckboxGroup = Checkbox.Group;

const TableTitle: React.FC<{ title: string }> = ({title}) => (
  <Typography.Title italic level={5} style={{margin: 0, textAlign: 'center'}}>
    <FormattedMessage id={title}/>
  </Typography.Title>
);

const statusOptions = ['未开始', '进行中', '已完成'];
export default () => {
  const actionRef = useRef<ActionType>();
  const handleReload = () => {
    if (actionRef.current) actionRef.current.reload();
  };
  const {initialState} = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);
  const [mloading, setMloading] = useState<boolean>(false);
  const partitions = initialState?.currentUser?.cellIds;
  const currentUserId = initialState?.currentUser?.userid ?? '';
  const [part, setPart] = useState<string | undefined>(partitions?.[0]);
  const [sd, setSd] = useState<moment.Moment>(moment());
  const [applyStatus, setApplyStatus] = useState<any[]>(["未开始"]);
  const [applyStatusParams, setApplyStatusParams] = useState<string[]>(["Initial"]);
  const [ed, setEd] = useState<moment.Moment>(moment().add(2, 'days'));
  const [listData, setListDatas] = useState<API.PlannedMrOrderListItem[]>([]);
  //此处代码会导致两次数据请求，并且开始结束时间不一样，先注释
  // useEffect(() => {
  //   const fetchCalendarEndDate = async () => {
  //     const calendarInitDate = moment().startOf('day').toISOString();
  //     const fetchedCells = await getCalendarOffsetDate({
  //       initDate: calendarInitDate,
  //       dateOffset: 2,
  //     });
  //     setEd(moment(fetchedCells.data.calendarOffsetDate));
  //   };
  //   fetchCalendarEndDate();
  // }, []);

  const handleDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      if (dates[0] !== null && dates[1] !== null) {
        setSd(dates[0]);
        setEd(dates[1]);
      }
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const [selectedOrders, setSelectedOrders] = useState<React.Key[]>([]);
  const hasSelected = selectedOrders.length > 0;
  const onSelectChange = (newSelectedOrders: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedOrders);
    setSelectedOrders(newSelectedOrders);
  };

  const [open, setOpen] = useState(false);
  const [showdetail, setDetailOpen] = useState(false);
  const [matList, setMatList] = useState<API.MatListItem[]>([]);
  const [shortageMatList, setShortageMatList] = useState<API.ShortageMatListItem[]>([]);
  const setSelectedRecord = async (record: API.PlannedMrOrderListItem) => {
    const tmp = await getShortageListByOrder({mfgOrder: record.mfgOrder});
    setShortageMatList(tmp.data);
    setLoading(false);
    setDetailOpen(true)
  }

  const matListCalculation = async () => {
    const allInitial = selectedOrders.every(order => {
      const matchedOrder = listData.find(item => item.mfgOrder === order);
      return matchedOrder && matchedOrder.mrStatus === "Initial";
    });
    if (!allInitial) {
      message.error("只能提交未开始工单");
      return;
    }
    setLoading(true);
    console.log('material caculation with order: ', selectedOrders);
    try {
      const tmp = await getMatListByOrders({orders: selectedOrders});
      //对数组进行排序缺料的显示在最上面 同时过滤掉trQty小于0的数据
      //tmp?.data.filter(t => t.trQty>0)
      const sortData = tmp?.data.sort((a, b) => {
        if (a.isShortage && !b.isShortage) {
          return -1; // a 缺料，b 不缺料，将 a 排在 b 前面
        } else if (!a.isShortage && b.isShortage) {
          return 1; // a 不缺料，b 缺料，将 b 排在 a 前面
        }
        return 0; // 保持原有顺序
      });

      setMatList(sortData);
      setLoading(false);
      setOpen(true);
    } catch (e) {
      setLoading(false);
      console.error("PlaanedMR::getMatListByOrders", e);
    }
  };
  // const submitMR = async () => {
  //   await submitPlannedMR({ orders: selectedOrders, matList: matList, requestor: currentUserId,cell: part });
  //   exportToExcel(matList, ['matPn', 'trQty'], selectedOrders.toString(), false);
  //   setOpen(false);
  //   handleReload();
  // };

  const handleCancel = () => {
    setOpen(false);
    setSelectedOrders([]);
  };
  const handleDetailCancel = () => {
    setDetailOpen(false);
  };
  const handleOk = async () => {
    try {
      setMloading(true);
      await submitPlannedMR({orders: selectedOrders, matList: matList, requestor: currentUserId, cell: part});
      exportToExcel(matList, ['matPn', 'trQty'], selectedOrders.toString(), false);
    } finally {
      setMloading(false);
      setOpen(false);
      setSelectedOrders([]);
      handleReload();
    }
  };
  const getStatus = (mRstatus: string): string => {
    let result = ''
    if (mRstatus === "Initial") {
      result = "未开始"
    }
    if (mRstatus === "InProgress") {
      result = "进行中"
    }
    if (mRstatus === "Completed") {
      result = "已完成"
    }
    return result
  }
  const getApplyQty = (record: API.PlannedMrOrderListItem): string => {
    let result = ''
    if (record.mrStatus === "Initial") {
      result = "-"
    } else {
      result = record.requestedNo + ""
    }
    return result
  }
  const columns: ProColumns<API.PlannedMrOrderListItem>[] = [
    {
      title: <TableTitle title="plannedMR.pn"/>,
      align: 'center',
      dataIndex: 'productName',
      width: '12rem',
      render: (_, record) => (
        <Typography.Title copyable level={5} style={{margin: 0}}>
          {_}
        </Typography.Title>
      ),
    },
    {
      title: <TableTitle title="plannedMR.mfgOrder"/>,
      align: 'center',
      width: '12rem',
      dataIndex: 'mfgOrder',
      render: (_, record) => (
        <>
          <Typography.Title copyable level={5} style={{margin: 0}}>
            {_}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="plannedMR.orderQty"/>,
      align: 'center',
      width: '8rem',
      dataIndex: 'mfgOrderQty',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {_}
        </Typography.Text>
      ),
    },
    {
      title: <TableTitle title="plannedMR.psDate"/>,
      align: 'center',
      dataIndex: 'plannedStartDate',
      width: '12rem',
      valueType: 'date',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {_}
        </Typography.Text>
      ),
    },
    {
      title: <TableTitle title="plannedMR.pfDate"/>,
      align: 'center',
      dataIndex: 'plannedCompletionDate',
      width: '12rem',
      valueType: 'date',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {_}
        </Typography.Text>
      ),
    },
    {
      title: <TableTitle title="plannedMR.pnCategory"/>,
      align: 'center',
      dataIndex: 'matPnNo',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {record.mrStatus === "Initial" ? "-" : getApplyQty(record)}
        </Typography.Text>
      ),
    },
    {
      title: <TableTitle title="plannedMR.pnShortageQty"/>,
      align: 'center',
      dataIndex: 'shortageNo',
      render: (_, record) => (
        <div onClick={() => {
          // 更新选中的数据并显示Modal
          setSelectedRecord(record);
        }}
             style={{cursor: 'pointer', color: 'blue'}}
        >
          {record.mrStatus === "Initial" ? "-" : record.shortageNo}
        </div>
      ),
    },
    {
      title: <TableTitle title="plannedMR.pnApplyQty"/>,
      align: 'center',
      dataIndex: 'requestedNo',
      valueType: 'date',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {getApplyQty(record)}
        </Typography.Text>
      ),
    },
    {
      title: <TableTitle title="plannedMR.pnStatus"/>,
      align: 'center',
      dataIndex: 'mrStatus',
      valueType: 'date',
      render: (_, record) => (
        <Typography.Text strong style={{margin: 0}}>
          {getStatus(record.mrStatus)}
        </Typography.Text>
      ),
    }
  ];

  const onChange = (list: CheckboxValueType[]) => {
    const status = [];
    if (list.includes("未开始")) {
      status.push("Initial")
    }
    if (list.includes("进行中")) {
      status.push("InProgress")
    }
    if (list.includes("已完成")) {
      status.push("Completed")
    }
    setApplyStatusParams(status)
    setApplyStatus(list);
    if (actionRef.current) actionRef.current.reload();
  };

  return (
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      <Row style={{padding: '15px 25px 10px', backgroundColor: 'white'}} wrap={false}>
        <Col flex="1">
          <Space size={'large'} wrap style={{padding: '10px 0px'}}>
            <Select
              value={part}
              style={{width: 150}}
              onChange={(p) => setPart(p)}
              options={partitions?.map((p: any) => ({label: p, value: p}))}
            />
            <Space>
              <FormattedMessage id="plannedMR.calendar.title"/>
              <DatePicker.RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  'This Week': [moment().startOf('week'), moment().endOf('week')],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                value={[sd, ed]}
                onChange={handleDateRangeChange}
              />
            </Space>
            <Space>
              <FormattedMessage id="plannedMR.applyStatus.title"/>
              <CheckboxGroup options={statusOptions} value={applyStatus} onChange={onChange}/>
            </Space>
          </Space>
        </Col>
      </Row>
      <ProTable<API.PlannedMrOrderListItem>
        actionRef={actionRef}
        loading={loading}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedOrders,
          onChange: onSelectChange,
        }}
        tableAlertRender={false}
        columns={columns}
        params={{
          cell: part,
          mrStatus: applyStatusParams,
          startDate: sd.startOf('day').toISOString(),
          endDate: ed.endOf('day').toISOString(),
        }}
        request={async (params, sorter, filter) => {
          if (!params.cell) {
            return {};
          }
          console.log(params, sorter, filter);
          try {
            const response: any = await getMfgOrdersByCell(params);
            setListDatas(response.data)
            return response;
          } catch (e) {
            console.log('PlannedMR.error', e);
            return {};
          }
        }}
        rowKey="mfgOrder"
        headerTitle={false}
        options={false}
        search={false}
        pagination={false}
        toolbar={{
          title: (
            <Typography.Title level={4} style={{margin: 0}}>
              <FormattedMessage id="plannedMR.title"/>
            </Typography.Title>
          ),
          actions: [
            <Button key="reloadBtn" type="primary" onClick={handleReload}>
              <FormattedMessage id="plannedMR.reloadBtn"/>
            </Button>,
            <Button
              key="calculationBtn"
              disabled={!hasSelected}
              type="primary"
              onClick={matListCalculation}
              icon={<DownloadOutlined style={{marginRight: 5}}/>}
            >
              <FormattedMessage id="plannedMR.calculationBtn"/>
            </Button>,
          ],
          settings: [],
        }}
      />

      <Modal
        title={<Typography.Title level={4}>
          <FormattedMessage id="plannedMR.modaltable.title"/>
        </Typography.Title>}
        width={'60vw'}
        open={open}
        // onOk={submitMR}
        onCancel={handleCancel}
        // okText={<FormattedMessage id="plannedMR.modaltable.submitbtn" />}
        // cancelText={<FormattedMessage id="plannedMR.modaltable.cancelbtn" />}
        footer={[
          <Button key="mback" onClick={handleCancel}>
            <FormattedMessage id="plannedMR.modaltable.cancelbtn"/>
          </Button>,
          <Button key="msubmit" type="primary" loading={mloading} onClick={handleOk}>
            <FormattedMessage id="plannedMR.modaltable.submitbtn"/>
          </Button>,
        ]}
      >
        <PlannedMR_ModalTable matList={matList}/>
      </Modal>

      <Modal
        title={<Typography.Title level={4}>
          <FormattedMessage id="plannedMR.modaltable.shortage_detail"/>
        </Typography.Title>}
        width={'60vw'}
        open={showdetail}
        onOk={handleDetailCancel}
        onCancel={handleDetailCancel}
        footer={
          []
        }
      >
        <ShortageDetailModal matList={shortageMatList}/>
      </Modal>
    </PageContainer>
  );
};
