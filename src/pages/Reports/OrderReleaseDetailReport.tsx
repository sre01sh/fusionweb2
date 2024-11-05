import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {queryOfMaterialIssuanceAndReturnDetails} from '@/services/api';
import {API} from "@/services/typings";
import {useModel} from "@@/plugin-model/useModel";
import {useLocation} from "umi";
import {exportToExcel} from "@/pages/components/Json2excel";

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)
  const location = useLocation();
  // @ts-ignore
  const {orderNo, materialNo, pn, orderQty} = location.state || {};
  console.log("orderNo=", orderNo)
  console.log("materialNo=", materialNo)
  console.log("pn=", pn)
  console.log("orderQty=", orderQty)
  const [loading, setLoading] = useState<boolean>(false);
  // const [matNo, setMaterialNo] = useState<string>(materialNo);
  // const [order, setOrder] = useState<string>(orderNo);
  // const [matQty, setOrderQty] = useState<string>();

  const [recordData, setRecords] = useState<API.ReportGDFLDetail[]>([]);


  const fetchRecord = async () => {
    const result = await queryOfMaterialIssuanceAndReturnDetails({
      materialNo: materialNo,
      orderNo: orderNo,
    });
    // @ts-ignore
    const sortedData = result.data.map((item: any, index: number) => ({
      ...item,
      naturalId: index + 1
    }));
    setRecords(sortedData)
    console.log("result=", result.data)
  }

  useEffect(() => {
    setLoading(true);
    fetchRecord()
    setLoading(false);
  }, []);

  const exportData = async (values: any) => {
    exportToExcel(recordData, ['naturalId', 'materialNo', 'reelId', 'pullQty', 'pullTime', 'returnQty', "returnTime"], "工单发料点料记录详情报表", false, false);
  }

  const columns: ProColumns<API.ReportGDFLDetail>[] = [
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
      title: "物料PN",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.materialNo}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "ReelId",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.reelId}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "发料数量",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.pullQty}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "发料时间",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.pullTime}
        </Typography.Title>
      ),
    },
    {
      title: "退料数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.returnQty}
        </Typography.Title>
      ),
    },
    {
      title: "退料时间",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.returnTime}
        </Typography.Title>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="发料退料明细"
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
              <div>PN:{pn}</div>
            </Form.Item>
            <Form.Item>
              <div>OrderQty:{orderQty}</div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={exportData} style={{marginLeft: 40}}>
                导出EXCEL
              </Button>
            </Form.Item>
          </Form>

        </ProCard>
        <ProTable<API.ReportGDFLDetail>
          actionRef={actionRef}
          rowKey={(record) => record.rownum}
          tableAlertRender={false}
          columns={columns}
          dataSource={recordData}
          options={false}
          search={false}
          pagination={false}
        />
      </Spin>
    </>
  );
};
