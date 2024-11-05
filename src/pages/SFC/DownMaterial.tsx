import {ProCard} from '@ant-design/pro-components';
import {Button, Form, message, Select, Spin} from 'antd';
import {useEffect, useState} from 'react';
import {getGroupNamesForOrderSetting, getPnAndOrderNoByResGroupId, materialBatchUnloading} from '@/services/api';
import {API} from "@/services/typings";
import './components/sfc.less'

export default () => {
  const [cell, setCell] = useState<string>('');
  const [cells, setCells] = useState<API.LineListItem[]>([]);
  const [feederInfo, setFeederInfo] = useState<API.FeederListBean>();
  const [resId, setResId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    const params = {
      area: "PCBA",
    }
    const result = await getGroupNamesForOrderSetting(params);
    // @ts-ignore
    setCells(result.data)
    console.log("record:", result.data)
  }
  const fetchNextData = async (id) => {
    const params = {
      resGroupId: id,
    }
    setResId(id); // 保存 station id
    const result = await getPnAndOrderNoByResGroupId(params);
    console.log("getFeedList:", result.data)
    setFeederInfo(result.data)
  }
  useEffect(() => {
    fetchData()
  }, []);
  const submitdata = async (values: any) => {
    if (!cell) {
      return
    }
    setLoading(true)
    const params = {
      resGroupId: resId,
    }
    try {
      await materialBatchUnloading(params);
      setLoading(false)
      message.success("提交成功");
    } catch (e) {
      console.log('materialBatchUnloading', e);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="SFC下料"
          type="inner"
          bordered
        ><Form
          name="orderSetting"
          layout="inline"
        >
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
                fetchNextData(selectedStation?.id)
              }}
              options={cells?.map((c: any) => ({label: c.name, value: c.name}))}
            />
          </Form.Item>
          <Form.Item
            label="OrderNo"
            name="OrderNo">
            <div>{feederInfo?.orderNo}</div>
          </Form.Item>
          <Form.Item
            label="Pn"
            name="Pn">
            <div>{feederInfo?.productNo}</div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"
                    onClick={submitdata}>
              下料
            </Button>
          </Form.Item>
        </Form>
        </ProCard>
      </Spin>
    </>
  );
};
