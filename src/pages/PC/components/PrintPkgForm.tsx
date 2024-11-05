import { Button, Typography } from 'antd';
import QRCode from 'qrcode.react';
import * as React from 'react';
import ReactToPrint from 'react-to-print';
import { FormattedMessage } from 'umi';

export const PrintPkgForm: React.FC<{ data: API.TOListItem }> = ({ data }) => {
  const componentRef = React.useRef(null);

  const handleBeforePrint = React.useCallback(() => {
    console.log('`onBeforePrint` called');
  }, []);

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called');
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <Button type="primary">
        <FormattedMessage id="matIssuing.printBtn" />
      </Button>
    );
  }, []);

  const divs = Array.from({ length: data.palletQty }, (_, index) => (
    <div key={index} style={{  display: 'block', pageBreakAfter: 'always',marginLeft:10, marginRight:10 }}>
     <div >
           &nbsp; 
          </div>
         <div style={{ justifyContent: 'center', display: 'flex' }}>
         <Typography.Title level={4}>TO号： {data.toNo} &nbsp; {data.urgent === 'Y' ? '紧急!' : '普通'}</Typography.Title>
          </div>
          <div style={{ justifyContent: 'center', display: 'flex' , margin: 10 }}>
            <QRCode value={`${data.toNo}-${index + 1}`} size={150} style={{ margin: 0 }} />
          </div>
          <div >
          <Typography.Title level={5}>发往:   {data.trBranch} / {data.trCell}  &nbsp;  {data.trFloor}</Typography.Title>
          </div>
          <div>
          <Typography.Title level={5}>收件人：  {data.trUserName}  </Typography.Title>
          </div>
          <div>
          <Typography.Title level={5}>分机号：    &nbsp;{data.trUserExt}</Typography.Title>
          </div>
          <div>
          <Typography.Title level={5}>寄自: &nbsp; DG3 外仓</Typography.Title>
          </div>
          <div>
          <Typography.Title level={5}>寄件人：  {data.toUserName}  </Typography.Title>
          </div>
          <div>
          <Typography.Title level={5}>分机号：    &nbsp;{data.toUserExt}</Typography.Title>
          </div>
          <div style={{ justifyContent: 'center', display: 'flex' , marginTop: 1}}>
            <b>{index + 1} / {data.palletQty}</b>
          </div> 
    </div>
  ));

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle={data.toNo}
        onAfterPrint={handleAfterPrint}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>{divs}</div>
      </div>
    </>
  );
};
