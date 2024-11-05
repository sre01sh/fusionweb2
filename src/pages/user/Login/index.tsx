import Footer from '@/components/Footer';
import { login } from '@/services/api';
import { HomeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';
import { DefaultFooter } from '@ant-design/pro-components';

const errorHandler = function (error: any) {
  console.log(error.response);
  if (error.response) {
    if (error.response.success === false) return error.response;
  }
  console.log('login page throw error');
  throw error;
};

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // Login API call
      console.log('login page submit entry');
      console.log('login page submit -> login auth');
      const result = await login({ ...values }, { errorHandler });
      console.log("111111",values)
      if (result.success) {
        localStorage.setItem('token', `${result.id_token}`);
        console.log('login page submit -> query currentUser');

        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
          await setInitialState((s) => {
            console.log('login page submit -> setInitialState()');
            return {
              ...s,
              currentUser: userInfo,
            };
          });
        }

        /** This method will jump to the location of the redirect parameter */
        if (!history) return;
        const { query } = history.location;
        const { redirect, ...restParams } = query;
        console.log(`redirect= ${redirect} restParams=`, restParams);
        // history.push(redirect || '/');
        history.push({
          pathname: redirect || '/',
          query: restParams || {},
        });

        if (userInfo)
          message.success(
            intl.formatMessage({ id: 'pages.login.success', defaultMessage: 'Login success!' }),
          );

        console.log('login page submit -> login & query currentUser done ');
        return;
      }
      console.log('login page submit -> setUserLoginState: ' + result.success);
      setUserLoginState(result);
    } catch (error: any) {
      console.log('login page submit error', error);
      const loginFailureMsg = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(loginFailureMsg);
    }
    console.log('login page submit exit');
  };

  const { success } = userLoginState;
  console.log('login page loading');
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        <HomeOutlined
          style={{ top: '2px', position: 'relative' }}
          onClick={() => history.push('/')}
        />
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          // logo={<img alt="logo" src="/logo_main.png" />}
          // title="creating connections for life"
          // subTitle={intl.formatMessage({ id: 'creating connections for life' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {success === false && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: 'Incorrect username/password',
              })}
            />
          )}

          <>
            <img
              src="/logo_main.png"
              alt="logo"
              width="330"
              style={{ marginBottom: 24, marginTop: 100, cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
            <p />
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Username',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please input your username!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please input your password!"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
      {/* <div className={styles.homepagefoot}>
        <p>&copy; {new Date().getFullYear()} Molex® Digital Manufacturing & Global Operations Capability</p>
      </div> */}
      <Footer />
    </div>
  );
};

export default Login;
