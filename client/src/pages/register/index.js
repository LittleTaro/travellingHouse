import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import router from 'umi/router';
import { useStoreHook } from 'think-react-store';

import './index.less';

function Register(props) {
  const { user: { registerAsync } } = useStoreHook();
  const [state, setState] = useState()
  const { getFieldProps, validateFields } = props.form;
  useEffect(() => {

  }, []);

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        if (value.password !== value.password1) {
          Toast.fail('密码和确认密码需一致');
          return;
        };
        registerAsync(value);
      }
    })
  };
  const handleClick = () => {
    router.push('/login')
  }

  return (
    <div className='register-page'>
      <List renderHeader={() => '用户注册'}>
        <InputItem
          {...getFieldProps('username', {
            rules: [{ required: true }]
          })}
          placeholder='请输入用户名'
        >
          用户名
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true }]
          })}
          placeholder='请输入密码'
        >
          密码
        </InputItem>
        <InputItem
          {...getFieldProps('password1', {
            rules: [{ required: true }]
          })}
          placeholder='请再次输入密码'
        >
          确认密码
        </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>注册</Button>
      <div className='login' onClick={handleClick}>已注册，去登录</div>
    </div>
  )
}

export default createForm()(Register);