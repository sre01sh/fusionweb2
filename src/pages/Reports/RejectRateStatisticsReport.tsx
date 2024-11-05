import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, DatePicker, Form, Input, Space, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {getRealtimeSlotData} from '@/services/api';
import {API} from "@/services/typings";
import moment from "moment";
import type {RangePickerProps} from "antd/es/date-picker";
import {exportToExcel} from "@/pages/components/Json2excel";

export default () => {
  const actionRef = useRef<ActionType>();

  const [loading, setLoading] = useState<boolean>(false);
  const [sd, setSd] = useState<moment.Moment>(moment());
  const [ed, setEd] = useState<moment.Moment>(moment().add(2, 'days'));
  const [pn, setPn] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [mat, setMat] = useState<string>();

  const [recordData, setRecords] = useState<API.ReportJLKB[]>([]);
  const [page_change, setPageChanged] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchRecord = async () => {
    const result = await getRealtimeSlotData({
      startDate: sd.startOf('day').toISOString(),
      endDate: ed.endOf('day').toISOString(),
      pn: pn,
      orderNo: order,
      matPn: mat,
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
    });
    // @ts-ignore
    pagination.total = result.data.totalElements
    setPagination({...pagination})
    // @ts-ignore
    const sortedData = result.data.content.map((item: any, index: number) => ({
      ...item,
      naturalId: index + 1
    }));
    setRecords(sortedData)
    console.log("result=", result.data.content)
  }

  useEffect(() => {
    setLoading(true);
    fetchRecord()
    setLoading(false);
  }, [sd, ed, page_change]);
  const queryRecordByData: RangePickerProps['onChange'] = (dates, dateStrings) => {
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
  const queryRecordByPn = async (values: any) => {
    setPn(values.target.value)
  }
  const queryRecordByOrder = async (values: any) => {
    setOrder(values.target.value)
  }
  const queryRecordByMat = async (values: any) => {
    setMat(values.target.value)
  }

  const searchBydata = async (values: any) => {
    fetchRecord()
  }

  const handleTableChange = (current_page: number, pageSize: number) => {
    console.log('Pagination changed:', current_page);
    pagination.current = current_page
    // 注意：sorter 和 filters 暂时未使用，如果需要可以根据需要添加逻辑
    setPagination({...pagination}); // 更新页码和每页大小
    const page = page_change + 1
    setPageChanged(page)
  };

  function toPercentage(value: string) {
    // 将数值乘以100并保留两位小数
    return (parseFloat(value) * 100).toFixed(2) + '%';
  }

  const exportData = async (values: any) => {
    setLoading(true)
    const result = await getRealtimeSlotData({
      startDate: sd.startOf('day').toISOString(),
      endDate: ed.endOf('day').toISOString(),
      pn: pn,
      orderNo: order,
      matPn: mat,
      pageIndex: pagination.current - 1,
      pageSize: pagination.total,
    });
    const exportedData = result.data.content
    exportToExcel(exportedData, ['lane', 'machineNo', 'slot', 'matPn', 'remainQty', 'drawQty', "throwQty", "throwRate"], "SMT 接料看板抛料率统计表", false, false);
    setLoading(false)
  }


  const columns: ProColumns<API.ReportJLKB>[] = [
    {
      title: "流道-机台-站位",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.lane + "-" + record.machineNo + "-" + record.slot}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "物料PN",
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
      title: "剩余数量",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.remainQty}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "吸料数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.drawQty}
        </Typography.Title>
      ),
    },
    {
      title: "抛料数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.throwQty}
        </Typography.Title>
      ),
    },
    {
      title: "抛料率",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {toPercentage(record.throwRate)}
        </Typography.Title>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="SMT 接料看板抛料率统计表"
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
              <Space>
                <DatePicker.RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    'This Week': [moment().startOf('week'), moment().endOf('week')],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                  }}
                  value={[sd, ed]}
                  onChange={queryRecordByData}
                />
              </Space>
            </Form.Item>
            <Form.Item>
              <Input placeholder={"根据Pn搜索"} value={pn} onChange={queryRecordByPn}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder={"根据Order搜索"} value={order} onChange={queryRecordByOrder}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder={"根据Material搜索"} value={mat} onChange={queryRecordByMat}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={searchBydata} style={{marginLeft: 40}}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={exportData} style={{marginLeft: 40}}>
                导出EXCEL
              </Button>
            </Form.Item>
          </Form>

        </ProCard>
        <ProTable<API.ReportJLKB>
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
        />
      </Spin>
    </>
  );
};
