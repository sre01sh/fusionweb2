import React, {useEffect, useRef, useState} from 'react';
import {Button, List, message, Spin, Typography} from "antd";
import {ProCard} from "@ant-design/pro-components";
import './sfc.less'
import {packageSubmit} from "@/services/api";

const {Text} = Typography;

interface NgModalProps {
  id: string | undefined;
}

const NgModal: React.FC<NgModalProps> = ({id}) => {
  const [dataArray, setDataArray] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(id)
  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus(); // 页面加载时自动聚焦输入框
  }, []);

  // @ts-ignore
  const handleScan = (event) => {
    if (event.key === 'Enter') {
      const scannedData = event.target.value;
      setDataArray((prevArray) => [...prevArray, scannedData]);
      event.target.value = ''; // 清空输入框
    }
  };

  function resetScan() {
    setDataArray([])
  }

  function submitScan() {
    submitData()
  }

  async function submitData() {
    if (!id) {
      message.error("请选择包装工位");
      return;
    }
    if (dataArray.length <= 0) {
      message.error("请扫描NG的产品");
      return
    }
    setLoading(true);
    const params = {
      resId: id,
      inspResult: "SUSP",
      defectCode: "P1043",
      innerNo: dataArray,
    };
    await packageSubmit(params);
    setLoading(false);
    message.success("提交成功");
  }

  return (
    <div>
      <Spin spinning={loading}>
        <ProCard
          type="inner"
          bordered
          direction="row"
        >
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

        </ProCard>
      </Spin>
    </div>
  );
};

export default NgModal;
