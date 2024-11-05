import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Space, Button, Typography} from 'antd';
import {useRef, useState} from 'react';
import {getOrderLaneListForOneclickOperation} from '@/services/api';
import {useModel, FormattedMessage} from 'umi';
import {SearchOutlined, SyncOutlined} from '@ant-design/icons';
import {PartCuttingModal} from "@/pages/PC/components/PartCuttingModal";
import type {API} from "@/services/typings";

const TableTitle: React.FC<{ title: string }> = ({title}) => (
  <Typography.Title italic level={5} style={{margin: 0, textAlign: 'center'}}>
    <FormattedMessage id={title}/>
  </Typography.Title>
);

export default () => {
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
  const [cell, setcell] = useState<string>('');
  const [line, setline] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleMatCutting = async (record: any) => {
    setOrderNo4Modal(record.orderNo);
    setProgramNo4Modal(record.programNo);
    setPn4Modal(record.pn);
    setcell(record.cell);
    setline(record.line);
    setModalOpen(true);
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

      onFilter: (value, record) => {
        return (record.orderNo || '')
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
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
              onClick={() => handleMatCutting(record)}
            >
              {/*<FormattedMessage id="oneclickOperation.matCutting"/>*/}
              <div>产线转料</div>
            </Button>
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
            console.log("orderLaneList:", orderLaneList)
            setSpinLoading(false);
            return orderLaneList;
          } catch (e) {
            console.log('getOrderLaneListForOneclickOperation.error', e);
            return {};
          }
        }}
        headerTitle={
          <Typography.Title level={4} style={{margin: 0}}>
            <FormattedMessage id="partOperation.partCutting" />
          </Typography.Title>
        }
      />
      <PartCuttingModal
        orderNo={orderNo4Modal}
        programNo={programNo4Modal}
        pn={pn4Modal}
        requestor={requestor}
        cell={cell}
        line={line}
        timestamp={new Date().getTime()}
        visible={modalOpen}
        setVisible={setModalOpen}
        reloadMainPage={reloadPage}
      />
    </>
  );
};
