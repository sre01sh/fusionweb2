import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Upload, Form, Input, message, Select, Space, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {addMaterialStorageConfig, excelImport, getMaterialStorageConfig} from '@/services/api';
import {FormattedMessage} from 'umi';
import type {API} from "@/services/typings";
import {EditMsdMatModal} from "@/pages/Warehouse/components/EditMsdMatModal";
import {useModel} from "@@/plugin-model/useModel";
import {Role} from "@/services/roles";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useIntl} from "@@/plugin-locale/localeExports";
import {UploadOutlined} from '@ant-design/icons';

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log("user:", requestor)
  const intl = useIntl();
  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };
  const [spinLoading, setSpinLoading] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<API.MsdMatInfoItem>();
  const [visiable, setVisiable] = useState<boolean>(false);
  const [fileList, setFileList] = useState([]);
  const [recordData, setRecords] = useState<API.MsdMatInfoItem[]>([]);
  const [page_change, setPageChanged] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const [matForm] = Form.useForm();
  const fetchRecord = async () => {
    const params = {
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
    }
    const result = await getMaterialStorageConfig(params);
    console.log("matResult=", result)
    // @ts-ignore
    const sortedData = result.data.content.map((item: any, index: number) => ({
      ...item,
      naturalId: index + 1
    }));
    console.log("sortedDataResult=", sortedData)
    setRecords(sortedData)
    // @ts-ignore
    pagination.total = result.data.totalElements
    setPagination({...pagination})
  }
  useEffect(() => {
    setSpinLoading(true);
    fetchRecord()
    setSpinLoading(false);
  }, [visiable, page_change]);
  const editRecord = async (itemData: API.MsdMatInfoItem) => {
    if (requestor !== Role.WGA) {
      message.error("当前用户没有编辑权限，请更换管理账户重试！");
      return
    }
    setEditItem(itemData)
    setVisiable(true)
    console.log("edit--", itemData)
  }

  const handleTableChange = (current_page: number, pageSize: number) => {
    console.log('Pagination changed:', current_page);
    pagination.current = current_page
    // 注意：sorter 和 filters 暂时未使用，如果需要可以根据需要添加逻辑
    setPagination({...pagination}); // 更新页码和每页大小
    const page = page_change + 1
    setPageChanged(page)
  };
  const delRecord = async (itemData: API.MsdMatInfoItem) => {
    if (requestor !== Role.WGA) {
      message.error("当前用户没有删除权限，请更换管理账户重试！");
      return
    }
    setSpinLoading(true)
    const params = {
      id: itemData.id
    }
    await getMaterialStorageConfig(params)
    setSpinLoading(false)
    fetchRecord()
  }

  const importExcel = async (values: any) => {
    if (fileList.length === 0) {
      message.error('请先选择文件');
      return;
    }
    const formData = new FormData();
    setSpinLoading(true)
    // @ts-ignore
    formData.append('excel', fileList[0].originFileObj);
    console.log("formData", formData)
    try {
      await excelImport(formData);
      message.success('文件上传成功');
    } catch (error) {
      message.error('文件上传出错');
    } finally {
      setSpinLoading(false)
    }
  }
  const formSubmit = async (values: any) => {
    console.log('formSubmit: ', values.matList);
    if (requestor !== Role.WGA) {
      message.error("当前用户没有新增权限，请更换管理账户重试！");
      return
    }
    setSpinLoading(true)
    try {
      await addMaterialStorageConfig(values.matList);
      setSpinLoading(false);
      matForm.resetFields();
      message.success("提交成功");
    } catch (e) {
      console.log(e)
    } finally {
      setSpinLoading(false);
    }
  }
  const handleChange = (info: { fileList: any; }) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // 只保留最新上传的一个文件
    setFileList(newFileList);
  };

  const columns: ProColumns<API.MsdMatInfoItem>[] = [
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
      title: "料号",
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
      title: "存储环境",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.storageEnv}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "存储区域",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.storageArea}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "客户",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.customer}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "物料类别",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matType}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "是否特殊管控",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.controlCategory}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "交付类别",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.specialStock}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "是否启用UBM",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matGroup}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "UserId",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.createUser}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            key="editRecord"
            type="primary"
            onClick={() => editRecord(record)}
          >
            <div>编辑</div>
          </Button>
          <Button
            key="delRecord"
            style={{marginLeft: 10}}
            type="primary"
            onClick={() => delRecord(record)}
          >
            <div>删除</div>
          </Button>
        </>
      ),
    }
  ];

  return (
    <>
      <Spin spinning={spinLoading}>
        <ProCard
          title={<FormattedMessage id="warehouse.management"/>}
          type="inner"
          bordered
          extra={
            <div style={{display: "flex", flexDirection: "row"}}>
              <Upload
                accept=".xls,.xlsx"
                fileList={fileList}
                beforeUpload={() => false} // 阻止自动上传
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined/>}>选择Excel文件</Button>
              </Upload>
              <Button type="primary" onClick={importExcel}>上传文件</Button>
            </div>
          }
        >
          <ProTable<API.MsdMatInfoItem>
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
        </ProCard>
        <ProCard
          title="添加物料"
          type="inner"
          bordered
          extra={
            <Button type="primary" onClick={() => matForm.submit()}>
              <FormattedMessage id="manualMatPrep.submit"/>
            </Button>
          }
        >
          <Form
            name="mat_form"
            form={matForm}
            onFinish={formSubmit}
            initialValues={{
              reqType: 'matlist',
            }}
          >
            <Form.List name="matList" initialValue={[{}]}>
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name}) => (
                    <div key={key}>
                      <Space size={'large'} align="baseline" style={{width: '100%'}}>
                        <Form.Item
                          label="物料号"
                          name={[name, 'matPn']}
                          rules={[inputValid]}
                        >
                          <Input type="number"/>
                        </Form.Item>
                        <Form.Item
                          label="存储环境"
                          name={[name, 'storageEnv']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="存储区域"
                          name={[name, 'storageArea']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="客户"
                          name={[name, 'customer']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="物料类型"
                          name={[name, 'matType']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                      </Space>
                      <Space size={'large'} align="baseline" style={{width: '100%'}}>
                        <Form.Item
                          label="特殊管控类别"
                          name={[name, 'controlCategory']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="物料组别"
                          name={[name, 'matGroup']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="是否特殊物料"
                          name={[name, 'isActive']}
                          rules={[{required: true, message: '请选择是否特殊物料'}]}
                        >
                          <Select>
                            <Select.Option value="true">是</Select.Option>
                            <Select.Option value="false">否</Select.Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)}/>
                      </Space>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      <FormattedMessage id="manualMatPrep.addRow"/>
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </ProCard>
        <EditMsdMatModal
          editItem={editItem}
          visible={visiable}
          setVisible={setVisiable}
        />
      </Spin>
    </>
  );
};
