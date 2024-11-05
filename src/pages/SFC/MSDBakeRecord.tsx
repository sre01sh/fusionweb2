import {ActionType, ProCard, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {pageOperationLogOfMSD} from '@/services/api';
import {FormattedMessage, useModel} from 'umi';
import type {API} from "@/services/typings";

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)

  const [records, setRecords] = useState<API.OperationLogOfMSDItem[]>();
  const [reelId, setReelId] = useState<string>();
  const [page_change, setPageChanged] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  });
  const fetchRecord = async (isQuery: boolean) => {
    const params = {
      reelId: reelId,
      pageNum: isQuery ? 0 : (pagination.current - 1),
      pageSize: pagination.pageSize,
    }
    const record = await pageOperationLogOfMSD(params);

    console.log("record:", record.data)
    // @ts-ignore
    pagination.total = record.data.totalElements
    setPagination({...pagination})
    // @ts-ignore
    setRecords(record.data.content)
  }
  useEffect(() => {
    fetchRecord(false)
  }, [page_change]);
  const queryRecordById = async (values: any) => {
    fetchRecord(true)
  }
  const columns: ProColumns<API.OperationLogOfMSDItem>[] = [
    {
      title: "ReelID",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.reelId}
          </Typography.Title>
        </>
      )
    },
    {
      title: "PN",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matPn}
          </Typography.Title>
        </>
      )
    },
    {
      title: "Operation",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.operation}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "OperatingTime",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.createTime}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "Operator",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.operator}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "BakeTemperature",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.actualBakeTemperature}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "BakeTime",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.actualBakeTime}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "ResidualQty",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.qty}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "ResidualLife",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.residualLife}
          </Typography.Title>
        </>
      ),
    },
  ];
  const handleTableChange = (current_page: number, pageSize: number) => {
    console.log('Pagination changed:', current_page);
    pagination.current = current_page
    // 注意：sorter 和 filters 暂时未使用，如果需要可以根据需要添加逻辑
    setPagination({...pagination}); // 更新页码和每页大小
    const page = page_change + 1
    setPageChanged(page)
  };
  return (
    <>
      <ProCard
        title={<FormattedMessage id="sfc.bakeRecord"/>}
        type="inner"
        bordered
      >
        <Form
          name="customized_form_controls"
          layout="inline"
          initialValues={{
            sn: "",
          }}
        >
          <Form.Item>
            <Input placeholder={"输入ReelId"} value={reelId} onChange={(e) => setReelId(e.target.value)}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={queryRecordById}>
              查询
            </Button>
          </Form.Item>
        </Form>

      </ProCard>
      <ProTable<API.OperationLogOfMSDItem>
        actionRef={actionRef}
        rowKey="id"
        tableAlertRender={false}
        columns={columns}
        dataSource={records}
        options={false}
        search={false}
        pagination={{
          ...pagination,
          showSizeChanger: false,
          onChange: handleTableChange, // 绑定分页变化事件
        }}
      />
    </>
  );
};
