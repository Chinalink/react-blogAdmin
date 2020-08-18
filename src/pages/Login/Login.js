/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-05 23:07:16
 * @LastEditTime: 2020-08-18 23:48:51
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
    const fromOptions = { labelCol: { span: 4 }, onFinish: this.submitLogin, initialValues: this.loginInfo}
    return (
      <div className="user-login">
        <div className="user-login-form">
          <Form {...fromOptions}>
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
        </div>
      </div>
    );
  }

  submitLogin = async (values) => {
    const { history } = this.props
    const params = values
    // 判断是否首次登录
    const loginInfo = JSON.parse(utils.localGetItem('loginInfo'))
    if (!loginInfo || loginInfo.user !== values.user) {
      params.password = utils.stringToMd5(params.password)
    }

    const res = await APIUserLogin(params)

    if(res.code === 0) {
      const token = res.data.token
      const userInfo = {
        avatar: res.data.avatar,
        name: res.data.name,
        uid: res.data.uid
      }
      if (values.remember === true) {
        utils.localSetItem('loginInfo', JSON.stringify(params))
      } else {
        utils.localClearItem();
      }
      utils.sessionSetItem('userInfo', JSON.stringify(userInfo))
      utils.sessionSetItem('token', token)
      message.info(res.msg)
      setTimeout(() => {
        history.push({ pathname: '/' })
      }, 1000)
    }
  }
};
export default Login;