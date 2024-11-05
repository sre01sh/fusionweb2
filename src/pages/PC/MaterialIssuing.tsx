import { getToListForWarehouse } from '@/services/api';
import {
  FormOutlined,
  SearchOutlined,
  SyncOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Button, Input, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { ToTraceDetailModal } from './components/ToTraceDetailModal';
import { CreateToTraceDetailModal } from './components/CreateToTraceDetailModal';
import Highlighter from 'react-highlight-words';
import type {API} from "@/services/typings";

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography.Title italic level={5} style={{ margin: 0, textAlign: 'center' }}>
    <FormattedMessage id={title} />
  </Typography.Title>
);

export default () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setCreateModalOpen] = useState(false);
  const [createModalRefresh, setCreateModalRefresh] = useState('c' + Date.now());
  const [currentRow, setCurrentRow] = useState<API.TOListItem>();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailModalRefresh, setDetailModalRefresh] = useState('d' + Date.now());

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

  const reloadPage = () => {
    setLoading(true);
    actionRef.current?.reload();
    setLoading(false);
  };

  const columns: ProColumns<API.TOListItem>[] = [
    {
      title: <TableTitle title="matIssuing.toNo" />,
      align: 'center',
      width: '12rem',
      dataIndex: 'toNo',
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search TO No.`}
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
        return (record.toNo || '')
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
        <>
          <Typography.Title level={5} style={{ margin: 0 }}>
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={_ ? _.toString() : ''}
            />
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="matIssuing.initqty" />,
      align: 'center',
      width: '8rem',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {record.init || 0}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="matIssuing.ppuqty" />,
      align: 'center',
      width: '8rem',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {record.ppu || 0}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="matIssuing.intransqty" />,
      align: 'center',
      width: '8rem',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {record.inTransit || 0}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="matIssuing.deliveredqty" />,
      align: 'center',
      width: '8rem',
      render: (_, record) => (
        <>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {record.delivered || 0}
          </Typography.Title>
        </>
      ),
    },
    {
      title: <TableTitle title="matIssuing.branch" />,
      align: 'center',
      width: '8rem',
      dataIndex: 'trBranch',
    },
    {
      title: <TableTitle title="matIssuing.cell" />,
      align: 'center',
      width: '8rem',
      dataIndex: 'trCell',
    },
    {
      title: <TableTitle title="matIssuing.floor" />,
      align: 'center',
      width: '8rem',
      dataIndex: 'trFloor',
    },
    {
      title: <TableTitle title="matIssuing.action" />,
      align: 'center',
      render: (_, record) => (
        <Space size={'large'}>
          <Button
            key="print"
            type="primary"
            shape="circle"
            icon={<FormOutlined />}
            title={intl.formatMessage({ id: 'matIssuing.printBtn' })}
            onClick={() => {
              setCurrentRow(record);
              setCreateModalOpen(true);
              setCreateModalRefresh('c' + Date.now());
            }}
          />
          <Button
            key="detail"
            type="primary"
            shape="circle"
            icon={<UnorderedListOutlined />}
            title={intl.formatMessage({ id: 'matIssuing.palletdetail' })}
            onClick={() => {
              setCurrentRow(record);
              setDetailModalOpen(true);
              setDetailModalRefresh('d' + Date.now());
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.TOListItem>
        actionRef={actionRef}
        rowKey="toNo"
        tableAlertRender={false}
        columns={columns}
        options={false}
        search={false}
        pagination={false}
        toolBarRender={() => {
          return [
            <Button
              key="reloadBtn"
              shape="round"
              icon={
                <SyncOutlined
                  onClick={() => {
                    setLoading(true);
                    actionRef.current?.reload();
                  }}
                  style={{ fontSize: 17 }}
                  spin={loading}
                  title={intl.formatMessage({ id: 'matIssuing.reloadBtn' })}
                />
              }
            />,
          ];
        }}
        params={{
          hourRange: 72,
        }}
        request={async (params, sorter, filter) => {
          console.log(params, sorter, filter);
          try {
            const toListRes = await getToListForWarehouse(params);
            setLoading(false);
            return toListRes;
          } catch (e) {
            console.log('MaterialIssuing.error', e);
            setLoading(false);
            return {};
          }
        }}
        headerTitle={
          <Typography.Title level={4} style={{ margin: 0 }}>
            <FormattedMessage id="matIssuing.title" />
          </Typography.Title>
        }
      />

      <CreateToTraceDetailModal
        visible={modalOpen}
        key={createModalRefresh}
        toListItem={currentRow}
        reloadMainPage={reloadPage}
      />

      <ToTraceDetailModal
        visible={detailModalOpen}
        key={detailModalRefresh}
        toListItem={currentRow}
        toNo={currentRow?.toNo ?? ''}
        reloadMainPage={reloadPage}
      />
    </>
  );
};
