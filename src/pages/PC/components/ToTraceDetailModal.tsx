import {
  getToTraceDetailByToNo,
  assignToTraceDetailById,
  deleteToTraceDetailById,
} from '@/services/api';
import { DeleteOutlined, SendOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, Typography } from 'antd';
import * as React from 'react';
import { useRef } from 'react';
import { FormattedMessage } from 'umi';
import PrintContent from './PrintContent';
import { useReactToPrint } from 'react-to-print';

const statMapping: Record<string, string> = {
  INIT: '未派单',
  PENDING_PICKUP: '待取件',
};

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography.Title italic level={5} style={{ margin: 0, textAlign: 'center' }}>
    <FormattedMessage id={title} />
  </Typography.Title>
);

export const ToTraceDetailModal: React.FC<{
  toListItem: API.TOListItem | undefined;
  toNo: string;
  visible: boolean;
  reloadMainPage: () => void;
}> = ({ toListItem, toNo, visible, reloadMainPage }) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(visible);
  const [loading, setLoading] = React.useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const handleReload = () => {
    if (actionRef.current) actionRef.current.reload();
  };

  const isFirstRender = useRef(true);
  const printComponentRef = React.useRef(null);
  const [currentPalletDetail, setCurrentPalletDetail] = React.useState<API.ToTraceDetailListItem>({
    id: '',
    palletId: '',
    toNo: '',
    isUrgent: '',
    status: '',
    createTimestamp: '',
    updateTimestamp: '',
  });
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handlePrint();
  }, [currentPalletDetail]);

  const handleAssignment = async (id: string) => {
    setLoading(true);
    try {
      await assignToTraceDetailById([id]);
      handleReload();
    } catch (e) {
      console.info('ToTraceDetailModal::handleSend', e);
    }
    setLoading(false);
  };

  const handleSinglePrint = async (detail: API.ToTraceDetailListItem) => {
    setCurrentPalletDetail(detail);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteToTraceDetailById([id]);
      handleReload();
    } catch (e) {
      console.info('ToTraceDetailModal::handleDelete', e);
    }
    setLoading(false);
  };

  const columns: ProColumns<API.ToTraceDetailListItem>[] = [
    {
      title: <TableTitle title="matIssuing.toNo" />,
      align: 'center',
      dataIndex: 'toNo',
      width: '10rem',
    },
    {
      title: <TableTitle title="matIssuing.palletId" />,
      align: 'center',
      dataIndex: 'palletId',
    },
    {
      title: <TableTitle title="matIssuing.urgent" />,
      align: 'center',
      dataIndex: 'isUrgent',
      width: '6rem',
      render: (_, record) =>
        record.isUrgent === 'Y' ? (
          <FormattedMessage id="common.yes" />
        ) : (
          <FormattedMessage id="common.no" />
        ),
    },
    {
      title: <TableTitle title="matIssuing.palletStatus" />,
      align: 'center',
      width: '6rem',
      dataIndex: 'status',
      render: (_, record) => statMapping[record.status],
    },
    {
      title: <TableTitle title="matIssuing.palletcreateTime" />,
      align: 'center',
      dataIndex: 'createTimestamp',
      valueType: 'dateTime',
    },
    {
      title: <TableTitle title="matIssuing.action" />,
      align: 'center',
      width: '10rem',
      render: (_, record) => (
        <Space>
          {record?.status === 'INIT' && (
            <Button
              key="detail_send"
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              title={'派单'}
              onClick={() => handleAssignment(record.id)}
            />
          )}
          <Button
            key="detail_print"
            type="primary"
            shape="circle"
            icon={<PrinterOutlined />}
            title={'打印'}
            onClick={() => handleSinglePrint(record)}
          />
          <Button
            danger
            key="detail_del"
            shape="circle"
            type="primary"
            icon={<DeleteOutlined />}
            title={'删除'}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title={'TO No. ' + toNo}
      open={modalVisible}
      width={'60vw'}
      footer={false}
      onCancel={() => {
        setModalVisible(false);
        reloadMainPage();
      }}
    >
      <ProTable<API.ToTraceDetailListItem>
        actionRef={actionRef}
        tableAlertRender={false}
        columns={columns}
        loading={loading}
        params={{
          toNo,
        }}
        request={async (params, sorter, filter) => {
          if (!params.toNo) {
            console.log('ToTraceDetailModal::getToTraceDetailByToNo::params.toNo is null');
            return {};
          }
          console.log(params, sorter, filter);
          try {
            return await getToTraceDetailByToNo(params);
          } catch (e) {
            console.log('ToTraceDetailModal::getToTraceDetailByToNo::error', e);
            return {};
          }
        }}
        rowKey="id"
        headerTitle={false}
        options={false}
        search={false}
        pagination={false}
      />

      <div style={{ display: 'none' }}>
        <div ref={printComponentRef}>
          <PrintContent currentTo={toListItem} details={[currentPalletDetail]} />
        </div>
      </div>
    </Modal>
  );
};
