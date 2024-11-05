import {ProCard} from '@ant-design/pro-components';
import {useState} from 'react';
import {materialReplenish} from '@/services/api';
import {useModel} from 'umi';
import {Button, Form, Input, message, Spin} from "antd";

export default () => {
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)
  const [loading, setLoading] = useState<boolean>(false);
  const [orderNo, setOrderNo] = useState<string>('');
  const [slotCode, setSlotCode] = useState<string>('');

  const submitdata = async (values: any) => {
    if (!orderNo || !slotCode) {
      return
    }
    setLoading(true)
    const params = {
      slotCode: slotCode,
      toMatNo: orderNo,
    }
    try {
      await materialReplenish(params);
      setLoading(false)
      message.success("提交成功");
    } catch (e) {
      console.log('materialReplenish', e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="接料"
          type="inner"
          bordered
        >
          <Form
            name="orderSetting"
            layout="inline"
          >
            <Form.Item
              label="SlotCode"
              name="slotCode"
              rules={[{required: true}]}>
              <Input value={orderNo} onChange={(e) => setOrderNo(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="NewReelId"
              name="toMatNo"
              rules={[{required: true}]}>
              <Input value={slotCode} onChange={(e) => setSlotCode(e.target.value)}/>
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
