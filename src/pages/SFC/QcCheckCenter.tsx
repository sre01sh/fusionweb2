import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, message, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {useModel} from 'umi';
import {useIntl} from '@@/plugin-locale/localeExports';
import {approveDefectDisposition, getDefectCodeList, getDefectsByPanelSn} from "../../services/api";
import type {API} from "@/services/typings";


export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const intl = useIntl();
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor)
  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };
  const [panelList, setSnPanelList] = useState<API.PanelSnListItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const queryPanelListBySn = async (values: any) => {
    const params = {
      sn: searchValue
    }
    const snPanelList = await getDefectsByPanelSn(params);
    const sortedData = snPanelList.data.map((item, index) => ({
      ...item,
      naturalId: index + 1
    }));
    setSnPanelList(sortedData)
    console.log("snPanelList=", snPanelList)
  }

  useEffect(() => {
    const fetchDefcode = async () => {
      const defectCodeList = await getDefectCodeList({
        area: "PCBA",
        category: "CHECK_CENTER",
      });
      console.log("defectCodeList=", defectCodeList.data)
    }
    fetchDefcode()
  }, []);
  const updateApproveValue = async () => {
    if (panelList[0] === undefined) {
      message.success("不能提交空数据");
      return
    }
    setLoading(true);
    const params = {
      mainSn: panelList[0].mainSn,
      apprResult: "PASS",
    }
    console.log(params)
    try {
      await approveDefectDisposition(params)
      message.success(intl.formatMessage({id: 'common.success'}));
    } catch (e) {
      console.log('updateApproveValue', e);
    } finally {
      setLoading(false);
    }
  }

  const searchSn = async (values: any) => {

  }

  const TableTitleBtn: React.FC<{ title: string }> = ({title}) => (
    <Typography.Title italic level={5} style={{margin: 0, textAlign: 'center'}}>
      <Button
        key="matCutting"
        type="primary"
        onClick={() => updateApproveValue()}
      >
        <div>提交</div>
      </Button>
    </Typography.Title>
  );


  const columns: ProColumns<API.PanelSnListItem>[] = [
    {
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
      title: "PanelSN",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.mainSn}
          </Typography.Title>
        </>
      )
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.subSn}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.origDefectLocation}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.origDefectCode}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.updateDefectLocation}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.updateDefectCode}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.dispositionAction}
          </Typography.Title>
        </>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.note}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitleBtn title=""/>,
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.inspResult}
          </Typography.Title>
        </>
      ),
    }
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="QC CheckCenter"
          type="inner"
          bordered
        >
          <Form
            name="customized_form_controls"
            layout="inline"
            onFinish={searchSn}
            initialValues={{
              sn: "",
            }}
          >
            <Form.Item
              name="sn"
              label="SN"
              rules={[inputValid]}
            >
              <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={queryPanelListBySn}>
                查询
              </Button>
            </Form.Item>
          </Form>
        </ProCard>
        <ProTable<API.PanelSnListItem>
          actionRef={actionRef}
          rowKey={"id"}
          tableAlertRender={false}
          columns={columns}
          options={false}
          dataSource={panelList}
          search={false}
          pagination={false}
        />
      </Spin>
    </>
  );
};
