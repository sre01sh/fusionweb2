import {Table} from 'antd';
import type {ColumnsType} from 'antd/lib/table';
import {FormattedMessage} from 'umi';
import '../../Welcome.less'

interface Props {
  matList: API.ShortageMatListItem[];
}

const columns: ColumnsType<API.ShortageMatListItem> = [
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
  }
];
const ShortageDetailModal: React.FC<Props> = (props) => {
  // 定义一个函数来根据条件返回类名
  const rowClassName = (record: API.ShortageMatListItem) => {
    // if (record.trQty > record.invQty) {
    //   return 'highlight-row';
    // }
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

export default ShortageDetailModal;
