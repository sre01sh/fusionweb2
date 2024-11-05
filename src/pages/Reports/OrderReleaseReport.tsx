import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, Spin, Typography} from 'antd';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {summaryQueryOfMaterialIssuanceAndReturnRecords} from '@/services/api';
import {API} from "@/services/typings";
import {useModel} from "@@/plugin-model/useModel";
import {useHistory, useLocation} from "umi";
import {exportToExcel} from "@/pages/components/Json2excel";

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<string>();

  const [data, setData] = useState<API.ReportGDFL>();
  const [recordData, setRecords] = useState<API.MaterialList[]>([]);

  useEffect(() => {

  }, []);

  const fetchRecord = async () => {
    setLoading(true)
    const result = await summaryQueryOfMaterialIssuanceAndReturnRecords({
      orderNo: order,
    });
    try {
      // @ts-ignore
      setData(result.data)
      // @ts-ignore
      const listData = result.data.materialList;
      if (listData === undefined) {
        return
      }
      const sortedData = listData.map((item: any, index: number) => ({
        ...item,
        naturalId: index + 1
      }));
      setRecords(sortedData)
      setLoading(false)
    } catch (e) {
    } finally {
      setLoading(false);
    }
    console.log("result=", result.data)
  }

  const queryRecordByOrder = async (values: any) => {
    setOrder(values.target.value)
  }
  const searchBydata = async (values: any) => {
    fetchRecord()
  }

  useEffect(() => {
    // 从 LocalStorage 中恢复数据
    const savedSearchValue = localStorage.getItem('searchValue');
    const savedTableData = localStorage.getItem('tableData');

    if (savedSearchValue) {
      setOrder(savedSearchValue);
    }

    if (savedTableData) {
      setRecords(JSON.parse(savedTableData));
    }
  }, []);
  const handleRowClick = (record: {
    naturalId?: ReactNode;
    lossRate?: number;
    lossQty?: number;
    returnQty?: number;
    consumeQty?: number;
    qty?: number;
    pullQty?: string;
    materialNo: any;
    rownum?: string;
  }) => {
    if (typeof order === "string") {
      localStorage.setItem('searchValue', order);
    }
    localStorage.setItem('tableData', JSON.stringify(recordData));
    history.push({
      pathname: './OrderReleaseDetailReport',
      state: {
        orderNo: data?.orderNo,
        pn: data?.pn,
        orderQty: data?.orderQty,
        materialNo: record.materialNo
      },
    });
  };

  function toPercentage(value: number) {
    // 将数值乘以100并保留两位小数
    if (value === 0) {
      return 0.00 + '%'
    }
    return (value * 100).toFixed(2) + '%';
  }

  const exportData = async (values: any) => {
    exportToExcel(recordData, ['naturalId', 'materialNo', 'pullQty', 'qty', 'consumeQty', 'returnQty', "lossQty", "lossRate"], "工单发料点料记录报表", false, false);
  }


  const columns: ProColumns<API.MaterialList>[] = [
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
      title: "工单需求数量",
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
      title: "实际消耗数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.consumeQty}
        </Typography.Title>
      ),
    },
    {
      title: "退料盘点数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.returnQty}
        </Typography.Title>
      ),
    },
    {
      title: "损耗数量",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {record.lossQty}
        </Typography.Title>
      ),
    },
    {
      title: "损耗率",
      align: 'center',
      render: (_, record) => (
        <Typography.Title level={5} style={{margin: 0}}>
          {toPercentage(record.lossRate)}
        </Typography.Title>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="工单发料点料记录表"
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
              <Input placeholder={"根据工单号搜索"} value={order} onChange={queryRecordByOrder}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={searchBydata} style={{marginLeft: 40}}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <div>PN:{data?.pn}</div>
            </Form.Item>
            <Form.Item>
              <div>OrderQty:{data?.orderQty}</div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={exportData} style={{marginLeft: 40}}>
                导出EXCEL
              </Button>
            </Form.Item>
          </Form>

        </ProCard>
        <ProTable<API.MaterialList>
          actionRef={actionRef}
          rowKey={(record) => record.rownum}
          tableAlertRender={false}
          columns={columns}
          dataSource={recordData}
          options={false}
          search={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={false}
        />
      </Spin>
    </>
  );
};
