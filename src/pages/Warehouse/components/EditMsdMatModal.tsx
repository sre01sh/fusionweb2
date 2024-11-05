import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal} from 'antd';
import type {API} from "@/services/typings";
import {updateMaterialStorageConfig} from "@/services/api";

export const EditMsdMatModal: React.FC<{
  editItem: API.MsdMatInfoItem | undefined,
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({editItem, visible, setVisible}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue({
        matPn: editItem.matPn,
        storageEnv: editItem.storageEnv,
        storageArea: editItem.storageArea,
        customer: editItem.customer,
        matType: editItem.matType,
        controlCategory: editItem.controlCategory,
        matGroup: editItem.matGroup,
      });
    }
  }, [editItem, form]);

  const handleOK = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const postData = {
        id: values.id,
        matPn: values.matPn,
        storageEnv: values.storageEnv,
        storageArea: values.storageArea,
        customer: values.customer,
        matType: values.matType,
        controlCategory: values.controlCategory,
        matGroup: values.matGroup,
      };
      await updateMaterialStorageConfig([postData]);
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
      title="物料仓储编辑"
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
          rules={[{required: true, message: '请输入 MatPn'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="storageEnv"
          label="StorageEnv"
          rules={[{required: true, message: '请输入 StorageEnv'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="storageArea"
          label="StorageArea"
          rules={[{required: true, message: '请输入 StorageArea'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="customer"
          label="Customer"
          rules={[{required: true, message: '请输入 Customer'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="matType"
          label="MatType"
          rules={[{required: true, message: '请输入 matType'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="controlCategory"
          label="ControlCategory"
          rules={[{required: true, message: '请输入 ControlCategory'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="matGroup"
          label="CatGroup"
          rules={[{required: true, message: '请输入 CatGroup'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
