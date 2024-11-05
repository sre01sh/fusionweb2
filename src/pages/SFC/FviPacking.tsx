import {ProCard} from '@ant-design/pro-components';
import {Select, Space, Tabs} from 'antd';
import {useEffect, useState} from 'react';
import {getPackagingResources} from '@/services/api';
import {FormattedMessage, useModel} from 'umi';
import {API} from "@/services/typings";
import PassModal from './components/PassModal';
import NgModal from './components/NgModal';

export default () => {
  const {initialState} = useModel('@@initialState');
  const requestor = initialState?.currentUser?.userid ?? '';
  console.log(requestor);

  const [stations, setStations] = useState<API.FviPackingInfo[]>();
  const [station, setStation] = useState<string>();
  const [resId, setResId] = useState<string>();

  const fetchPackingStation = async () => {
    const params = {
      area: "PCBA",
    };
    const record = await getPackagingResources(params);
    // @ts-ignore
    setStations(record.data);
    console.log("record:", record.data);
  };

  useEffect(() => {
    fetchPackingStation();
  }, []);

  const onChange = (key: any) => {
    console.log(key);
  };

  return (
    <>
      <ProCard
        title={<FormattedMessage id="sfc.FviPacking"/>}
        type="inner"
        bordered
        direction="column"
      >
        <Space>
          <FormattedMessage id="sfc.WorkStationChoose"/>
          <Select
            value={station}
            style={{width: 150}}
            onChange={(c) => {
              setStation(c);
              const selectedStation = stations?.find(st => st.name === c);
              // @ts-ignore
              setResId(selectedStation?.id); // 保存 station id
            }}
            options={stations?.map((c: any) => ({label: c.name, value: c.name}))}
          />
        </Space>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <Tabs.TabPane tab="PASS" key="1">
            <PassModal id={resId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="NG" key="2">
            <NgModal id={resId}/>
          </Tabs.TabPane>
        </Tabs>
      </ProCard>
    </>
  );
};
