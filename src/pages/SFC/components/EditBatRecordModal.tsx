import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type {API} from "@/services/typings";
import {updateBakeMatData} from "@/services/api";

export const EditBatRecordModal: React.FC<{
  editItem: API.MsdMatListItem | undefined,
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({ editItem, visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue({
        matPn: editItem.matPn,
        lifeTime: editItem.lifeTime,
        bakeTime: editItem.bakeTime,
        bakeTemperature: editItem.bakeTemperature,
        bakeTimeTolerance: editItem.bakeTimeTolerance,
        bakeTemperatureTolerance: editItem.bakeTemperatureTolerance,
      });
    }
  }, [editItem, form]);

  const handleOK = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const postData = {
        matPn: values.matPn,
        lifeTime: values.lifeTime,
        bakeTime: values.bakeTime,
        bakeTimeTolerance: values.bakeTimeTolerance,
        bakeTemperature: values.bakeTemperature,
        bakeTemperatureTolerance: values.bakeTemperatureTolerance,
      };
      await updateBakeMatData([postData]);
      setLoading(false);
      message.success("修改成功");
      setVisible(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="物料编辑"
      centered
      width={500}
      open={visible}
      onCancel={handleCancel}
      onOk={handleOK}
      confirmLoading={loading}
    >
      <Form
        form={form}
        name="edit_bat_record"
        layout="vertical"
      >
        <Form.Item
          name="matPn"
          label="MatPn"
          rules={[{ required: true, message: '请输入 MatPn' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lifeTime"
          label="LifeTime"
          rules={[{ required: true, message: '请输入 LifeTime' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bakeTime"
          label="BakeTime"
          rules={[{ required: true, message: '请输入 BakeTime' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bakeTemperature"
          label="BakeTemperature"
          rules={[{ required: true, message: '请输入 BakeTemperature' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bakeTimeTolerance"
          label="BakeTimeTolerance"
          rules={[{ required: true, message: '请输入 BakeTimeTolerance' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bakeTemperatureTolerance"
          label="BakeTemperatureTolerance"
          rules={[{ required: true, message: '请输入 BakeTemperatureTolerance' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
