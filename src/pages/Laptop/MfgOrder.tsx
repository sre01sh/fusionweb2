import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Select, Space, DatePicker, Typography, Progress, Tooltip, Tag, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { getAllCellResource, getMfgOrdersByResId } from '@/services/api';
import { useModel, history } from 'umi';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import FomulaTooltip from '../components/FomulaTooltip';

function intersection(arr1: string[], arr2: string[]) {
  return arr1.filter((element) => arr2.includes(element));
}

const statMapping = { shortage: 'orange', nostock: 'red', excess: 'blue', ok: 'green' };

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography.Title italic level={5} style={{ margin: 0, textAlign: 'center' }}>
    {title}
  </Typography.Title>
);

const handlePercent = (record: API.MfgOrderListItem) => {
  if (record.orderQty === 0) return 0;
  if (record.balanceQty <= 0) return 100;

  return Math.trunc(((record.orderQty - record.balanceQty) / record.orderQty) * 100);
};

const columns: ProColumns<API.MfgOrderListItem>[] = [
  {
    title: '',
    width: 20,
    className: 'mfgOrderStat',
    render: (_, record) => (
      <div style={{ backgroundColor: statMapping[record.stat], width: 15, height: 60 }}>&nbsp;</div>
    ),
    // render: (_, record) => (
    //   <Progress
    //     type="circle"
    //     width={50}
    //     percent={handlePercent(record)}
    //     strokeColor={{ '0%': statMapping[record.stat], '100%': statMapping[record.stat] }}
    //   />
    // ),
  },
  {
    title: <TableTitle title="Mfg Order" />,
    align: 'center',
    width: '12rem',
    dataIndex: 'orderNo',
    render: (_, record) => (
      <>
        {' '}
        <Typography.Title copyable level={5} style={{ margin: 0 }}>
          {_}
        </Typography.Title>
        <Progress
          // strokeColor={{ '0%': '#52C41A', '100%': '#52C41A' }}
          percent={handlePercent(record)}
          size="small"
          style={{ paddingLeft: 20, paddingRight: 5 }}
        />
      </>
    ),
  },
  {
    title: <TableTitle title="PN" />,
    align: 'center',
    dataIndex: 'pn',
    width: '12rem',
    render: (_, record) => (
      <Typography.Title copyable level={5} style={{ margin: 0 }}>
        {_}
      </Typography.Title>
    ),
  },
  {
    title: <TableTitle title="PN Description" />,
    align: 'center',
    dataIndex: 'pnDesc',
  },
  {
    title: <TableTitle title="Start Date" />,
    align: 'center',
    dataIndex: 'startDate',
    width: '10rem',
    valueType: 'date',
    render: (_, record) => (
      <Typography.Text strong style={{ margin: 0 }}>
        {_}
      </Typography.Text>
    ),
  },
  {
    title: <TableTitle title="Finish Date" />,
    align: 'center',
    dataIndex: 'finishDate',
    width: '10rem',
    valueType: 'date',
    render: (_, record) => (
      <Typography.Text strong style={{ margin: 0 }}>
        {_}
      </Typography.Text>
    ),
  },
  {
    title: <TableTitle title="Order Qty" />,
    align: 'center',
    width: '8rem',
    dataIndex: 'orderQty',
    render: (_, record) => (
      <Typography.Text strong style={{ margin: 0 }}>
        {_}
      </Typography.Text>
    ),
  },
  {
    title: <TableTitle title="Balance Qty" />,
    align: 'center',
    width: '8rem',
    dataIndex: 'balanceQty',
    render: (_, record) => (
      <Typography.Text strong style={{ margin: 0 }}>
        {_}
      </Typography.Text>
    ),
  },
];

const expandedRowRender = (mfgOrderListItem: API.MfgOrderListItem) => {
  return (
    <ProTable
      bordered
      columns={[
        {
          title: 'Components',
          dataIndex: 'id',
          align: 'center',
          width: '13rem',
          render: (_, record) => (
            <Space>
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: statMapping[record.stat],
                }}
              />
              <div style={{ width: '6rem', textAlign: 'right' }}>
                <Typography.Text copyable style={{ margin: 0 }}>
                  {_}
                </Typography.Text>
              </div>
            </Space>
          ),
        },
        { title: 'Components Description', dataIndex: 'desc', align: 'center' },
        { title: 'Action', dataIndex: 'action', align: 'center', width: '10rem' },
        {
          title: 'Quantity',
          className: 'minHeightLaptopCol',
          children: [
            {
              title: 'Required',
              dataIndex: 'reqQty',
              className: 'minHeightLaptopChildCol',
              align: 'center',
              width: '9rem',
            },
            {
              title: 'Assembly(810+008)',
              dataIndex: 'asmQty',
              className: 'minHeightLaptopChildCol',
              align: 'center',
              width: '9rem',
            },
            {
              title: 'TR',
              dataIndex: 'trQty',
              className: 'minHeightLaptopChildCol',
              align: 'center',
              width: '8rem',
            },
            {
              title: 'TO',
              dataIndex: 'toQty',
              className: 'minHeightLaptopChildCol',
              align: 'center',
              width: '8rem',
            },
          ],
        },
      ]}
      rowKey="id"
      headerTitle={false}
      search={false}
      options={false}
      dataSource={mfgOrderListItem.compInfos}
      pagination={false}
      size="small"
    />
  );
};

export default () => {
  const paramResId = history?.location?.query?.resId as string | undefined;
  const paramOrderNo = history?.location?.query?.orderNo as string | undefined;

  const [time, setTime] = useState(() => Date.now());
  const [polling] = useState<number | undefined>(60 * 1000);
  const sdInit: moment.Moment = paramResId ? moment() : moment().startOf('week');
  const edInit: moment.Moment = paramResId ? moment().add(3, 'days') : moment().endOf('week');
  const [sd, setSd] = useState<moment.Moment>(sdInit);
  const [ed, setEd] = useState<moment.Moment>(edInit);

  const { initialState } = useModel('@@initialState');

  const [cells, setCells] = useState<API.CellResource[]>([]);
  const [cell, setCell] = useState<API.CellResource>();
  const [resId, setResId] = useState<string>();

  const [expRows, setExpRows] = useState<string[]>([]);
  const [allOrderNo, setAllOrderNo] = useState<string[]>();

  //init basic cells with user's cell Ids
  useEffect(() => {
    const fetchCellData = async () => {
      const fetchedCells = await getAllCellResource();
      if (initialState?.currentUser?.cellIds) {
        const userCells = initialState?.currentUser?.cellIds;
        const sortedCells = fetchedCells.data.sort((a, b) => {
          const aIndex = userCells.indexOf(a.cellId);
          const bIndex = userCells.indexOf(b.cellId);
          if (aIndex === -1 && bIndex === -1) {
            return 0;
          } else if (aIndex === -1) {
            return 1;
          } else if (bIndex === -1) {
            return -1;
          } else {
            return aIndex - bIndex;
          }
        });
        setCells(sortedCells);
      } else {
        setCells(fetchedCells.data);
      }
    };
    if (initialState?.currentUser) fetchCellData();
  }, [initialState?.currentUser]);

  // setting the default value of selectors
  useEffect(() => {
    if (cells.length > 0) {
      setCell(cells[0]);
      setResId(cells[0]?.resources[0]?.id);
      if (paramResId) {
        const foundCell = cells.find((item) => {
          return item.resources.some((resource) => resource.id === paramResId);
        });
        if (foundCell) {
          setCell(foundCell);
          setResId(paramResId);
        } else {
          console.error('resource not found');
        }
      }
    }
  }, [cells]);

  const handleCellChange = (cell_id: string) => {
    const foundObj = cells.find((item) => item.cellId === cell_id);
    if (foundObj) {
      setCell(foundObj);
      setResId(foundObj?.resources[0]?.id);
    }
  };

  const handleResourceChange = (res_id: string) => {
    setResId(res_id);
  };

  const expandAllRows = () => {
    if (allOrderNo) setExpRows([...allOrderNo]);
  };

  const collapseAllRows = () => {
    setExpRows([]);
  };

  const handleDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      if (dates[0] !== null && dates[1] !== null) {
        setSd(dates[0]);
        setEd(dates[1]);
      }
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  return (
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      <Row style={{ paddingRight: '25px', backgroundColor: 'white' }} wrap={false}>
        <Col span={2}>&nbsp;</Col>
        <Col span={10} style={{ textAlign: 'center', alignSelf: 'end' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            MXS Material Processing Board
          </Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right', alignSelf: 'center' }}>
          <Space>
            <span>
              <Tag color="#F5222D" style={{ margin: 0, borderRadius: 0 }}>
                Inv&lt;50%
              </Tag>
              <Tag color="#FA8C16" style={{ margin: 0, borderRadius: 0 }}>
                50%&lt;Inv&lt;100%
              </Tag>
              <Tag color="#52C41A" style={{ margin: 0, borderRadius: 0 }}>
                100%&lt;Inv&lt;110%
              </Tag>
              <Tag color="#0000FF" style={{ margin: 0, borderRadius: 0 }}>
                Inv&gt;110%
              </Tag>
              &nbsp;
              <FomulaTooltip />
            </span>
            <Typography.Text strong italic code style={{ fontSize: 16 }}>{`Last updated：${dayjs(
              time,
            ).format('HH:mm:ss')}`}</Typography.Text>
          </Space>
        </Col>
      </Row>
      <Row style={{ padding: '15px 25px 10px', backgroundColor: 'white' }} wrap={false}>
        <Col flex="1">
          <Space size={'large'} wrap style={{ padding: '10px 0px' }}>
            <Select
              showSearch
              value={cell?.cellId}
              style={{ width: 150 }}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleCellChange}
              options={cells.map((c) => ({ label: c.cellName, value: c.cellId }))}
            />

            <Select
              showSearch
              value={resId}
              style={{ width: 338 }}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleResourceChange}
              options={cell?.resources?.map((res) => ({
                label: res.id + ' | ' + res.name,
                value: res.id,
              }))}
            />

            <Select
              defaultValue="lineleader"
              style={{ width: 120 }}
              options={[{ value: 'lineleader', label: 'Line leader' }]}
            />

            <DatePicker.RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Week': [moment().startOf('week'), moment().endOf('week')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              defaultValue={[sdInit, edInit]}
              onChange={handleDateRangeChange}
            />
          </Space>
        </Col>
      </Row>

      <ProTable<API.MfgOrderListItem>
        columns={columns}
        params={{
          resId: resId,
          startDate: sd.startOf('day').toISOString(),
          endDate: ed.endOf('day').toISOString(),
        }}
        request={async (params, sorter, filter) => {
          if (!params.resId) {
            return {};
          }
          console.log(params, sorter, filter);
          setTime(Date.now());
          try {
            const mfgOrders = await getMfgOrdersByResId(params);
            const extractAllOrderNos = mfgOrders.data.map((o) => o.orderNo);
            const intersecionExpRows = intersection(expRows, extractAllOrderNos); //remove invalid order numbers

            //for the redirect from TV page.  Put the order on the first line
            if (paramResId === params.resId && mfgOrders?.data?.length > 0) {
              const targetIndex = mfgOrders.data.findIndex((item) => item.orderNo === paramOrderNo);
              if (targetIndex !== -1) {
                const targetItem = mfgOrders.data.splice(targetIndex, 1)[0];
                mfgOrders.data.unshift(targetItem);
              }
              if (
                paramOrderNo &&
                !allOrderNo?.includes(paramOrderNo) &&
                !intersecionExpRows.includes(paramOrderNo)
              ) {
                intersecionExpRows.push(paramOrderNo);
              }
            }

            //refresh all order data & expanded rows
            setAllOrderNo(extractAllOrderNos);
            setExpRows(intersecionExpRows);

            return mfgOrders;
          } catch (e) {
            console.log('MfgOrder.error', e);
            return {};
          }
        }}
        polling={polling || undefined}
        rowKey="orderNo"
        headerTitle={false}
        options={false}
        search={false}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          columnTitle: (
            <Space>
              <Tooltip title="Collapse all rows">
                <UpOutlined onClick={collapseAllRows} />
              </Tooltip>
              <Tooltip title="Expand all rows">
                <DownOutlined onClick={expandAllRows} />
              </Tooltip>
            </Space>
          ),
          expandedRowKeys: expRows,
          onExpand: (expanded, record) => {
            if (expanded) {
              if (!expRows.includes(record.orderNo)) {
                expRows.push(record.orderNo);
                setExpRows(expRows);
              }
            } else {
              const indexToDelete = expRows.indexOf(record.orderNo);
              if (indexToDelete !== -1) {
                expRows.splice(indexToDelete, 1);
              }
              setExpRows(expRows);
            }
          },
        }}
        pagination={false}
      />
    </PageContainer>
  );
};
