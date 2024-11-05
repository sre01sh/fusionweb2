import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {queryIQCRecords, updateIQCRecords} from '@/services/api';
import {FormattedMessage} from 'umi';
import type {API} from "@/services/typings";


export default () => {
  const actionRef = useRef<ActionType>();

  const [recordData, setRecords] = useState<API.IqcInfoItem[]>([]);
  const [page_change, setPageChanged] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  });
  const [loading, setSpinLoading] = useState<boolean>(false);
  const fetchRecord = async () => {
    const params = {
      status: "PENDING",
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
    }
    const records = await queryIQCRecords(params);
    console.log("IqcInfo:",records)
    // @ts-ignore
    const sortedData = records.data.content.map((item: any, index: number) => ({
      ...item,
      naturalId: index + 1
    }));
    console.log("sortedIqcData:",sortedData)
    setRecords(sortedData)
    // @ts-ignore
    pagination.total = records.data.totalElements
    setPagination({...pagination})
  }
  useEffect(() => {
    setSpinLoading(true);
    fetchRecord()
    setSpinLoading(false);
  }, [page_change]);

  const handleTableChange = (current_page: number, pageSize: number) => {
    console.log('Pagination changed:', current_page);
    pagination.current = current_page
    // 注意：sorter 和 filters 暂时未使用，如果需要可以根据需要添加逻辑
    setPagination({...pagination}); // 更新页码和每页大小
    const page = page_change + 1
    setPageChanged(page)
  };
  const closeRecord = async (itemData: API.IqcInfoItem) => {
    const params = {
      id: itemData.id,
      status: "CHECKED",
      remark: "",
    }
    console.log("关闭", [params])
    await updateIQCRecords([params])
  }
  const columns: ProColumns<API.IqcInfoItem>[] = [
    {
      title: "ID",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.naturalId}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "料号",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matPn}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "数量",
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
      title: "QWI",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.qwi}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "供应商",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.vendorName}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "供应商代码",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.vendorCode}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "GR日期",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.grDate}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "检验编号",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.inspectionLotNo}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "订单号码",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.purchDoc}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "是否第一批来料",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.firstBatch === 1 ? "是" : "否"}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            key="matCutting"
            type="primary"
            onClick={() => closeRecord(record)}
          >
            <div>关闭</div>
          </Button>
        </>
      ),
    }
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProTable<API.IqcInfoItem>
          actionRef={actionRef}
          rowKey={(record) => record.id}
          tableAlertRender={false}
          columns={columns}
          dataSource={recordData}
          options={false}
          search={false}
          pagination={{
            ...pagination,
            showSizeChanger: false,
            onChange: handleTableChange, // 绑定分页变化事件
          }}
          headerTitle={
            <Typography.Title level={4} style={{margin: 0}}>
              <FormattedMessage id="warehouse.iqcInfo"/>
            </Typography.Title>
          }
        />
      </Spin>
    </>
  );
};
