import * as React from 'react';
import { Modal, Space, message } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import type { EditableFormInstance, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { useState } from 'react';
import { getSlotDataByOrderLane, matCutting } from '@/services/api';
import type {API} from "@/services/typings";

export const MatCuttingModal: React.FC<{
  orderNo: string;
  programNo: string;
  pn: string;
  timestamp: number;
  requestor: string;
  visible: boolean;
  setVisible: (v: boolean) => void;
  reloadMainPage: () => void;
}> = ({ orderNo, programNo, pn, timestamp, requestor, visible, setVisible, reloadMainPage }) => {
  const intl = useIntl();
  const formRef = React.useRef<ProFormInstance<any>>();
  const editorFormRef = React.useRef<EditableFormInstance<API.MatListPullItem>>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOK = async () => {
    formRef.current
      ?.validateFields?.()
      .then(async (values) => {
        console.log(values);
        setLoading(true);
        await matCutting({ orderNo, programNo, pn,requestor, slotData: values.table || [] });
        setLoading(false);
        formRef.current?.resetFields?.();
        setVisible(false);
        message.success(intl.formatMessage({ id: 'common.success' }));
        reloadMainPage();
      })
      .catch((e) => {
        console.log('submit matCutting:', e);
        setLoading(false);
      });
  };

  const columns: ProColumns<API.MatListPullItem>[] = [
    {
      title: <FormattedMessage id="oneclickOperation.slot" />,
      dataIndex: 'title',
      align: 'center',
      editable: false,
      render: (_, record) => <>{record.machineNo + '-' + record.slot + '-' + record.side}</>,
    },
    {
      title: <FormattedMessage id="oneclickOperation.matPn" />,
      dataIndex: 'matPn',
      align: 'center',
      editable: false,
    },
    {
      title: <FormattedMessage id="oneclickOperation.qty" />,
      dataIndex: 'matQty',
      align: 'center',
      valueType: 'digit',
      width: 120,
      formItemProps: () => {
        return {
          rules: [
            {
              type: 'number',
              min: 1,
              message: intl.formatMessage({
                id: 'valid.min1',
                defaultMessage: 'Minimum number is 1',
              }),
            },
          ],
        };
      },
    },
  ];

  return (
    <Modal
      title={<Space size={'large'}><FormattedMessage id="oneclickOperation.matCutting" />  { ` ${orderNo} # ${programNo} `}  </Space> }
      centered
      width={600}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={handleOK}
      confirmLoading={loading}
    >
      <ProForm<{ table: API.MatListPullItem[] }>
        formRef={formRef}
        params={{ orderNo, programNo,timestamp }}
        request={async () => {
          editorFormRef?.current?.resetFields();
          const tmp = await getSlotDataByOrderLane({ orderNo, programNo });
          console.log('getSlotDataByOrderLane:', tmp);
          setEditableRowKeys(tmp?.data.map((s) => s.machineNo + s.slot + s.side) || []);
          return {
            table: tmp.data,
          };
        }}
        validateTrigger="onBlur"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <EditableProTable<API.MatListPullItem>
          editableFormRef={editorFormRef}
          rowKey={(record) => record.machineNo + record.slot + record.side}
          name="table"
          controlled={true}
          recordCreatorProps={false}
          columns={columns}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm>
    </Modal>
  );
};
