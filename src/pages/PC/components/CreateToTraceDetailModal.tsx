import { createToTraceDetail } from '@/services/api';
import { InfoCircleFilled } from '@ant-design/icons';
import { Checkbox, InputNumber, Modal, Select, Space } from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'umi';
import PrintContent from './PrintContent';
import { useReactToPrint } from 'react-to-print';

export const CreateToTraceDetailModal: React.FC<{
  toListItem: API.TOListItem | undefined;
  visible: boolean;
  reloadMainPage: () => void;
}> = ({ toListItem, visible, reloadMainPage }) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(visible);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [urgent, setUrgent] = React.useState<string>('N');
  const [palletQty, setPalletQty] = React.useState<number>(1);
  const [ppuChecked, setPpuChecked] = React.useState(true);
  const ppuChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
    setPpuChecked(e.target.checked);
  };
  const [printPalletDetails, setPrintPalletDetails] = React.useState<API.ToTraceDetailListItem[]>(
    [],
  );

  const isFirstRender = React.useRef(true);
  const printComponentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => {
      setModalVisible(false);
      reloadMainPage();
    },
  });

  const handleOK = async () => {
    if (!toListItem) return;
    setLoading(true);
    try {
      const { data: palletDetails } = await createToTraceDetail({
        ...toListItem,
        urgent,
        palletQty,
        ppuChecked,
      });
      setPrintPalletDetails(palletDetails);
    } catch (e) {
      console.log('MaterialIssuing.error createToTraceDetail', e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handlePrint();
  }, [printPalletDetails]);

  return (
    <Modal
      title={
        <>
          <InfoCircleFilled style={{ color: '#1890ff' }} />
          &nbsp;&nbsp;生成运输单并打印托盘标签
        </>
      }
      centered
      width={560}
      confirmLoading={loading}
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={() => handleOK()}
    >
      <Space size={'large'}>
        <Space>
          <b>
            <FormattedMessage id={'matIssuing.urgent'} />: &nbsp;
          </b>
          <Select
            defaultValue={urgent}
            style={{ width: 100 }}
            onChange={(u) => setUrgent(u)}
            options={[
              { label: <FormattedMessage id={'common.no'} />, value: 'N' },
              { label: <FormattedMessage id={'common.yes'} />, value: 'Y' },
            ]}
          />
        </Space>
        <Space>
          <b>
            <FormattedMessage id={'matIssuing.palletQty'} />: &nbsp;
          </b>
          <InputNumber
            min={1}
            defaultValue={palletQty}
            style={{ width: 100 }}
            onChange={(value) => setPalletQty(value ?? 1)}
          />
        </Space>
        <Space>
          <Checkbox onChange={ppuChange} defaultChecked>
            直接发料
          </Checkbox>
        </Space>
      </Space>
      <div style={{ display: 'none' }}>
        <div ref={printComponentRef}>
          <PrintContent currentTo={toListItem} details={printPalletDetails} />
        </div>
      </div>
    </Modal>
  );
};
