import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Badge, Col, Row, Space, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getCellMatStatList } from '@/services/api';
import styles from './Material.less';
import CountUp from 'react-countup';
import { FullscreenOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import FomulaTooltip from '../components/FomulaTooltip';
import CustomAnimate from './components/CustomAnimate';

const { Title, Text } = Typography;
const statMapping = { shortage: 'orange', nostock: 'red', excess: 'blue', ok: 'green' };

const enterFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    try {
      document.documentElement.requestFullscreen();
    } catch (e) {
      console.log(e);
    }
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen && document.fullscreenElement) {
    try {
      document.exitFullscreen();
    } catch (e) {
      console.log(e);
    }
  }
};

const TableNumTitle: React.FC<{ color: string; title: string }> = ({ color, title }) => (
  <Tag color={color} className={styles.titleTag}>
    <Title level={5} style={{ color: color }}>
      <b>{title}</b>
    </Title>
  </Tag>
);

const TableNumContent: React.FC<{ color: string; value: number; animate?: boolean }> = ({
  color,
  value,
  animate = true,
}) => {
  if (value === 0) return <></>;
  else
    return (
      <CustomAnimate enable={animate}>
        <Title level={1} className={styles.showNumber}>
          <CountUp end={value} separator="" style={{ color: color }} />
        </Title>
      </CustomAnimate>
    );
};

type TableOrderContentProps = {
  order: API.OrderResStatListItem | undefined;
};
const TableOrderContent: React.FC<TableOrderContentProps> = ({ order }) => {
  if (order) {
    if (order.resources && order.resources.length > 0) {
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: -12, right: -12, zIndex: 9 }}>
            <Tag
              color="#3b5999"
              style={{
                padding: 2,
                lineHeight: 1,
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
                fontSize: 14,
              }}
            >
              <i>{order.orderNo}</i>
            </Tag>
          </div>
          <Space size={'large'} wrap>
            {order.resources?.map((res: API.ResourceStat) => (
              <Tooltip
                key={res.id}
                title={
                  <div>
                    <div>{res.id}</div>
                    <div>{res.name}</div>
                  </div>
                }
              >
                <Badge
                  key={res.id}
                  color={statMapping[res.stat]}
                  count={res.count}
                  overflowCount={999999}
                >
                  <Tag
                    color={statMapping[res.stat]}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      history.push({
                        pathname: '/MfgOrder',
                        query: {
                          orderNo: order.orderNo,
                          resId: res.id,
                        },
                      })
                    }
                  >
                    <div style={{ fontSize: 16 }}>
                      <div
                        style={{
                          width: '6em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {res.id}
                      </div>
                      <div
                        style={{
                          width: '6em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {res.name}
                      </div>
                    </div>
                  </Tag>
                </Badge>
              </Tooltip>
            ))}
          </Space>
        </div>
      );
    }
  }
  return null;
};

const columns: ProColumns<API.CellMatStatListItem>[] = [
  {
    title: (
      <Title level={3} italic style={{ margin: 0 }}>
        Cell
      </Title>
    ),
    dataIndex: 'cellId',
    align: 'center',
    width: '17rem',
    render: (_) => (
      <Title level={2} className={styles.bodyCell} keyboard>
        {_}
      </Title>
    ),
  },

  {
    title: (
      <Space>
        <Title level={4} italic style={{ margin: 0 }}>
          No. of Active Mfg. Order by Resource Up To Tomorrow
        </Title>
        <FomulaTooltip placement="right" />
      </Space>
    ),
    align: 'center',
    className: 'minHeightTVCol',
    children: [
      {
        title: <TableNumTitle color="red" title="Inv < 50%" />,
        align: 'center',
        dataIndex: 'nostock',
        className: 'redTVCol',
        width: '8rem',
        render: (_, record) => <TableNumContent color="red" value={record.nostock} />,
      },
      {
        title: <TableNumTitle color="orange" title="50% < Inv < 100%" />,
        // title: <Title level={4} style={{ margin: 0 }} >Shortage</Title>,
        align: 'center',
        dataIndex: 'shortage',
        className: 'orangeTVCol',
        width: '8rem',
        render: (_, record) => (
          <TableNumContent color="orange" value={record.shortage} animate={false} />
        ),
      },
      {
        title: <TableNumTitle color="blue" title="Inv > 110%" />,
        // title: <Title level={4} style={{ margin: 0 }} >Excess</Title>,
        align: 'center',
        dataIndex: 'excess',
        className: 'blueTVCol',
        width: '8rem',
        render: (_, record) => (
          <TableNumContent color="blue" value={record.excess} animate={false} />
        ),
      },
    ],
  },
  {
    title: (
      <Title italic level={4} style={{ margin: 0 }}>
        Resource ID & Description / Shortages Qty / Mfg Order Number
      </Title>
    ),
    align: 'center',
    dataIndex: 'orders',
    colSpan: 3,
    render: (_, record) => (
      <TableOrderContent order={record.orders?.length > 0 ? record.orders[0] : undefined} />
    ),
  },
  {
    align: 'center',
    dataIndex: 'orders',
    colSpan: 0,
    render: (_, record) => (
      <TableOrderContent order={record.orders?.length > 1 ? record.orders[1] : undefined} />
    ),
  },
  {
    align: 'center',
    dataIndex: 'orders',
    colSpan: 0,
    render: (_, record) => (
      <TableOrderContent order={record.orders?.length > 2 ? record.orders[2] : undefined} />
    ),
  },
];

export default () => {
  const [time, setTime] = useState(() => Date.now());
  const [polling, setPolling] = useState<number | undefined>(60 * 1000);
  const [lastSuccessData, setlastSuccessData] = useState<{ data: API.CellMatStatListItem[] }>();

  return (
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      <Row style={{ padding: '0px 25px 20px' }} wrap={false}>
        <Col flex="1" style={{ textAlign: 'left', alignSelf: 'end' }}>
          <img
            src="/LogoTagline.svg"
            width="440"
            style={{ margin: 0, cursor: 'pointer' }}
            onClick={() => history.push('/')}
          />
        </Col>
        <Col flex="1" style={{ textAlign: 'center', alignSelf: 'center' }}>
          <Title level={2} style={{ margin: 0 }}>
            MXS Material Status Board
          </Title>
        </Col>
        <Col flex="1" style={{ textAlign: 'right', alignSelf: 'end' }}>
          <Space>
            <Tooltip title="Enter full screen">
              <FullscreenOutlined onClick={enterFullscreen} />
            </Tooltip>
            <Tooltip title="User guide">
              <InfoCircleOutlined />
            </Tooltip>
            <Text strong code italic style={{ fontSize: 18 }}>{`Last updated：${dayjs(time).format(
              'HH:mm:ss',
            )}`}</Text>
          </Space>
        </Col>
      </Row>
      <ProTable<API.CellMatStatListItem>
        bordered
        className="TVBorder"
        columns={columns}
        polling={polling || undefined}
        request={async (params, sorter, filter) => {
          // console.log(params, sorter, filter);
          try {
            const tmp = await getCellMatStatList(params);
            setTime(Date.now());
            setlastSuccessData(tmp);
            return tmp;
          } catch (e) {
            console.log('material.error', e);
            if (lastSuccessData) return lastSuccessData;
            return {};
          }
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
    </PageContainer>
  );
};
