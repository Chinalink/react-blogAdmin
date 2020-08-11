/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-05 23:07:16
 * @LastEditTime: 2020-08-11 23:27:15
 */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { APIUserLogin } from '../../apis/UserApis'
import utils from '../../utils/utils'

import './style.css'

class Login extends Component {
  constructor(props) {
    super(props);
    const loginInfo = utils.localGetItem('loginInfo')
    this.loginInfo = loginInfo ? JSON.parse(loginInfo) : {}
  }

  render() {
    const fromOptions = { labelCol: { span: 4 }, onFinish: this.onFinish, initialValues: this.loginInfo}
    return (
      <Form className="user-login-form" {...fromOptions}>
        <Form.Item name="user" rules={[{ required: true, message: '请输入用户名或邮箱'}]} >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名或邮箱"/>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码', }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>记住我的登录信息</Checkbox></Form.Item>
          <a className="login-form-forgot" href="/">忘记密码</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        </Form.Item>
      </Form>
    );
  }

  onFinish = (values) => {
    const isFirstLogin = utils.localGetItem('secret')
    if (isFirstLogin !== 'once') {
      values.password = utils.stringToMd5(values.password)
    }
    if (values.remember === true) {
      utils.localGetItem('secret', 'once')
      utils.localGetItem('loginInfo', JSON.stringify(values))
    } else {
      utils.localClearItem();
    }
    this.submitLogin(values)
  }

  submitLogin = async (values) => {
    const { history } = this.props
    const params = values
    const res = await APIUserLogin(params)
    if(res.code === 0) {
      const token = res.data.token
      const obj = {
        avatar: res.data.avatar,
        name: res.data.name,
        uid: res.data.uid
      }
      utils.localGetItem('userInfo', JSON.stringify(obj))
      utils.sessionSetItem('token', token)
      message.info(res.msg)
      setTimeout(() => {
        history.push({ pathname: '/' })
      }, 1000)
    }
  }
};
export default Login;