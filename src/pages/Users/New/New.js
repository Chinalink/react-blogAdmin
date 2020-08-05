/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-05 22:59:28
 */ 
import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'

import './style.css'

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailRules: [
        { type: 'email', message: 'The input is not valid E-mail!' },
        { required: true, message: 'Please input your E-mail!' },
      ]
    }
  }

  render() {
    const formItems = this.getFormItems()
    const fromOptions = { labelCol:{ span: 4 }, onFinish:this.onFinish }

    return (
      <Fragment>
        <Form {...fromOptions} className="user-new__wrap">
          {
            formItems.map((item, index) => {
              return <Form.Item key={item.name} {...item}>{item.render && item.render}</Form.Item>
            })
          }
          <Form.Item className="user-form-submit">
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }

  getFormItems = () => {
    const {EmailRules} = this.state
    const itemArr = [
      { label: '用户名', name: 'user', render: <Input />, rules: [{ required: true, message: '用户名不能为空' }] },
      { label: '密码', name: 'password', render: <Input.Password />, rules: [{ required: true, message: '密码不能为空' }] },
      { label: '昵称', name: 'nikeName', render: <Input />,  },
      { label: 'Email', name: 'email', render: <Form.Item name='email' noStyle rules={ EmailRules }><Input/></Form.Item>},
      { label: '角色', name: 'role', render: <SearchSelect /> },
    ]
    return itemArr
  }

  onFinish = (values) => {
    console.log(values)
  }

}

export default UserNew;