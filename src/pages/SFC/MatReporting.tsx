import {ProCard} from '@ant-design/pro-components';
import {Button, Form, Input, message, Spin} from 'antd';
import {FormattedMessage, useModel} from 'umi';
import {useIntl} from "@@/plugin-locale/localeExports";
import {componentIssueForOpc} from "@/services/api";
import {useState} from "react";

export default () => {
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)
  const intl = useIntl();
  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [reportForm] = Form.useForm();
  const formSubmit = async (values: any) => {
    console.log('Received values from form: ', values);
    setLoading(true)
    await componentIssueForOpc({...values});
    setLoading(false)
    message.success(intl.formatMessage({id: 'common.success'}));
  }
  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="物料上报"
          type="inner"
          bordered
          extra={
            <Button type="primary" onClick={() => reportForm.submit()}>
              <FormattedMessage id="manualMatPrep.submit"/>
            </Button>
          }
        >
          <Form
            name="customized_form_controls"
            layout="inline"
            form={reportForm}
            onFinish={formSubmit}
            initialValues={{
              orderNo: "",
              productNo: "",
              containerNo: "",
              containerQty: "",
            }}
          >
            <Form.Item
              label="OrderNo"
              name="orderNo"
              rules={[inputValid]}>
              <Input/>
            </Form.Item>
            <Form.Item
              label="ProductNo"
              name="productNo"
              rules={[inputValid]}>
              <Input/>
            </Form.Item>
            <Form.Item
              label="ContainerNo"
              name="containerNo"
              rules={[inputValid]}>
              <Input/>
            </Form.Item>
            <Form.Item
              label="ContainerQty"
              name="containerQty"
              rules={[inputValid]}>
              <Input/>
            </Form.Item>
          </Form>
        </ProCard>
      </Spin>
    </>
  );
};
