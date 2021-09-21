import React, { useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import router from 'umi/router';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const { user: { avatar, phone, sign, getUserAsync, LogoutAsync, id } } = useStoreHook();

  useEffect(() => {
    getUserAsync({});
  }, [])

  const handleClick = () => {
    router.push({
      pathname: '/user/edit',
      query: {
        id
      }
    })
  };

  const handleLogout = () => {
    LogoutAsync();
  }

  return (
    <ErrorBoundary>
      <div className='user-page'>
        <div className='info'>
          <div className='set' onClick={handleClick}>设置</div>
          <div className='user'>
            <img alt='user' src={avatar || require('@/assets/img/imgHolder.jpg')} />
            <div className='phone'>{phone}</div>
            <div className='sign'>{sign}</div>
          </div>
        </div>
        <div className='lists'>
          <List>
            <List.Item arrow="horizontal">用户协议</List.Item>
            <List.Item arrow="horizontal">常见问题</List.Item>
            <List.Item arrow="horizontal">联系客服</List.Item>
          </List>
        </div>
        <Button style={{ marginTop: '100px' }} onClick={handleLogout}>退出登录</Button>
      </div>
    </ErrorBoundary>

  )
}