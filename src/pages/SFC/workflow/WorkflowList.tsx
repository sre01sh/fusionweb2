import { getWorkflows, submitSfcWorkflowItem } from "@/services/api";
import type { API } from "@/services/typings";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType} from "@ant-design/pro-components";
import { ModalForm, ProFormSelect, ProFormText, ProTable, type ProColumns } from "@ant-design/pro-components";
import { Form, Select, Space } from "antd";
import { useRef, useState } from "react";

 
const WorkflowList: React.FC<{
    wid: string;
    onChange: (wid: string) => void;
  }> = (props) => {
    const areas=["PCBA"]
    const [area, setArea] = useState<string>('PCBA');
    const actionRef = useRef<ActionType>();
    const { onChange } = props;
    const [form] = Form.useForm<API.WorkflowItem>();
    const columns: ProColumns<API.WorkflowItem>[] = [
      {
        title: '工作流',
        dataIndex: 'name',
      },
    ];
    return (
      <>
      <Space>
      <Select
              value={area}
              style={{ marginLeft: "1.5rem", width: "8rem",marginBottom: "1rem",marginTop: "1rem" }}
              onChange={(p) => setArea(p)}
              options={areas?.map((p) => ({ label: p, value: p }))}
            />
     <ModalForm<API.WorkflowItem>
      title="新建工作流"
      trigger={
        <PlusOutlined />
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('cancel create workflow'),
      }}
      onFinish={async () => {
        const val1 = await form.validateFields();
        console.log('validateFields:', val1);
        await submitSfcWorkflowItem(val1);
        actionRef.current?.reload();
        return true;
      }}
    >
        <ProFormText
          width="md"
          name="name"
          label="工作流名称"
          placeholder=""
          rules={[{ required: true }]}
        />
        <ProFormText
          width="xs"
          name="version"
          label="工作流版本号"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          options={[
            {
              value: "PCBA",
              label: "PCBA",
            },
          ]}
          width="xs"
          name="area"
          initialValue={area}
          rules={[{ required: true }]}
          label="使用部门"
        />
    </ModalForm>
      </Space>
      <ProTable<API.WorkflowItem>
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          try {
            return await getWorkflows(params);
          } catch (e) {
            console.log('WorkflowList::getWorkflows::error', e);
            return {};
          }
        }}
        rowKey="id"
        params={{
          area,
        }}
        options={false}
        pagination={false}
        search={false}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record.id) {
                onChange(record.id);
              }
            },
          };
        }}
      />
      </>
    );
  };

  export default WorkflowList;