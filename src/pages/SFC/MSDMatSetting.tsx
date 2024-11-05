import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, message, Space, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {getMsdConfig, updateBakeMatData} from '@/services/api';
import {FormattedMessage, useModel} from 'umi';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import type {API} from "@/services/typings";
import {useIntl} from "@@/plugin-locale/localeExports";
import {EditBatRecordModal} from "@/pages/SFC/components/EditBatRecordModal";


export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log("requestor=", requestor)
  const intl = useIntl();
  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };
  const [loading, setSpinLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [visiable, setVisiable] = useState<boolean>(false);
  const [recordData, setRecord] = useState<API.MsdMatListItem[]>();
  const [editItem, setEditItem] = useState<API.MsdMatListItem>();
  const [matForm] = Form.useForm();
  const queryRecordByPn = async (values: any) => {
    setSpinLoading(true)
    const params = {
      matPn: searchValue
    }
    const orderLaneList = await getMsdConfig(params);
    console.log("orderLaneList=", orderLaneList.data)
    setRecord(orderLaneList.data)
    setSpinLoading(false)
  }
  const editRecord = async (itemData: API.MsdMatListItem) => {
    setEditItem(itemData)
    setVisiable(true)
    console.log("edit--", itemData)
  }
  useEffect(() => {
    queryRecordByPn("")
  }, [visiable]);

  const formSubmit = async (values: any) => {
    console.log('Received values from form: ', values.matList);
    setSpinLoading(true)
    try {
      await updateBakeMatData(values.matList);
      setSpinLoading(false);
      matForm.resetFields();
      message.success("提交成功");
      await queryRecordByPn("")//刷新数据
    } catch (e) {
      console.log(e)
    } finally {
      setSpinLoading(false);
    }
  }
  const columns: ProColumns<API.MsdMatListItem>[] = [
    {
      title: "PN",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matPn}
          </Typography.Title>
        </>
      )
    },
    {
      title: "OpenPackage Life(分钟)",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.lifeTime}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "Baking Temperature(摄氏度)",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.bakeTemperature}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "BakingTime(分钟)",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.bakeTime}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "BakeTimeTolerance",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.bakeTimeTolerance}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "BakeTempTolerance",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.bakeTemperatureTolerance}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            key="matCutting"
            type="primary"
            onClick={() => editRecord(record)}
          >
            <div>编辑</div>
          </Button>
        </>
      ),
    }
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="MSD物料设定"
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
            <Form.Item
              name="pn"
              label="PN"
            >
              <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={queryRecordByPn}>
                查询
              </Button>
            </Form.Item>
          </Form>
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
                    <Space key={key} size={'large'} align="baseline" style={{width: '100%'}}>
                      <Form.Item
                        label="PN"
                        name={[name, 'matPn']}
                        rules={[inputValid]}
                      >
                        <Input type="number"/>
                      </Form.Item>
                      <Form.Item
                        label="OpenPackageLife"
                        name={[name, 'lifeTime']}
                        rules={[inputValid]}
                      >
                        <Input/>
                      </Form.Item>
                      <div style={{marginLeft: -12}}>分钟</div>
                      <Form.Item
                        label="BakingTemperature"
                        name={[name, 'bakeTemperature']}
                        rules={[inputValid]}
                      >
                        <Input type="number"/>
                      </Form.Item>
                      <div style={{marginLeft: -12}}>摄氏度</div>
                      <Form.Item
                        label="BakingTime"
                        name={[name, 'bakeTime']}
                        rules={[inputValid]}
                      >
                        <Input type="number"/>
                      </Form.Item>
                      <div style={{marginLeft: -12}}>分钟</div>
                      <Form.Item
                        label="BakeTimeTolerance"
                        name={[name, 'bakeTimeTolerance']}
                        rules={[inputValid]}
                      >
                        <Input type="number"/>
                      </Form.Item>
                      <Form.Item
                        label="BakeTempTolerance"
                        name={[name, 'bakeTemperatureTolerance']}
                        rules={[inputValid]}
                      >
                        <Input type="number"/>
                      </Form.Item>
                      <Form.Item name={[name, 'matPn']} noStyle/>
                      <Form.Item name={[name, 'life']} noStyle/>
                      <Form.Item name={[name, 'temperature']} noStyle/>
                      <Form.Item name={[name, 'time']} noStyle/>
                      <Form.Item name={[name, 'bakeTimeTolerance']} noStyle/>
                      <Form.Item name={[name, 'bakeTemperatureTolerance']} noStyle/>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
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
        <ProTable<API.MsdMatListItem>
          actionRef={actionRef}
          rowKey="id"
          tableAlertRender={false}
          columns={columns}
          options={false}
          search={false}
          pagination={false}
          dataSource={recordData}
        />
        <EditBatRecordModal
          editItem={editItem}
          visible={visiable}
          setVisible={setVisiable}
        />

      </Spin>
    </>
  );
};
