import React from 'react';
import { message, notification } from 'antd';
import { getLocale } from 'umi';
import { WarningOutlined } from '@ant-design/icons';

const alertMsg = {
  en: {
    NA: '#Your current browser does not support the Web notification feature. Please use the Chrome browser to receive message notifications.',
    denied:
      'You need to enable Web notifications in your browser to receive messages. Once you have enabled the Web notifications feature, you will be able to receive message.',
  },
  zh: {
    NA: '当前使用的浏览器不支持 Web 通知功能。请使用Chrome浏览器来接受消息通知。',
    denied:
      '浏览器需要启用 Web 通知功能才能接收到消息。启用 Web 通知功能后，将能够接收到我们发送的消息通知。',
  },
};

export const webNofifyAuthorize = () => {
  let msg = alertMsg.en;
  if (getLocale().startsWith('zh')) msg = alertMsg.zh;

  if (!('Notification' in window)) {
    notification.open({
      message: '',
      description: msg.NA,
      icon: <WarningOutlined style={{ color: 'orange' }} />,
      placement: 'top',
      duration: 10,
    });
  } else if (Notification.permission === 'granted') {
    console.log('Notification permission is granted');
  } else if (Notification.permission === 'denied') {
    console.log('Notification permission is denied');
    notification.open({
      message: '',
      description: msg.denied,
      icon: <WarningOutlined style={{ color: 'orange' }} />,
      placement: 'top',
      duration: 10,
    });
  } else {
    console.log('Notification permission is ', Notification.permission);
    Notification.requestPermission().then((permission) => {
      console.log('Notification requestPermission is ', Notification.permission);
      if (permission === 'denied') {
        notification.open({
          message: '',
          description: msg.denied,
          icon: <WarningOutlined style={{ color: 'orange' }} />,
          placement: 'top',
          duration: 10,
        });
      }
    });
  }
};

const defaultDuration = 10 * 60 * 1000;

function webNotify({
  title,
  tag,
  body,
  duration,
}: {
  title: string;
  tag: string;
  body?: string;
  duration?: number;
}) {
  if ('Notification' in window) {
    const n = new Notification(title, {
      tag,
      body,
      icon: '/logo.svg',
    });

    const timer = setTimeout(() => {
      n.close();
    }, duration || defaultDuration);

    n.onclick = () => {
      console.log('Notification click tag', tag);
      message.info('Notification clicked');
      window.focus();
      try {
        n.close();
        clearTimeout(timer);
      } catch (e) {
        console.log('WebNotify error:', e);
      }
    };
  }
}

export default webNotify;
