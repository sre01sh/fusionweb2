import React from 'react';
import { Typography } from 'antd';
import QRCode from 'qrcode.react';

const PrintContent: React.FC<{
  currentTo: API.TOListItem | undefined;
  details: API.ToTraceDetailListItem[] | undefined;
}> = ({ currentTo, details }) => {
  if (!currentTo || !details) {
    return null;
  }
  const printContent = Array.from({ length: details.length }, (_, index) => (
    <div
      key={index}
      style={{ display: 'block', pageBreakAfter: 'always', marginLeft: 10, marginRight: 10 }}
    >
      <div>&nbsp;</div>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <Typography.Title level={4}>
          TO号： {currentTo.toNo} &nbsp;{details[index].isUrgent === 'Y' ? '紧急!' : '普通'}
        </Typography.Title>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex', margin: 10 }}>
        <QRCode value={details[index].palletId} size={150} style={{ margin: 0 }} />
      </div>
      <div>
        <Typography.Title level={5}>
          发往: {currentTo.trBranch} / {currentTo.trCell} &nbsp; {currentTo.trFloor}
        </Typography.Title>
      </div>
      <div>
        <Typography.Title level={5}>收件人： {currentTo.trUserName} </Typography.Title>
      </div>
      <div>
        <Typography.Title level={5}>分机号： &nbsp;{currentTo.trUserExt}</Typography.Title>
      </div>
      <div>
        <Typography.Title level={5}>寄自: &nbsp; DG3 外仓</Typography.Title>
      </div>
      <div>
        <Typography.Title level={5}>寄件人： {currentTo.toUserName} </Typography.Title>
      </div>
      <div>
        <Typography.Title level={5}>分机号： &nbsp;{currentTo.toUserExt}</Typography.Title>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex', marginTop: 1 }}>
        <b>{details[index].palletId}</b>
      </div>
    </div>
  ));
  return <>{printContent}</>;
};

export default PrintContent;
