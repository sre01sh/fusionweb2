import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import { getAllTraceHistory, getProductSubItems } from '@/services/api';
import type { API } from '@/services/typings';
import type { TableColumnsType } from 'antd';
import {
  Affix,
  Button,
  Drawer,
  Empty,
  Input,
  Space,
  Spin,
  Table,
  Timeline,
  Typography,
} from 'antd';
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  SwapOutlined,
  ToolFilled,
} from '@ant-design/icons';
import { tw } from 'twind';
import dayjs from 'dayjs';

const statusColorMap = new Map([
  ['PASS', 'green'],
  ['SUSP', 'burlywood'],
  ['SCRAP', 'red'],
]);

      
const columns: TableColumnsType<API.ProductSubItem> = [
  { title: '',key: "index", align: 'center', render: (_, record, index) => <Typography.Text code>{index+1}</Typography.Text>,},
  { title: 'PanelSn', dataIndex: 'panelSn', align: 'center' },
  { title: 'PcbSn', dataIndex: 'pcbSn', align: 'center' },
  { title: 'Result', dataIndex: 'inspResult', align: 'center', width: 30 },
  { title: 'Type', dataIndex: 'boardType', align: 'center', width: 30 },
  { title: 'Index', dataIndex: 'boardIndex', align: 'center', width: 30 },
  { title: 'CreateUser', dataIndex: 'createUser', align: 'center' },
  {
    title: 'CreateTimestamp',
    dataIndex: 'createTimestamp',
    align: 'center',
    render: (record) => dayjs(record).format('YYYY-MM-DD HH:mm:ss'),
  },
  { title: 'UpdateUser', dataIndex: 'updateUser', align: 'center' },
  {
    title: 'UpdateTimestamp',
    dataIndex: 'updateTimestamp',
    align: 'center',
    render: (record) => dayjs(record).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export default () => {
  const [loading, setLoading] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [sn, setSn] = useState('');
  const [reverse, setReverse] = useState(false);
  const [productSubItem, setProductSubItem] = useState<{
    productNo: string;
    subItemQty: number;
    subItems: API.ProductSubItem[];
  }>();

  const handleReverseClick = () => {
    setReverse(!reverse);
  };

  const openModalForSubItems = async () => {
    if (sn) {
      try {
        setDrawerLoading(true);
        setOpen(true);
        const psi = await getProductSubItems({ sn });
        setProductSubItem(psi?.data);
      } catch (e) {
        console.error(e);
      } finally {
        setDrawerLoading(false);
      }
    }
  };

  const [list, setList] = useState<API.ProductTraceHistory[]>([]);
  const fetchAllTraceHistory = async () => {
    if (sn) {
      try {
        setLoading(true);
        const l = await getAllTraceHistory({ sn });
        setList(l.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <ProCard
          title={
            <Affix offsetTop={20}>
              <Space direction="vertical">
                <Input
                  size="small"
                  style={{ width: '12rem' }}
                  value={sn}
                  onChange={(e) => setSn(e.target.value)}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      fetchAllTraceHistory();
                    }
                  }}
                  addonAfter={<SearchOutlined onClick={fetchAllTraceHistory} />}
                  placeholder="Please input sn"
                />
              </Space>
            </Affix>
          }
          extra={
            <Affix offsetTop={20}>
              <Space>
                {list[0]?.moveMode == 'ARRAY' ? (
                  <Button
                    shape="circle"
                    size="small"
                    icon={<AppstoreOutlined />}
                    onClick={openModalForSubItems}
                  />
                ) : (
                  ''
                )}

                <Button
                  shape="circle"
                  size="small"
                  icon={<SwapOutlined rotate={90} />}
                  onClick={handleReverseClick}
                />
              </Space>
            </Affix>
          }
          style={{ minHeight: '80vh' }}
          split={'horizontal'}
          bordered
          headerBordered={false}
        >
          <ProCard>
            {list && list.length > 0 ? (
              <Timeline mode="alternate" reverse={reverse}>
                {list.map((item, index) => (
                  <Timeline.Item
                    color={statusColorMap.get(item.qcStat) || 'gray'}
                    key={index}
                    position={item.opStat === 'MOVEIN' ? 'right' : 'left'}
                    dot={item.opNodeType === 'REWORK' ? <ToolFilled /> : ''}
                  >
                    <div
                      className={tw(
                        item.opStat === 'MOVEIN'
                          ? 'absolute text-xs italic right-0 -top-6 px-2 py-1'
                          : 'absolute text-xs italic left-0 -top-6 px-2 py-1',
                      )}
                    >
                      <Typography.Text type="secondary">
                        {item.resName === item.createUser
                          ? item.resName
                          : item.resName + '<=' + item.createUser}
                      </Typography.Text>
                    </div>

                    <Space align="baseline">
                      {item.opStat == 'MOVEIN' ? (
                        <div className={tw('text-xs italic')}>
                          {new Date(item.createTimestamp).toLocaleString()}
                        </div>
                      ) : (
                        ''
                      )}

                      <Typography.Text keyboard strong className={tw('text-xl px-1 py-1')}>
                        <Space>
                          {item.opStat == 'MOVEIN' ? <ArrowRightOutlined /> : ''}
                          <span>
                            {item.opNodeName} [{item.opNodeId}]
                          </span>
                          {item.opStat == 'MOVEOUT' ? <ArrowRightOutlined /> : ''}
                        </Space>
                      </Typography.Text>

                      {item.opStat == 'MOVEOUT' ? (
                        <div className={tw('text-xs italic ')}>
                          {new Date(item.createTimestamp).toLocaleString()}
                        </div>
                      ) : (
                        ''
                      )}
                    </Space>
                  </Timeline.Item>
                ))}

                <Timeline.Item color="blue" key={'o' + list[0]?.orderNo} position="left">
                  <Typography.Text keyboard strong className={tw('text-lg px-1 py-1')}>
                    {' '}
                    Order start: {list[0]?.orderNo} [{list[0]?.productNo}]
                  </Typography.Text>
                </Timeline.Item>
              </Timeline>
            ) : (
              <div className={tw('flex items-center justify-center h-[60vh] ')}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </ProCard>
        </ProCard>
        <Drawer
          title={``}
          placement="bottom"
          onClose={() => setOpen(false)}
          open={open}
          size="large"
        > 
          <Space className={tw('text-lg px-5 pb-5')} >
           <Typography.Text keyboard>ProductNo: {productSubItem?.productNo}</Typography.Text>
           <Typography.Text keyboard>ArrayQty: {(productSubItem?.subItemQty)==0?'--':productSubItem?.subItemQty}</Typography.Text>

          </Space>
          <Table<API.ProductSubItem>
            rowKey="id"
            className={tw('px-5')}
            pagination={false}
            loading={drawerLoading}
            columns={columns}
            dataSource={productSubItem?.subItems}
          />
        </Drawer>
      </Spin>
    </>
  );
};
