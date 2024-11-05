import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, List, message, Space, Spin, Typography} from "antd";
import {ProCard} from "@ant-design/pro-components";
import './sfc.less'
import {packageCheck, packageSubmit} from "@/services/api";
import type {API} from "@/services/typings";

const {Text} = Typography;

interface NgModalProps {
  id: string | undefined;
}

const PassModal: React.FC<NgModalProps> = ({id}) => {

  const [palletSN, setPalletSN] = useState<string>("");
  const [boxSN, setBoxSN] = useState<string>("");
  const [remainQty, setRemainQty] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const defaultPackingCheckInfo: API.PackingCheckInfo = {
    packageSPQ: 0,
    lastPackage: false,
    needPallet: false,
  };

// 使用默认值创建新的对象
  const packingCheckInfo: API.PackingCheckInfo = {...defaultPackingCheckInfo};

  const [checkData, setCheckData] = useState<API.PackingCheckInfo>(packingCheckInfo);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const inputRef = useRef(null);
  console.log(id)
  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus(); // 页面加载时自动聚焦输入框
  }, []);

  // @ts-ignore
  const handleScan = (event) => {
    if (event.key === 'Enter' && remainQty > 0) {
      const scannedData = event.target.value;
      setDataArray((prevArray) => [...prevArray, scannedData]);
      event.target.value = ''; // 清空输入框
      const result = checkData.packageSPQ - (dataArray.length + 1)
      setRemainQty(result);
    }
  };
  const onPalletSnChange = async (values: any) => {
    setPalletSN(values.target.value)
    await getPackingCheckData();
  }

  const onBoxSnChange = async (values: any) => {
    setBoxSN(values.target.value)
    await getPackingCheckData();
  }

  function resetScan() {
    setDataArray([])
    setPalletSN("")
    setBoxSN("")
  }

  function submitScan() {
    submitData();
  }

  async function getPackingCheckData() {
    if (boxSN) {
      const params = {
        resId: id,
        spNo: boxSN,
        tpNo: palletSN,
      };
      const result = await packageCheck(params);
      setRemainQty(result.data.packageSPQ)
      setCheckData(result.data)
    }
  }

  async function submitData() {
    if (!id) {
      message.error("请选择包装工位");
      return;
    }
    if (boxSN) {
      if (checkData.lastPackage && dataArray.length !== checkData.packageSPQ) {
        message.error("当前非尾箱，请扫完所有产品");
        return;
      }
      setLoading(true);
      const params = {
        resId: id,
        spNo: boxSN,
        tpNo: palletSN,
        innerNo: dataArray,
      };
      await packageSubmit(params);
      setLoading(false);
      message.success("提交成功");
    } else {
      message.error("请输入Box SN");
    }
  }


  return (
    <div>
      <Spin spinning={loading}>
        <ProCard
          type="inner"
          bordered
          direction="row"
        >
          <div className="sfc-container">
            <div>
              <div className="sfc-column">
                <Space>
                  <Text>Pallet SN:</Text>
                  <Input value={palletSN} onChange={onPalletSnChange}/>

                </Space>
                <Space style={{marginTop: 20}}>
                  <Text>Box SN:</Text>
                  <Input style={{marginLeft: 10}} value={boxSN} onChange={onBoxSnChange}/>
                </Space>
              </div>
              <div className="sfc-row">
                <div>SPQ:</div>
                <div style={{marginLeft: 33}}>{checkData.packageSPQ}</div>
              </div>

              <div className="sfc-row">
                <div>LastBox:</div>
                <div style={{marginLeft: 10}}>{!checkData.lastPackage ? "NO" : "YES"}</div>
              </div>

              <div style={{display: "flex", flexDirection: "row", marginTop: 20, alignItems: "center"}}>
                <div>RemainQty:</div>
                <div
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    border: "1px solid black",
                    padding: "20px",
                    fontSize: 48
                  }}>
                  {remainQty}
                </div>
              </div>
            </div>
            <div className="sfc-scan">
              <input
                ref={inputRef}
                type="text"
                onKeyDown={handleScan}
                placeholder="请扫描数据"
                className="sfc-scan-input"
                onFocus={(e) => (e.target.style.borderColor = 'blue')}
                onBlur={(e) => (e.target.style.borderColor = 'lightgray')}
              />
              <List
                bordered
                dataSource={dataArray}
                renderItem={(item) => (
                  <List.Item>
                    <Text>{item}</Text>
                  </List.Item>
                )}
                style={{marginTop: '20px'}}
              />
              <div className="sfc-btn-container">
                <Button type="primary" onClick={resetScan}> Reset</Button>
                <Button type="primary" onClick={submitScan} style={{marginLeft: 50}}> Submit</Button>
              </div>
            </div>
          </div>

        </ProCard>
      </Spin>
    </div>
  );
};

export default PassModal;
