import React, { useState } from 'react';
import { connect } from 'umi';

import { Alert } from 'antd';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined, } from '@ant-design/icons';

import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm initialValues={{ autoLogin: true, }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="用户名或密码错误" />
        )}
          <ProFormText
            name="userName"
            placeholder="请输入用户名或邮箱"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            rules={[ { required: true, message: '请输入用户名或邮箱' }, ]}
          />
          <ProFormText.Password
            name="password"
            placeholder="请输入密码"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            rules={[ { required: true, message: '请输入密码' }, ]}
          />
        <div style={{ marginBottom: 24, }}>
          <ProFormCheckbox noStyle name="autoLogin">记住我的登录信息</ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码？</a>
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
