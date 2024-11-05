import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, DatePicker, Form, Input, Space, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {FormattedMessage} from 'umi';
import type {API} from "@/services/typings";
import {queryGRRecords} from "@/services/api";
import {exportToExcel} from "@/pages/components/Json2excel";
import moment from "moment/moment";
import type {RangePickerProps} from "antd/es/date-picker";
import {useModel} from "@@/plugin-model/useModel";


export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';

  const [loading, setLoading] = useState<boolean>(false);
  const [sd, setSd] = useState<moment.Moment>(moment());
  const [ed, setEd] = useState<moment.Moment>(moment().add(2, 'days'));
  const [searchUser, setSearchUser] = useState<string>(requestor);

  const [recordData, setRecords] = useState<API.GrRecordItem[]>([]);
  const [page_change, setPageChanged] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchRecord = async () => {
    const grRecord = await queryGRRecords({
      startDate: sd.startOf('day').toISOString(),
      endDate: ed.endOf('day').toISOString(),
      operator_id: searchUser,
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
    });
    // @ts-ignore
    pagination.total = grRecord.data.totalElements
    setPagination({...pagination})
    // @ts-ignore
    const sortedData = grRecord.data.content.map((item: any, index: number) => ({
      ...item,
      naturalId: index + 1
    }));
    setRecords(sortedData)
    console.log("grRecord=", grRecord.data)
  }

  useEffect(() => {
    setLoading(true);
    fetchRecord()
    setLoading(false);
  }, [sd, ed, searchUser, page_change]);
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
  const queryRecordByUser = async (values: any) => {
    setSearchUser(values.target.value)
  }
  const exportData = async (values: any) => {
    const records = await queryGRRecords({
      startDate: sd.startOf('day').toISOString(),
      endDate: ed.endOf('day').toISOString(),
      operator_id: searchUser,
      pageIndex: pagination.current - 1,
      pageSize: pagination.total,
    });
    // @ts-ignore
    exportToExcel(records.data.content, ['sccNo', 'serialNo', 'updateTime', 'count', 'status', 'operator'], "GR报表", false, false);
  }

  const handleTableChange = (current_page: number, pageSize: number) => {
    console.log('Pagination changed:', current_page);
    pagination.current = current_page
    // 注意：sorter 和 filters 暂时未使用，如果需要可以根据需要添加逻辑
    setPagination({...pagination}); // 更新页码和每页大小
    const page = page_change + 1
    setPageChanged(page)
  };
  const columns: ProColumns<API.GrRecordItem>[] = [
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
      title: "检验标",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.stockCategory}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "日期",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.updateTime}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "卡板号",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.palletNo}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "供应商代码",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.vendorCode}
        </Typography.Title>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title={<FormattedMessage id="warehouse.grRecord"/>}
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
                <FormattedMessage id="warehouse.grdata"/>
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
              <Input placeholder={"请输入用户"} value={searchUser} onChange={queryRecordByUser}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={exportData} style={{marginLeft: 40}}>
                导出EXCEL
              </Button>
            </Form.Item>
          </Form>

        </ProCard>
        <ProTable<API.GrRecordItem>
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
