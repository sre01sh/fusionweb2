import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Col, Input, InputRef, Modal, Row, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import { getOrderChangeOverList, getCells, changeOverOrderPrep } from '@/services/api';
import styles from './Material.less';
import { FormattedMessage, history, useModel } from 'umi';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const statMapping: Record<string, string> = {
  Partial: '生产中',
  Prepared: '已备料',
  Inprep: '备料中',
  Pending: '待捡料',
  Plan: '计划',
};

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

  const [parts, setParts] = useState(['SMT', 'PCBA']);
  const [part, setPart] = useState<string | undefined>();
  useEffect(() => {
    const fetchCellData = async () => {
      const cells = await getCells();
      setParts(cells.data);
      setPart(cells.data?.[0]);
    };
    fetchCellData();
  }, []);

  const [lastSuccessData, setlastSuccessData] = useState<{ data: API.OrderChangeOverListItem[] }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBtnLoading, setModalBtnLoading] = useState(false);
  const [orderNo4Modal, setOrderNo4Modal] = useState('');
  const [isPrepare, setIsPrepare] = useState(true);

  const showModal = (recorder: API.OrderChangeOverListItem) => {
    if (recorder.status === 'Plan') {
      setOrderNo4Modal(recorder.orderNo);
      setIsModalOpen(true);
    }
  };

  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.userid ?? '';
  const handleOk = async () => {
    setModalBtnLoading(true);
    try {
      await changeOverOrderPrep({ orderNo: orderNo4Modal,isPrepare, requestor: currentUserId, cell: part });
    } catch (e) {
      console.log(e);
    }
    setModalBtnLoading(false);
    setIsModalOpen(false);
    setIsPrepare(true);
    if (actionRef.current) actionRef.current.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    setSearchText(selectedKeys[0]);
    confirm();
  };

  const handleReset = (clearFilters: () => void, confirm: () => void) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const columns: ProColumns<API.OrderChangeOverListItem>[] = [
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.line" />
        </Title>
      ),
      dataIndex: 'line',
      align: 'center',
      width: '17rem',
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            value={`${selectedKeys[0] || ''}`}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
            style={{ marginBottom: 6, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              &nbsp; <FormattedMessage id="common.search" />
            </Button>
            <Button
              type="link"
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{ width: 90 }}
            >
              <b>
                <FormattedMessage id="common.reset" />
              </b>
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        return (record.line || '')
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (_) => (
        <Title level={2} className={styles.bodyCell}>
          {_}
        </Title>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.orderno" />
        </Title>
      ),
      dataIndex: 'orderNo',
      align: 'center',
      width: '17rem',
      render: (_, recorder) => (
        <Space
          onClick={() => showModal(recorder)}
          style={recorder.status === 'Plan' ? { cursor: 'pointer' } : { cursor: 'auto' }}
        >
          <Title level={4} className={styles.bodyCell} underline={recorder.status === 'Plan'}>
            {_}
          </Title>
        </Space>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.pn" />
        </Title>
      ),
      dataIndex: 'pn',
      align: 'center',
      width: '17rem',
      render: (_) => (
        <Title level={4} className={styles.bodyCell}>
          {_}
        </Title>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.orderQty" />
        </Title>
      ),
      dataIndex: 'orderQty',
      align: 'center',
      width: '17rem',
      valueType: 'digit',
      render: (_) => (
        <Title level={4} className={styles.bodyCell}>
          {_}
        </Title>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.startDate" />
        </Title>
      ),
      dataIndex: 'startDate',
      align: 'center',
      valueType: 'dateTime',
      width: '22rem',
      render: (_) => (
        <Title level={4} className={styles.bodyCell}>
          {_}
        </Title>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.endDate" />
        </Title>
      ),
      dataIndex: 'endDate',
      align: 'center',
      valueType: 'dateTime',
      width: '22rem',
      render: (_) => (
        <Title level={4} className={styles.bodyCell}>
          {_}
        </Title>
      ),
    },
    {
      title: (
        <Title level={3} italic style={{ margin: 0 }}>
          <FormattedMessage id="changeover.status" />
        </Title>
      ),
      dataIndex: 'status',
      align: 'center',
      width: '17rem',
      render: (_, recorder) => (
        <Title level={4} className={styles.bodyCell}>
          {statMapping[recorder.status]}
        </Title>
      ),
    },
  ];

  const toggleChecked = () => {
    setIsPrepare(!isPrepare);
  };

  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={modalBtnLoading}
      >
        <Space>
        <b>开始给工单 ({orderNo4Modal}) 备料 ？</b>
        <span><Checkbox onClick={toggleChecked}  checked={isPrepare} >是否备料</Checkbox></span>
        </Space>

      </Modal>

      <Row style={{ padding: '0px 25px 20px' }} wrap={false}>
        <Col flex="1" style={{ textAlign: 'left', alignSelf: 'end' }}>
          <Space size="large">
            <Select
              value={part}
              style={{ width: 150, fontSize: 28, fontWeight: 'bold' }}
              onChange={(p) => setPart(p)}
              options={parts?.map((p) => ({ label: p, value: p }))}
            />
            <Text strong code italic style={{ fontSize: 20 }}>{`${currentTime.format(
              'MM-DD HH:mm:ss',
            )}`}</Text>
          </Space>
        </Col>
        <Col flex="1" style={{ textAlign: 'center', alignSelf: 'center' }}>
          <Title level={2} style={{ margin: 0 }}>
            <FormattedMessage id="changeover.title" />
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
      <ProTable<API.OrderChangeOverListItem>
        actionRef={actionRef}
        bordered
        className="TVBorder"
        columns={columns}
        polling={polling || undefined}
        request={async (params, sorter, filter) => {
          console.log(params, sorter, filter);
          try {
            const tmp = await getOrderChangeOverList(params);
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
          cell: part ? part : 'PCBA',
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
