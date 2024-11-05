import {ActionType, ProCard, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, message, Select, Spin, Typography} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {getFeedList, getGroupNamesForOrderSetting, materialLoadingSubmit, singleMaterialLoading} from '@/services/api';
import {API} from "@/services/typings";
import './components/sfc.less'

export default () => {
  const actionRef = useRef<ActionType>();

  const [cell, setCell] = useState<string>('');
  const [type, setType] = useState<string>();
  const [cells, setCells] = useState<API.LineListItem[]>([]);
  const [feederInfo, setFeederInfo] = useState<API.FeederListBean>();
  const [slotInfo, setSlotInfo] = useState<API.SlotInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [scanSlot, setSlotCode] = useState<string>('');
  const [scans, setScanData] = useState<string>('');
  const [reelIds, setReelIds] = useState<string[]>([]); // 定义一个字符串数组来保存 partNumber
  const fetchData = async () => {
    const params = {
      area: "PCBA",
    }
    const result = await getGroupNamesForOrderSetting(params);
    // @ts-ignore
    setCells(result.data)
    console.log("record:", result.data)
  }
  const fetchFeederData = async (id) => {
    const params = {
      resGroupId: id,
    }
    try {
      const result = await getFeedList(params);
      setFeederInfo(result.data)
      console.log("getFeedList:", result.data)
      setSlotInfo(result.data.slots)
    } catch (e) {
      console.log('getFeedList', e);
    }
  }
  useEffect(() => {
    fetchData()
  }, []);
  const submitdata = async (values: any) => {
    if (!cell) {
      return
    }
    setLoading(true)
    const params = {
      txnId: feederInfo?.txnId,
    }
    message.success("提交成功");
    try {
      await materialLoadingSubmit(params)
      message.success("提交成功");
    } catch (e) {
      console.log('materialLoadingSubmit', e);
    } finally {
      setLoading(false);
    }
  }

  function uploadScanBomData(matNumber) {
    const updatedSlots = slotInfo.map(item => {
      if (item.matPns && item.matNo === matNumber) {
        return {...item, matNo: matNumber};
      }
      return item;
    });
    const updatedFeederInfo = {...feederInfo, slots: updatedSlots};
    setFeederInfo(updatedFeederInfo);
    setSlotInfo(updatedSlots);
    console.log('bom更新后：slotInfo---', updatedSlots);
    console.log('bom更新后：feederInfo---', updatedFeederInfo);
    singleMaterialLoading(updatedFeederInfo)
  }

  function uploadScanFeederData(partNumber, matNumber) {
    const updatedSlots = slotInfo.map(item => {
      if (item.matPns && item.matPns.includes(partNumber)) {
        return {...item, matNo: matNumber};
      }
      return item;
    });
    const updatedFeederInfo = {...feederInfo, slots: updatedSlots};
    setFeederInfo(updatedFeederInfo);
    setSlotInfo(updatedSlots);
    console.log('feeder更新后：slotInfo---', updatedSlots);
    console.log('feeder更新后：feederInfo---', updatedFeederInfo);
    singleMaterialLoading(updatedFeederInfo)
  }

  const onScanChange = async (values: any) => {
    const str = values.target.value;
    //F7J0508 172004020 500 20240612  reelID partNo Qty Date
    //F9U0020 172095670 1000 20240701
    //F9U0020 172107270 1000 20240701
    //F7407221 172107270 1000 20240701
    //扫描得partNo就是页面上得matPn
    //L09M22301L  站位
    setScanData(str)
    console.log(str)
    console.log("cur type =", type)
    if (str.startsWith("L") || str.includes("SLOT")) {
      setSlotCode(str)
      const exists = slotInfo.some(item => item.slotCode === str);
      if (!exists && str) {
        message.warning('当前扫描的slot在服务端没记录,请重试');
        return
      }
    }
    if (str.includes(' ')) {
      const parts = str.split(" ");
      if (parts.length != 4) {
        message.warning('数据有误,请重试');
        return
      }
      const matNumber = parts[0]
      const partNumber = parts[1]
      console.log('matNumber：', matNumber)
      console.log('partNumber：', partNumber)
      if (type === "BOM") {
        let isContains = false;
        for (let i = 0; i < slotInfo.length; i++) {
          isContains = slotInfo[i].matNo === matNumber;
        }
        if (!isContains) {
          message.warning('当前reelId不匹配,请重试');
          return
        }
        uploadScanBomData(matNumber);
      }
      if (type === "FEEDLIST") {
        let isContains = false;
        for (let i = 0; i < slotInfo.length; i++) {
          isContains = slotInfo[i].matPns !== undefined && slotInfo[i].matPns.includes(partNumber);
        }
        if (!isContains) {
          message.warning('当前matPn和slot不匹配,请重试');
          return
        }
        uploadScanFeederData(partNumber, matNumber);
      }
      // 更新 scanArray，只保存匹配的 partNumber
      setReelIds(prevArray => [...prevArray, matNumber]);
    }
  }

  const columns: ProColumns<API.SlotInfo>[] = [
    {
      title: "Slot",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.slotCode}
          </Typography.Title>
        </>
      )
    },
    {
      title: "MatPn",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matPns == undefined ? "" : record.matPns.map((pn, index) => (
              <div key={index}>{pn}</div>
            ))}
          </Typography.Title>
        </>
      )
    },
    {
      title: "ReelId",
      align: 'center',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{margin: 0}}>
            {record.matNo}
          </Typography.Title>
        </>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title="SFC上料"
          type="inner"
          bordered
        ><Form
          name="orderSetting"
          layout="inline"
        >
          <Form.Item
            label="line"
            name="Line"
            rules={[{required: true}]}>
            <Select
              value={cell}
              style={{width: 250}}
              onChange={(c) => {
                setCell(c);
                const selectedStation = cells?.find(st => st.name === c);
                setType(selectedStation?.feedCheckType);
                fetchFeederData(selectedStation?.id)
              }}
              options={cells?.map((c: any) => ({label: c.name, value: c.name}))}
            />
          </Form.Item>
          <Form.Item
            label="OrderNo"
            name="OrderNo">
            <div>{feederInfo?.orderNo}</div>
          </Form.Item>
          <Form.Item
            label="Pn"
            name="Pn">
            <div>{feederInfo?.productNo}</div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"
                    onClick={submitdata}>
              提交
            </Button>
          </Form.Item>
        </Form>
        </ProCard>
        <Input
          style={{marginTop: 30}}
          placeholder="请在此处扫入数据"
          // onKeyDown={handleScan}
          value={scans} onChange={onScanChange}
        />
        <ProTable<API.SlotInfo>
          actionRef={actionRef}
          rowKey="slotCode"
          tableAlertRender={false}
          columns={columns}
          dataSource={slotInfo}
          rowClassName={(record) => (scanSlot === record.slotCode ? 'highlight' : '')}
          options={false}
          search={false}
          pagination={false}
        />
      </Spin>
    </>
  );
};
