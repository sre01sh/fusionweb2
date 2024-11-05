import { getMaterialByMatPn, getUnplannedReasons, submitUnplannedMR } from '@/services/api';
import { DownloadOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { Button, Typography, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useModel } from 'umi';
import { exportToExcel } from '../components/Json2excel';
import moment from 'moment';
import type {API} from "@/services/typings";

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography.Title italic level={5} style={{ margin: 0, textAlign: 'center' }}>
    <FormattedMessage id={title} />
  </Typography.Title>
);

export default () => {
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.userid ?? '';

  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance<any>>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([0]);
  const [reasons, setReasons] = useState<API.UnplanedMatReqReasonListItem[]>();
  const [refreshMatDesc, setRefreshMatDesc] = useState<string>();

  const columns: ProColumns<API.UnplanedMatReqListItem>[] = [
    {
      title: <TableTitle title="unplannedMR.matpn" />,
      align: 'center',
      dataIndex: 'matPn',
      fieldProps: (form, config) => ({
        onChange: async (e) => {
          const fetchedMatItem = await getMaterialByMatPn({ matPn: e.currentTarget.value });
          form.setFieldValue(['table', config.rowIndex, 'matDesc'], fetchedMatItem.data?.matDesc);
          setRefreshMatDesc(fetchedMatItem.data?.matDesc);
        },
      }),
      formItemProps: () => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: <FormattedMessage id={'valid.reqInput'} />,
            },
          ],
        };
      },
      width: '20%',
    },
    {
      title: <TableTitle title="unplannedMR.reqqty" />,
      align: 'center',
      dataIndex: 'reqQty',
      valueType: 'digit',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: <FormattedMessage id={'valid.reqInput'} /> }],
        };
      },
      width: '15%',
    },
    {
      title: <TableTitle title="unplannedMR.matdesc" />,
      align: 'center',
      editable: false,
      dataIndex: 'matDesc',
      render: (_, record, rowIndex) => {
        if (refreshMatDesc) return formRef.current?.getFieldValue(['table', rowIndex, 'matDesc']);
        else return '';
      },
    },
    {
      title: <TableTitle title="unplannedMR.reason" />,
      key: 'reasonCode',
      dataIndex: 'reasonCode',
      width: '20%',
      valueType: 'select',
      fieldProps: {
        options: reasons?.map((r) => ({ label: r.reasonDesc, value: r.reasonCode })),
      },
      formItemProps: () => {
        return {
          rules: [
            {
              required: true,
              whitespace: true,
              message: <FormattedMessage id={'valid.reqSelect'} />,
            },
          ],
        };
      },
    },
    {
      title: <TableTitle title="unplannedMR.action" />,
      valueType: 'option',
      align: 'center',
      render: () => {
        return null;
      },
      width: '4rem',
    },
  ];

  useEffect(() => {
    const fetchReasons = async () => {
      const fetchedReasons = await getUnplannedReasons();
      setReasons(fetchedReasons.data);
    };
    fetchReasons();
  }, []);

  return (
    <ProForm<{ table: API.UnplanedMatReqListItem[] }>
      formRef={formRef}
      initialValues={{
        table: [{ id: 0 }],
      }}
      validateTrigger="onBlur"
      style={{ padding: '15px 25px 10px', backgroundColor: 'white' }}
      onFinish={async (values) => {
        // console.log('Unplanned MR:', values.table);
        await submitUnplannedMR({ matList: values.table, requestor: currentUserId });
        exportToExcel(
          values.table,
          ['matPn', 'reqQty'],
          'Unplanned-' + moment().format('YYYYMMDD-HHmm'),
          false,
        );
        setLoading(false);
        message.success('提交成功');
        formRef.current?.resetFields();
      }}
      onFinishFailed={(errorInfo: any) => {
        setLoading(false);
        console.log('Unplanned MR Failed:', errorInfo);
      }}
      submitter={false}
    >
      <EditableProTable<API.UnplanedMatReqListItem>
        rowKey="id"
        name="table"
        columns={columns}
        recordCreatorProps={{
          record: (index) => ({
            id: index,
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="submitbtn"
              htmlType="submit"
              loading={loading}
              icon={<DownloadOutlined style={{ marginRight: 5 }} />}
            >
              <FormattedMessage id={'unplannedMR.submitbtn'} />
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDoms) => {
            return [
              <div key="deleteBtn" style={{ textAlign: 'center', width: '100%' }}>
                {defaultDoms.delete}
              </div>,
            ];
          },
        }}
        headerTitle={
          <Typography.Title level={4} style={{ margin: 0 }}>
            <FormattedMessage id="unplannedMR.title" />
          </Typography.Title>
        }
      />
    </ProForm>
  );
};
