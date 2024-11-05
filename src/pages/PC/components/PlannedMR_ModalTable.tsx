import {Table} from 'antd';
import type {ColumnsType} from 'antd/lib/table';
import {FormattedMessage} from 'umi';
import type {API} from "@/services/typings";

interface Props {
  matList: API.MatListItem[];
}

const columns: ColumnsType<API.MatListItem> = [
  {
    title: <FormattedMessage id="plannedMR.modaltable.matpn"/>,
    dataIndex: 'matPn',
    align: 'center',
  },
  {
    title: <FormattedMessage id="plannedMR.modaltable.matdesc"/>,
    dataIndex: 'matDesc',
    align: 'center',
  },
  {
    title: <FormattedMessage id="plannedMR.modaltable.sapqty"/>,
    dataIndex: 'invQty',
    align: 'center',
  },
  {
    title: <FormattedMessage id="plannedMR.modaltable.reqqty"/>,
    dataIndex: 'reqQty',
    align: 'center',
  },
  {
    title: <FormattedMessage id="plannedMR.modaltable.trqty"/>,
    dataIndex: 'trQty',
    align: 'center',
  },
];

// export default (props) => {
//   return <Table columns={columns} dataSource={props.matList} rowKey="matPn"/>;
// };
const PlannedMR_ModalTable: React.FC<Props> = (props) => {
  // 定义一个函数来根据条件返回类名
  const rowClassName = (record: API.MatListItem) => {
    if (record.isShortage) {
      return 'highlight-row';
    }
    return '';
  };

  return (
    <Table
      columns={columns}
      dataSource={props.matList}
      rowKey="matPn"
      rowClassName={rowClassName} // 应用自定义的rowClassName
    />
  );
};

export default PlannedMR_ModalTable;
