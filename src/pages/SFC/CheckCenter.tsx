import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, message, Select, Space, Spin, Typography} from 'antd';
import {useCallback, useEffect, useRef, useState} from 'react';
import {getDefectCodeList, getDefectsByPanelSn, updateDefect} from "../../services/api";
import {FormattedMessage, useIntl, useModel} from 'umi';
import type {API} from "@/services/typings";

const options1 = ['REWORK', 'RETEST', 'SCRAP'];
const options2 = ['PASS', 'SCRAP'];

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} = useModel('@@initialState');
  const intl = useIntl();
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log("requestor=", requestor)
  const inputValid = {
    required: true,
    message: intl.formatMessage({id: 'valid.reqInput', defaultMessage: 'This field is required'}),
  };

  const useMapState = <K, V>(initialMap: Map<K, V>) => {
    const [map, setMap] = useState<Map<K, V>>(initialMap);
    const latestMap = useRef<Map<K, V>>(map);
    const updateMap = useCallback((key: K, value: V) => {
      setMap((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.set(key, value);
        latestMap.current = newMap;
        return newMap;
      });
    }, []);
    const clearMap = useCallback(() => {
      setMap(new Map());
      latestMap.current = new Map();
    }, []);
    return [map, updateMap, clearMap] as const;
  };

  const [locationMap, updateLocationMap] = useMapState<any, any>(new Map());
  const [defcodeMap, updateDefcodeMap, clearDefcodeMap] = useMapState<any, any>(new Map());
  const [disActMap, updateDisActMap, clearDisActMap] = useMapState<any, any>(new Map());
  const [inspResultMap, settEditeInspResultMap, clearInspResultMap] = useMapState<any, any>(new Map());
  const [noteMap, settEditeNoteMap] = useMapState<any, any>(new Map());
  const [dfcodeOptions, setDefCodeOptions] = useState<API.DefCodeListItem[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDefcode = async () => {
      const defectCodeList = await getDefectCodeList({
        area: "PCBA",
        category: "CheckCenter",
      });
      setDefCodeOptions(defectCodeList.data)
      console.log("defectCodeList=", defectCodeList.data)
    }
    fetchDefcode()
  }, []);

  const updateCheckValues = async (record: any) => {
    const userConfirmed = window.confirm('是否确定要提交此次更新？');
    if (userConfirmed) {
      const params = {
        id: record.id,
        inspResult: inspResultMap.get(record.id) === undefined ? record.inspResult : inspResultMap.get(record.id),
        dispositionAction: disActMap.get(record.id) === undefined ? record.dispositionAction : disActMap.get(record.id),
        updateDefectLocation: locationMap.get(record.id) === undefined ? record.origDefectLocation : locationMap.get(record.id),
        updateDefectCode: defcodeMap.get(record.id) === undefined ? record.origDefectCode : defcodeMap.get(record.id),
        note: noteMap.get(record.id),
      }
      setLoading(true)
      try {
        await updateDefect(params)
        message.success(intl.formatMessage({id: 'common.success'}));
      } catch (e) {
        console.log('updateCheckValues', e);
      } finally {
        setLoading(false);
      }
      console.log(params)
    } else {
      console.log('操作已取消');
    }
  };

  const [originalData, setSnPanelList] = useState<API.PanelSnListItem[]>([]);
  const [editedData, setEditData] = useState<API.PanelSnListItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  function resetModifyData() {
    clearDefcodeMap()
    clearDisActMap()
    clearInspResultMap()
  }

  const scrapBySn = async (values: any) => {
    const userConfirmed = window.confirm('是否确定此次操作？');
    if (userConfirmed) {
      setLoading(true)
      try {
        // await updateDefect(params)
        //TODO 报废
      } catch (e) {
        console.log('updateCheckValues', e);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('操作已取消');
    }
  }
  const queryPanelListBySn = async (values: any) => {
    resetModifyData();
    const params = {
      sn: searchValue
    }
    const snPanelList = await getDefectsByPanelSn(params);
    const sortedData = snPanelList.data.map((item, index) => ({
      ...item,
      naturalId: index + 1
    }));
    setSnPanelList(sortedData)
    setEditData(snPanelList.data)
    console.log("snPanelList=", snPanelList)
    console.log("sn=", values)
  }

  const columns: ProColumns<API.PanelSnListItem>[] = [
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
      title: "主板SN",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.mainSn}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "小板SN",
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
      title: "原始失效位置",
      align: 'center',
      render: (_, record, index) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.origDefectLocation}
          </Typography.Title>
        </>
      ),
    },
    {
      title: "原始失效模式",
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
      title: "失效位置更新",
      align: 'center',
      render: (_, record, index) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            <Input
              defaultValue={record.updateDefectLocation}
              value={editedData.find((item) => item.id === record.id)?.updateDefectLocation || ''}
              onChange={(e) => {
                updateLocationMap(record.id, e.target.value)
                setEditData(
                  editedData.map((item) =>
                    item.id === record.id ? {...item, updateDefectLocation: e.target.value} : item)
                );
              }}
            />
          </Typography.Title>
        </>
      ),
    },
    {
      title: "失效模式更新",
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          <Select
            value={defcodeMap.get(record.id) === undefined ? record.updateDefectCode : defcodeMap.get(record.id)}
            style={{width: 150}}
            onChange={(p) => {
              // setDfcode(p)//只要不跟新整个status状态，就不会改变显示的数据，只要记录改变的数据用来做提交即可
              updateDefcodeMap(record.id, p)
            }}
            options={dfcodeOptions?.map((p) => ({label: p.defectCode, value: p.defectCode}))}
          />
        </Space>
      ),
    },
    {
      title: "执行措施",
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          <Select
            value={disActMap.get(record.id) === undefined ? record.dispositionAction : disActMap.get(record.id)}
            style={{width: 150}}
            onChange={(p) => {
              // setOpt1(p)
              updateDisActMap(record.id, p)
            }}
            options={options1?.map((p) => ({label: p, value: p}))}
          />
        </Space>
      ),
    },
    {
      title: "备注",
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          {/*<Input value={i_note} onChange={(e) => setNote(e.target.value)} defaultValue={"note"}/>*/}
          <Input
            defaultValue={record.note}
            value={editedData.find((item) => item.id === record.id)?.note || ''}
            onChange={(e) => {
              settEditeNoteMap(record.id, e.target.value)
              setEditData(
                editedData.map((item) =>
                  item.id === record.id ? {...item, note: e.target.value} : item)
              );
            }}
          />
        </Space>
      ),
    },
    {
      title: "判定结果",
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          <Select
            value={inspResultMap.get(record.id) === undefined ? record.inspResult : inspResultMap.get(record.id)}
            style={{width: 150}}
            onChange={(p) => {
              // setOpt2(p)
              settEditeInspResultMap(record.id, p)
            }}
            options={options2?.map((p) => ({label: p, value: p}))}
          />
        </Space>
      ),
    },
    {
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          <Button
            key="matCutting"
            type="primary"
            onClick={() => updateCheckValues(record)}
          >
            <div>提交</div>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title={<FormattedMessage id="sfc.checkCenter"/>}
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
              <Button type="primary" htmlType="submit" onClick={scrapBySn} style={{marginLeft: 40}}>
                SCRAP
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
          dataSource={originalData}
          search={false}
          pagination={false}
        />
      </Spin>
    </>
  );
};
