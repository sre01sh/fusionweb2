import RightContent from '@/components/RightContent';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading} from '@ant-design/pro-components';
import type {RequestConfig, RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser} from './services/api';
import {message, notification, Tag} from 'antd';
import {fetchEventSource} from '@microsoft/fetch-event-source';

// const isDev = process.env.NODE_ENV === 'development';
console.log('current env is', REACT_APP_ENV);

const envTags: Record<string, { color: string; envName: string }> = {
  dev: { color: '#87d068', envName: 'DEV' },
  qa: { color: '#108ee9', envName: 'QA' },
};

const codeMessage: Record<number, string> = {
  200: 'Request successful, server returned requested data.',
  201: 'Request successful, new data created or modified.',
  202: 'Request accepted, processing pending.',
  204: 'Request successful, requested data deleted.',
  400: 'Bad request, invalid syntax or client-side error.',
  401: 'Unauthorized, client must authenticate.',
  403: 'Forbidden, client lacks access rights.',
  404: 'Not Found, requested resource not found.',
  406: 'Not Acceptable, requested resource cannot be generated as per Accept headers.',
  410: 'Gone, requested resource no longer available.',
  422: 'Unprocessable Entity, server unable to process request entity.',
  // 500: 'Internal Server Error, unexpected condition encountered.',
  502: 'Bad Gateway, invalid response received from upstream server.',
  503: 'Service Unavailable, server unable to handle request due to overloading or maintenance.',
  504: 'Gateway Timeout, no timely response from upstream server.',
};

const envTag = envTags[String(REACT_APP_ENV)];

const handleErrorMessage = function (error: any) {
  if (error.response?.success === false) {
    if (error.response?.showType === 0) return;
    if (error.response?.showType === 1) {
      message.warning(error.response?.errorMessage);
      return;
    }
    if (error.response?.showType === 2) {
      message.error(error.response?.errorMessage);
      return;
    }
    if (error.response?.showType === 4) {
      notification.info({ message: error.response?.errorMessage, placement: 'top' });
      return;
    }
    message.error(error.response?.errorMessage || 'Please try again later.');
  } else if (error.response?.status) {
    // const errorText = codeMessage[error.response.status] || error.response?.statusText;
    const errorText = codeMessage[error.response.status] || error.data?.error;
    message.error(`(${error.response?.status}) ${errorText}`);
  }
};

const errorHandler = function (error: any) {
  // console.log('http request error.request:', error.request);
  // console.log('http request error.response:', error.response);
  if (error.request.url === '/api/logout') {
    console.log('API /api/logout', error);
    return;
  }
  if (error.request.url === '/api/user') {
    if (error.response?.status === 401) localStorage.removeItem('token');
    if (error.data?.success === false) {
      console.log('!!! Token is ok, but success is false');
      localStorage.removeItem('token');
    }
    if (history.location.pathname === '/' || history.location.pathname.startsWith('/tv')) {
      console.log('no need to show error message');
    } else handleErrorMessage(error);
  } else {
    handleErrorMessage(error);
  }
  console.log('http request error.throw ');
  throw error;
};

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const token = localStorage.getItem('token');
  // console.log(token);
  const authHeader = { Authorization: `Bearer ${token}` };
  return {
    url: `${url}`,
    options: { ...options, headers: authHeader },
  };
};

export const request: RequestConfig = {
  timeout: 30000,
  middlewares: [],
  errorHandler: (error) => {
    errorHandler(error);
  },
  requestInterceptors: [authHeaderInterceptor],
};

/**Server-sent Events */
class RetriableError extends Error {}
const fetchData = async () => {
  await fetchEventSource('/api/sse', {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
    async onopen(res) {
      if (res.ok && res.headers.get('content-type')?.startsWith('text/event-stream')) {
        console.log('###Connection made ', res);
        return;
      }
      console.log('###Server side error ', res);
    },
    onmessage(event) {
      console.log('###Client onmessage', event.data);
      // const parsedData = JSON.parse(event.data);
    },
    onclose() {
      console.log('###Connection closed by the server');
      throw new RetriableError();
    },
    onerror(err) {
      console.log('###There was an error from server', err);
    },
  });
};

const loginPath = '/user/login';
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  token?: string;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      console.log('fetchUserInfo() ============= entry');
      localStorage.removeItem('token1');
      const currentUser = await queryCurrentUser();
      console.log('fetchUserInfo() ============= success', currentUser?.data);
      return currentUser?.data;
    } catch (error) {
      console.log('fetchUserInfo() ============= failed');
      return undefined;
    }
  };

  // console.log('checking web notification');
  // webNofifyAuthorize();

  console.log(`>>>getInitialState() entry: ${history?.location?.pathname}`);

  if (history.location.pathname === loginPath)
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  if (localStorage.getItem('token')) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  } else {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      console.log(`>>>onPageChange() currentPage: ${location.pathname}`);
      console.log(`onPageChange() currentUser: ${initialState?.currentUser?.name}`);
      if (
        !initialState?.currentUser &&
        !(
          location.pathname === loginPath ||
          location.pathname.startsWith('/tv') ||
          location.pathname === '/'
        )
      ) {
        console.log('onPageChange() -> push to login page');
        history.push({
          pathname: loginPath,
          query: {
            redirect: location.pathname,
            ...(location.query || {}),
          },
        });
      }
    },
    // defaultCollapsed: true,
    menuHeaderRender: () =>
      envTag ? (
        <a>
          <img width="auto" height={22} src={defaultSettings.logo} />
          <Tag
            style={{ padding: 4, lineHeight: '1em', fontSize: 8, marginLeft: '1em' }}
            color={envTag?.color}
          >
            <b>{envTag?.envName}</b>
          </Tag>
        </a>
      ) : (
        <a>
          <img width="auto" height={22} src={defaultSettings.logo} />
        </a>
      ),
    // define 403 page
    // unAccessible: <div>unAccessible</div>,
    // adding PageLoading
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return <>{children}</>;
    // },
    ...initialState?.settings,
  };
};
