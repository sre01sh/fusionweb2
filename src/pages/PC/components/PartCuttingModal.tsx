import * as React from 'react';
import {useState} from 'react';
import {Checkbox, message, Modal, Space} from 'antd';
import {FormattedMessage} from 'umi';
import type {ProColumns} from '@ant-design/pro-components';
import { ProTable} from '@ant-design/pro-components';
import {getSlotDataByOrderLane, postPartSlotDataByOrderLane} from '@/services/api';
import {useIntl} from "@@/plugin-locale/localeExports";
import type {API} from "@/services/typings";

export const PartCuttingModal: React.FC<{
  orderNo: string;
  programNo: string;
  pn: string;
  timestamp: number;
  requestor: string;
  cell: string;
  line: string;
  visible: boolean;
  setVisible: (v: boolean) => void;
  reloadMainPage: () => void;
}> = ({
        orderNo,
        programNo,
        pn,
        timestamp,
        requestor,
        cell,
        line,
        visible,
        setVisible,
        reloadMainPage
      }) => {
  const [dataSource, setDataSource] = useState<API.MatListPullItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<API.MatListPullItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const intl = useIntl();
  const handleOK = async () => {
    setLoading(true)
    try {
      const postData = {
        "orderNo": orderNo,
        "pn": pn,
        "programNo": programNo,
        "requestor": requestor,
        "slotData": selectedItems,
        "cell": cell,
        "line": line
      }
      await postPartSlotDataByOrderLane(postData);
      setLoading(false)
      message.success(intl.formatMessage({id: 'common.success'}));
      setVisible(false);
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
    console.log('postPartSlotDataByOrderLane:', selectedItems);
  };
  const handleCheckboxChange = (record: API.MatListPullItem, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, record]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== record));
    }
  };

  const columns: ProColumns<API.MatListPullItem>[] = [
    {
      title: <FormattedMessage id="oneclickOperation.slot"/>,
      dataIndex: 'title',
      align: 'center',
      editable: false,
      render: (_, record) => <>{record.machineNo + '-' + record.slot + '-' + record.side}</>,
    },
    {
      title: <FormattedMessage id="oneclickOperation.matPn"/>,
      dataIndex: 'matPn',
      align: 'center',
      editable: false,
    },
    {
      title: "选择",
      dataIndex: 'matQty',
      align: 'center',
      valueType: 'digit',
      width: 120,
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.includes(record)}
          onChange={e => handleCheckboxChange(record, e.target.checked)}
        />
      ),
    },
  ];

  return (
    <Modal
      title={<Space size={'large'}><FormattedMessage id="partOperation.partCutting"/> {` ${orderNo} # ${programNo} `}
      </Space>}
      centered
      width={600}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={handleOK}
      confirmLoading={loading}
    >
      <ProTable<API.MatListPullItem>
        params={{orderNo, programNo, timestamp}}
        request={async (params, sorter, filter) => {
          console.log("getSlotDataByOrderLane1:", params, sorter, filter);
          const tmp = await getSlotDataByOrderLane({orderNo, programNo});
          console.log('getSlotDataByOrderLane2:', tmp);
          setDataSource(tmp.data)
          return tmp.data;
        }}
        rowKey={(record) => record.slot + record.side}
        tableAlertRender={false}
        columns={columns}
        dataSource={dataSource}
        options={false}
        search={false}
        pagination={false}
      />
    </Modal>
  );
};
