import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default ({ placement = 'top' }) => {
  return (
    <Tooltip
      placement={placement}
      key="fomula"
      overlayStyle={{ maxWidth: 'none' }}
      overlayInnerStyle={{ padding: '10px 12px 1px 12px' }}
      title={
        <p
          dangerouslySetInnerHTML={{
            __html:
              ' &fnof; = Assy 810 + 008 <br /> Inv = &fnof; / Required ( if TR not requested ) <br /> Inv = &fnof; / TR ( if TR requested ) <br /> TR = 1.5 days inventory (date of request)  ',
          }}
        />
      }
    >
      <InfoCircleOutlined />
    </Tooltip>
  );
};
