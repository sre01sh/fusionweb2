import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Col, Row, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import { getReplenishList, getGroups } from '@/services/api';
import styles from './Material.less';
import { FormattedMessage, history } from 'umi';
import CustomDaydiff from './components/CustomDaydiff';
import { DownloadOutlined } from '@ant-design/icons';
import { exportToExcel } from '../components/Json2excel';

const statMapping: Record<string, string> = {
  Prepared: '已备料',
  Inprep: '备料中',
  Pending: '待捡料',
};

const { Title, Text } = Typography;
const columns: ProColumns<API.ReplenishListItem>[] = [
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.slot" />
      </Title>
    ),
    dataIndex: 'slot',
    align: 'center',
    width: '28rem',
    sorter: (a, b) => (a.machineNo+a.slot+a.side).localeCompare(b.machineNo+b.slot+b.side),
    render: (_, recorder) => (
      <Title level={3} className={styles.bodyCell}>
        {recorder.lane}-{recorder.machineNo}-{recorder.slot}-{recorder.side}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.matpn" />
      </Title>
    ),
    dataIndex: 'matPn',
    align: 'center',
    width: '20rem',
    render: (_) => (
      <Title level={3} className={styles.bodyCell}>
        {_}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.remainqty" />
      </Title>
    ),
    dataIndex: 'remainQty',
    align: 'center',
    width: '20rem',
    valueType: 'digit',
    render: (_) => (
      <Title level={3} className={styles.bodyCell}>
        {_}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.remaintime" />
      </Title>
    ),
    dataIndex: 'remainTime',
    align: 'center',
    width: '17rem',
    render: (_, recorder) => (
      <Title level={3} className={styles.bodyCell}>
        {recorder.remainTime?(<CustomDaydiff key={recorder.remainTime} now={dayjs()} targetTime={recorder.remainTime} />):'-'}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.status" />
      </Title>
    ),
    dataIndex: 'status',
    align: 'center',
    width: '15rem',
    render: (_, recorder) => (
      <Title level={4} className={styles.bodyCell}>
        {statMapping[recorder.status]}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.drawqty" />
      </Title>
    ),
    dataIndex: 'drawQty',
    align: 'center',
    width: '10rem',
    valueType: 'digit',
    render: (_) => (
      <Title level={3} className={styles.bodyCell}>
        {_}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.throwqty" />
      </Title>
    ),
    dataIndex: 'throwQty',
    align: 'center',
    width: '10rem',
    valueType: 'digit',
    render: (_) => (
      <Title level={3} className={styles.bodyCell}>
        {_}
      </Title>
    ),
  },
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        <FormattedMessage id="feeder.throwrate" />
      </Title>
    ),
    dataIndex: 'throwRate',
    align: 'center',
    width: '10rem',
    sorter: (a, b) => a.throwRate - b.throwRate,
    sortDirections: ['descend'],
    render: (_, recorder) => (
      <Title level={3} className={styles.bodyCell}>
        {recorder.throwRate?((recorder.throwRate * 100).toFixed(2)+'%'):'-'}
      </Title>
    ),
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [time, setTime] = useState(() => Date.now());
  const [polling, setPolling] = useState<number | undefined>(60 * 1000);

  const [currentTime, setCurrentTime] = useState(dayjs());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [groups, setGroups] = useState<API.PhysicalResourceGroupItem[] | undefined>();
  const [groupId, setGroupId] = useState<string | undefined>();
  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await getGroups();
      setGroups(res.data);
      setGroupId(res.data?.[0].id);
    };
    fetchGroupData();
  }, []);

  const [lastSuccessData, setlastSuccessData] = useState<{ data: API.ReplenishListItem[] }>();

  const feederListExport = async () => {
    if(groups){
      const currentLine = groups.find(item => item.id === groupId);
      if(lastSuccessData?.data){
        const excelData = lastSuccessData.data.sort((a, b) => (a.machineNo+a.slot+a.side).localeCompare(b.machineNo+b.slot+b.side));
        exportToExcel(excelData, ['lane', 'machineNo','slot','side','matPn','remainQty'], currentLine?.groupName+'_'+dayjs().format('YYYYMMDD_HHmm'), false,false);
      }
    }
  };

  return (
    <>
      <Row style={{ padding: '0px 25px 20px' }} wrap={false}>
        <Col flex="1" style={{ textAlign: 'left', alignSelf: 'end' }}>
          <Space size="large">
            <Select
              value={groupId}
              style={{ width: 180, fontSize: 28, fontWeight: 'bold' }}
              onChange={(p) => {
                setGroupId(p);
              }}
              options={groups?.map((g) => ({ label: g.groupName, value: g.id }))}
            />
            <Text strong code italic style={{ fontSize: 20 }}>{`${currentTime.format(
              'MM-DD HH:mm:ss',
            )}`}</Text>
            <DownloadOutlined style={{ cursor: 'pointer' }} onClick={feederListExport}/>
          </Space>
        </Col>
        <Col flex="1" style={{ textAlign: 'center', alignSelf: 'center' }}>
          <Title level={2} style={{ margin: 0 }}>
            <FormattedMessage id="feeder.title" />
          </Title>
        </Col>
        <Col flex="1" style={{ textAlign: 'right', alignSelf: 'end' }}>
          <Space>
            <img
              src="/logo_main.png"
              width="160"
              style={{ margin: 0, cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
          </Space>
        </Col>
      </Row>
      <ProTable<API.ReplenishListItem>
        actionRef={actionRef}
        bordered
        className="TVBorder"
        columns={columns}
        polling={polling || undefined}
        request={async (params, sorter, filter) => {
          console.log(params, sorter, filter);
          if (!params.groupId) return {};
          try {
            const tmp = await getReplenishList(params);
            setTime(Date.now());
            setlastSuccessData(tmp);
            return tmp;
          } catch (e) {
            console.log('material.error', e);
            if (lastSuccessData) return lastSuccessData;
            return {};
          }
        }}
        params={{
          groupId: groupId,
        }}
        rowKey="id"
        // options={false}
        pagination={false}
        search={false}
        headerTitle={false}
        toolbar={{
          settings: [],
        }}
      />
    </>
  );
};
