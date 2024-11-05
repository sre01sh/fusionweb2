import {ProCard} from '@ant-design/pro-components';
import {useEffect, useState} from 'react';
import {getGroupNamesForOrderSetting, setResouceOrder} from '@/services/api';
import type {API} from "@/services/typings";
import {Button, Form, Input, message, Select, Spin} from "antd";

export default () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [orderNo, setOrderNo] = useState<string>('');
  const [resId, setResId] = useState<number>();
  const [cell, setCell] = useState<string>('');
  const [cells, setCells] = useState<API.LineListItem[]>([]);
  const fetchData = async () => {
    const params = {
      area: "PCBA",
    }
    const result = await getGroupNamesForOrderSetting(params);
    // @ts-ignore
    setCells(result.data)
    console.log("record:", result.data)
  }
  useEffect(() => {
    fetchData()
  }, []);
  const submitdata = async (values: any) => {
    if (!orderNo || !cell) {
      return
    }
    setLoading(true)
    const params = {
      resGroupId: resId,
      orderNo: orderNo,
    }
    try {
      await setResouceOrder(params);
      setLoading(false)
      message.success("提交成功");
    } catch (e) {
      console.log('setResouceOrder', e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="订单设置"
          type="inner"
          bordered
        >
          <Form
            name="orderSetting"
            layout="inline"
          >
            <Form.Item
              label="OrderNo"
              name="orderNo"
              rules={[{required: true}]}>
              <Input value={orderNo} onChange={(e) => setOrderNo(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="line"
              name="Line"
              rules={[{required: true}]}>
              <Select
                value={cell}
                style={{width: 250}}
                onChange={(c) => {
                  setCell(c);
                  const selectedStation = cells?.find(st => st.name === c);
                  setResId(selectedStation?.id); // 保存 station id
                }}
                options={cells?.map((c: any) => ({label: c.name, value: c.name}))}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={submitdata}>
                设置
              </Button>
            </Form.Item>
          </Form>
        </ProCard>
      </Spin>
    </>
  );
};
