import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Input, InputRef, message, Popconfirm, Space, Typography} from 'antd';
import {useRef, useState} from 'react';
import {getOrderLaneListForOneclickOperation, orderInitiation} from '@/services/api';
import {FormattedMessage, useIntl, useModel} from 'umi';
import {SearchOutlined, SyncOutlined} from '@ant-design/icons';
import {MatCuttingModal} from "@/pages/PC/components/MatCuttingModal";
import type {API} from "@/services/typings";

const TableTitle: React.FC<{ title: string }> = ({title}) => (
  <Typography.Title italic level={5} style={{margin: 0, textAlign: 'center'}}>
    <FormattedMessage id={title}/>
  </Typography.Title>
);

export default () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  const reloadPage = () => {
    actionRef.current?.reload();
  };
  const [spinLoading, setSpinLoading] = useState<boolean>(false);

  const [orderNo4Modal, setOrderNo4Modal] = useState<string>('');
  const [programNo4Modal, setProgramNo4Modal] = useState<string>('');
  const [pn4Modal, setPn4Modal] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleMatCutting = async (orderNo: string, programNo: string, pn: string) => {
    setOrderNo4Modal(orderNo);
    setProgramNo4Modal(programNo);
    setPn4Modal(pn);
    setModalOpen(true);
  };

  const handleOrderInitiation = async (
    orderNo: string,
    programNo: string,
    cell: string,
    line: string,
    pn: string,
  ) => {
    try {
      await orderInitiation({orderNo, programNo, cell, line, pn, requestor});
      message.success(intl.formatMessage({id: 'common.success'}));
    } catch (e) {
      console.log(e);
    }
    reloadPage();
  };

  const searchInput = useRef<InputRef>(null);
  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void, confirm: () => void) => {
    clearFilters();
    confirm();
  };

  const columns: ProColumns<API.OrderLaneListItem>[] = [
    {
      title: <TableTitle title="oneclickOperation.orderNo"/>,
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.orderNo}
          </Typography.Title>
        </>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
      ),
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
        <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            value={`${selectedKeys[0] || ''}`}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
            style={{marginBottom: 6, display: 'block'}}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm)}
              icon={<SearchOutlined/>}
              size="small"
              style={{width: 90}}
            >
              &nbsp; <FormattedMessage id="common.search"/>
            </Button>
            <Button
              type="link"
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{width: 90}}
            >
              <b>
                <FormattedMessage id="common.reset"/>
              </b>
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        return (record.orderNo || '')
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    {
      title: <TableTitle title="oneclickOperation.productNo"/>,
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.pn}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="oneclickOperation.programNo"/>,
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.programNo}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="oneclickOperation.currentProgramNo"/>,
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}
                            mark={!(record?.currentProgramNo === record?.programNo)}>
            {record.currentProgramNo}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="oneclickOperation.action"/>,
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          {record.status === 'Partial' && (
            <Button
              key="matCutting"
              type="primary"
              onClick={() => handleMatCutting(record.orderNo, record.programNo, record.pn)}
            >
              <FormattedMessage id="oneclickOperation.matCutting"/>
            </Button>
          )}
          {record.status === 'Dispatched' && (
            <Popconfirm
              onConfirm={() =>
                handleOrderInitiation(record.orderNo, record.programNo, record.cell, record.line, record.pn)
              }
              title={
                <>
                  <FormattedMessage id="oneclickOperation.confirmOrder"/> {`${record.orderNo} # ${record.programNo} ?`}
                </>
              }
            >
              <Button key="orderInit" type="primary">
                <FormattedMessage id="oneclickOperation.orderInit"/>
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.OrderLaneListItem>
        actionRef={actionRef}
        rowKey={(record) => record.orderNo + record.programNo}
        tableAlertRender={false}
        columns={columns}
        options={false}
        search={false}
        pagination={false}
        toolBarRender={() => {
          return [
            <Button
              key="reloadBtn"
              shape="round"
              icon={
                <SyncOutlined
                  onClick={() => {
                    setSpinLoading(true);
                    actionRef.current?.reload();
                  }}
                  style={{fontSize: 17}}
                  spin={spinLoading}
                />
              }
            />,
          ];
        }}
        params={{
          userId: requestor,
        }}
        request={async (params, sorter, filter) => {
          // console.log(params, sorter, filter);
          try {
            const orderLaneList = await getOrderLaneListForOneclickOperation(params);
            setSpinLoading(false);
            return orderLaneList;
          } catch (e) {
            console.log('getOrderLaneListForOneclickOperation.error', e);
            return {};
          }
        }}
        headerTitle={
          <Typography.Title level={4} style={{margin: 0}}>
            <FormattedMessage id="oneclickOperation.matCutting"/>
          </Typography.Title>
        }
      />
      <MatCuttingModal
        orderNo={orderNo4Modal}
        programNo={programNo4Modal}
        pn={pn4Modal}
        requestor={requestor}
        timestamp={new Date().getTime()}
        visible={modalOpen}
        setVisible={setModalOpen}
        reloadMainPage={reloadPage}
      />
    </>
  );
};
