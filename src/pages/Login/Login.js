// /*
//  * @Description: 
//  * @Author: HuGang
//  * @Date: 2020-08-05 23:07:16
//  * @LastEditTime: 2020-08-05 23:30:36
//  */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { APIUserLogin } from '../../apis/UserApis'

import './style.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const fromOptions = { labelCol: { span: 4 }, onFinish: this.onFinish }
    return (
      <Form className="user-login-form" {...fromOptions}>
        <Form.Item name="user" rules={[{required: true,message: 'Please input your Username!'}]} >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名或邮箱" />
        </Form.Item>
        <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!', }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>记住我的登录信息</Checkbox></Form.Item>
          <a className="login-form-forgot" href="/">忘记密码</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>Or <a href="/">register now!</a>
        </Form.Item>
      </Form>
    );
  }
  onFinish = (values) => {
    this.submitLogin(values)
  }

  submitLogin = async (values) => {
    const { history } = this.props
    const params = values
    const res = await APIUserLogin(params)
    if(res.code === 0) {
      const token = res.data.token
      localStorage.setItem('token', token)
      message.info(res.msg)
      setTimeout(() => {
        history.push({ pathname: '/index' })
      }, 1000)
    }
  }
};
export default Login;