import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, List, message, Spin, Typography} from "antd";
import {ProCard} from "@ant-design/pro-components";
import './components/sfc.less'
import {scrapPcb} from "@/services/api";
import {SearchOutlined} from "@ant-design/icons";

const {Text} = Typography;

//注释的代码为以后可能要批量提交的代码

interface NgModalProps {
  id: string | undefined;
}

const PcbaScrap: React.FC<NgModalProps> = ({id}) => {
  const [dataArray, setDataArray] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [pcb, setPcb] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log(id)
  // useEffect(() => {
  //   // @ts-ignore
  //   inputRef.current.focus(); // 页面加载时自动聚焦输入框
  // }, []);

  // const handleScan = (event) => {
  //   if (event.key === 'Enter') {
  //     const scannedData = event.target.value;
  //     setDataArray((prevArray) => [...prevArray, scannedData]);
  //     event.target.value = ''; // 清空输入框
  //   }
  // };

  // function resetScan() {
  //   setDataArray([])
  // }
  //
  // function submitScan() {
  //   submitData()
  // }

  async function submitData() {
    if (!pcb) {
      message.error("请输入要报废的产品");
      return
    }
    setLoading(true);
    const params = {
      sn: pcb,
      qcStat: "SCRAP",
    };
    try {
      await scrapPcb(params);
      setLoading(false);
      message.success("提交成功");
    } catch (e) {
      console.log('scrapPcb', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <ProCard
          title="Scrap PCB"
          type="inner"
          bordered
          direction="column"
        >
          <Input
            placeholder="请输入内容"
            value={pcb}
            onChange={(e) => setPcb(e.target.value)}
            addonAfter={
              <Button type="primary" icon={<SearchOutlined/>} onClick={submitData}>
                提交
              </Button>
            }
          />
          {/*<div className="sfc-scan">*/}
          {/*  <input*/}
          {/*    ref={inputRef}*/}
          {/*    type="text"*/}
          {/*    onKeyDown={handleScan}*/}
          {/*    placeholder="请扫描数据"*/}
          {/*    className="sfc-scan-input"*/}
          {/*    onFocus={(e) => (e.target.style.borderColor = 'blue')}*/}
          {/*    onBlur={(e) => (e.target.style.borderColor = 'lightgray')}*/}
          {/*  />*/}
          {/*  <List*/}
          {/*    bordered*/}
          {/*    dataSource={dataArray}*/}
          {/*    renderItem={(item) => (*/}
          {/*      <List.Item>*/}
          {/*        <Text>{item}</Text>*/}
          {/*      </List.Item>*/}
          {/*    )}*/}
          {/*    style={{marginTop: '20px'}}*/}
          {/*  />*/}
          {/*  <div className="sfc-btn-container">*/}
          {/*    <Button type="primary" onClick={resetScan}> Reset</Button>*/}
          {/*    <Button type="primary" onClick={submitScan} style={{marginLeft: 50}}> Submit</Button>*/}
          {/*  </div>*/}
          {/*</div>*/}

        </ProCard>
      </Spin>
    </div>
  );
};

export default PcbaScrap;
