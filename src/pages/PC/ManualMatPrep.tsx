import {ProCard} from '@ant-design/pro-components';
import {Select, Space, Button, Input, Form, InputNumber, message, Spin} from 'antd';
import {useEffect, useState} from 'react';
import {
  getUnplannedReasons,
  getLineListByCells,
  getFeederList,
  getMatListByLine,
  submitLineMatPull, submitLineNoOrderMatPull,
} from '@/services/api';
import {useModel, FormattedMessage, useIntl} from 'umi';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import type {API} from "@/services/typings";

export default () => {
  const intl = useIntl();

  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };

  const selectValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqSelect', defaultMessage: 'This field is required'}),
  };

  const minValid = {
    type: 'number',
    min: 1,
    message: intl.formatMessage({id: 'valid.min1', defaultMessage: 'Minimum number is 1'}),
  };

  const {initialState} = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);
  const cells = initialState?.currentUser?.cellIds;
  const requestor = initialState?.currentUser?.userid ?? '';

  const [cell, setCell] = useState<string>(cells && cells?.length > 0 ? cells[0] : '');
  const [lines, setLines] = useState<string[]>();
  const [line, setLine] = useState<string>('');
  const [reasons, setReasons] = useState<API.UnplanedMatReqReasonListItem[]>();
  const [reasonCode, setReasonCode] = useState<string>('');

  useEffect(() => {
    const fetchInitReasons = async () => {
      try {
        const fetchedReasons = await getUnplannedReasons();
        setReasons(fetchedReasons.data);
        if (fetchedReasons.data.length > 0) setReasonCode(fetchedReasons.data[0].reasonCode);
      } catch (e) {
        console.log('fetchInitReasons', e);
      }
    };
    fetchInitReasons();
  }, []);

  useEffect(() => {
    const fetchInitLines = async () => {
      try {
        const fetchedLines = await getLineListByCells({cells: cell});
        setLines(fetchedLines.data);
        if (fetchedLines.data.length > 0) setLine(fetchedLines.data[0]);
      } catch (e) {
        console.log('fetchInitLines', e);
      }
    };
    fetchInitLines();
  }, [cell]);

  const [orderForm] = Form.useForm();
  const [pnForm] = Form.useForm();
  const [matForm] = Form.useForm();
  const [noOrderForm] = Form.useForm();

  const resetAllForms = () => {
    orderForm.resetFields();
    pnForm.resetFields();
    matForm.resetFields();
    noOrderForm.resetFields();
  };

  const formSubmit = async (values: any) => {
    console.log('Received values from form: ', values);
    setLoading(true);
    try {
      await submitLineMatPull({cell, line, reasonCode, requestor, ...values});
      message.success(intl.formatMessage({id: 'common.success'}));
      resetAllForms();
    } catch (e) {
      console.log('submitLineMatPull', e);
    } finally {
      setLoading(false);
    }
  };
  const noOrderFormSubmit = async (values: any) => {
    console.log('无工单领料: ', values.matList);
    setLoading(true);
    const params = {cell, line, reasonCode, requestor, matList: values.matList}
    console.log('params=: ', params);
    try {
      const newVar = await submitLineNoOrderMatPull(params);
      console.log("result==", newVar)
      message.success(intl.formatMessage({id: 'common.success'}));
      resetAllForms();
    } catch (e) {
      console.log('submitLineMatPull', e);
    } finally {
      setLoading(false);
    }
  };
  const [matPns, setMatPns] = useState<string[]>([]);
  useEffect(() => {
    const fetchMatList = async () => {
      try {
        const fetchedMatList = await getMatListByLine({line, cell});
        setMatPns(fetchedMatList.data);
      } catch (e) {
        console.log('fetchMatList', e);
      }
    };
    fetchMatList();
  }, [line]);

  const [feederListMap, setFeederListMap] = useState<Map<string, API.FeederItem[]>>(new Map());
  const handleMatPnChange = async (matPn: string) => {
    try {
      const fetchedFeederList = await getFeederList({line, matPn, cell});
      setFeederListMap(
        new Map<string, API.FeederItem[]>([
          ...feederListMap.entries(),
          [matPn, fetchedFeederList.data],
        ]),
      );
    } catch (e) {
      console.log('handleMatPnChange', e);
    }
  };

  const handleFeederChange = async (feederStr: string, name: number) => {
    const f = JSON.parse(feederStr);
    matForm.setFieldValue(['matList', name, 'feedId'], f?.id);
    matForm.setFieldValue(['matList', name, 'machineNo'], f?.machineNo);
    matForm.setFieldValue(['matList', name, 'slot'], f?.slot);
    matForm.setFieldValue(['matList', name, 'side'], f?.side);
  };

  return (
    <Spin spinning={loading}>
      <ProCard
        title={
          <Space size={'large'} wrap style={{padding: '10px 0px'}}>
            <Space>
              <FormattedMessage id="manualMatPrep.cell"/>
              <Select
                value={cell}
                style={{width: 150}}
                onChange={(c) => {
                  setCell(c);
                  resetAllForms();
                }}
                options={cells?.map((c: any) => ({label: c, value: c}))}
              />
            </Space>
            <Space>
              <FormattedMessage id="manualMatPrep.line"/>
              <Select
                value={line}
                style={{width: 150}}
                onChange={(l) => {
                  setLine(l);
                  resetAllForms();
                }}
                options={lines?.map((l) => ({label: l, value: l}))}
              />
            </Space>
            <Space>
              <FormattedMessage id="manualMatPrep.reason"/>
              <Select
                value={reasonCode}
                style={{width: 150}}
                onChange={(r) => setReasonCode(r)}
                options={reasons?.map((r) => ({label: r.reasonDesc, value: r.reasonCode}))}
              />
            </Space>
          </Space>
        }
        direction="column"
        gutter={[0, 32]}
      >
        <ProCard
          title={<FormattedMessage id="manualMatPrep.orderPrep"/>}
          type="inner"
          bordered
          extra={
            <Button type="primary" onClick={() => orderForm.submit()}>
              <FormattedMessage id="manualMatPrep.submit"/>
            </Button>
          }
        >
          <Form
            name="order_form"
            layout="inline"
            form={orderForm}
            onFinish={formSubmit}
            initialValues={{
              orderDuration: 20,
              reqType: 'order',
            }}
          >
            <Form.Item name="reqType" noStyle/>
            <Form.Item
              name="orderNo"
              label={<FormattedMessage id="manualMatPrep.orderNo" defaultMessage="工单号"/>}
              rules={[inputValid]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="orderDuration"
              label={<FormattedMessage id="manualMatPrep.duration"/>}
              rules={[inputValid, minValid]}
            >
              <InputNumber addonAfter={<FormattedMessage id="manualMatPrep.minute"/>}/>
            </Form.Item>
          </Form>
        </ProCard>

        <ProCard
          title={<FormattedMessage id="manualMatPrep.pnPrep"/>}
          type="inner"
          bordered
          extra={
            <Button type="primary" onClick={() => pnForm.submit()}>
              <FormattedMessage id="manualMatPrep.submit"/>
            </Button>
          }
        >
          <Form
            name="pn_form"
            form={pnForm}
            layout="inline"
            onFinish={formSubmit}
            initialValues={{
              reqType: 'pn',
            }}
          >
            <Form.Item name="reqType" noStyle/>
            <Form.Item
              name="pn"
              label={<FormattedMessage id="manualMatPrep.pnNo"/>}
              rules={[inputValid]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="pnQty"
              label={<FormattedMessage id="manualMatPrep.qty"/>}
              rules={[inputValid, minValid]}
            >
              <InputNumber/>
            </Form.Item>
          </Form>
        </ProCard>

        <ProCard
          title={<FormattedMessage id="manualMatPrep.matPrep"/>}
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
            <Form.Item name="reqType" noStyle/>
            <Space size={'large'} wrap style={{padding: '10px 0px'}}>
              <Form.Item
                name="orderNo"
                label={<FormattedMessage id="manualMatPrep.orderNo"/>}
                rules={[inputValid]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="pn"
                label={<FormattedMessage id="manualMatPrep.pnNo"/>}
              >
                <Input/>
              </Form.Item>
            </Space>
            <Form.List name="matList" initialValue={[{}]}>
              {(fields, {add, remove}) => (

                <>
                  {fields.map(({key, name}) => (

                    <Space key={key} size={'large'} align="baseline" style={{width: '100%'}}>
                      <Form.Item
                        label={<FormattedMessage id="manualMatPrep.matNo"/>}
                        name={[name, 'matPn']}
                        rules={[selectValid]}
                      >
                        <Select
                          showSearch
                          style={{width: 200}}
                          onChange={handleMatPnChange}
                          options={matPns?.map((matPn) => ({
                            label: matPn,
                            value: matPn,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Feeder"
                        name={[name, 'feeder']}
                        rules={[selectValid]}
                      >
                        <Select
                          showSearch
                          style={{width: 300}}
                          onChange={(f) => handleFeederChange(f, name)}
                          options={feederListMap
                            .get(matForm.getFieldValue(['matList', name, 'matPn']))
                            ?.map((f) => ({
                              label: `${f.machineNo} - ${f.slot} - ${f.side}`,
                              value: JSON.stringify(f),
                            }))}
                        />
                      </Form.Item>
                      <Form.Item
                        label={<FormattedMessage id="manualMatPrep.qty"/>}
                        name={[name, 'matQty']}
                        rules={[inputValid, minValid]}
                      >
                        <InputNumber/>
                      </Form.Item>
                      <Form.Item name={[name, 'feedId']} noStyle/>
                      <Form.Item name={[name, 'machineNo']} noStyle/>
                      <Form.Item name={[name, 'slot']} noStyle/>
                      <Form.Item name={[name, 'side']} noStyle/>
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
        <ProCard
          title={<FormattedMessage id="manualMatPrep.pickingWithoutOrder"/>}
          type="inner"
          bordered
          extra={
            <Button type="primary" onClick={() => noOrderForm.submit()}>
              <FormattedMessage id="manualMatPrep.submit"/>
            </Button>
          }
        >
          <Form
            name="no_order_form"
            form={noOrderForm}
            onFinish={noOrderFormSubmit}
            initialValues={{
              matPn: "",
              batchNo: '',
              matQty: "",
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
                          label={<FormattedMessage id="manualMatPrep.batchNo"/>}
                          name={[name, 'batchNo']}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="数量"
                          name={[name, 'matQty']}
                          rules={[inputValid]}
                        >
                          <Input/>
                        </Form.Item>
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
      </ProCard>
    </Spin>
  );
};
