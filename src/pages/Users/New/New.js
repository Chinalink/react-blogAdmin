/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-08 15:34:04
 */ 
import React, { Component, Fragment } from 'react';
import { Form, Input, Button, message } from 'antd';
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'
import Utils from '../../../utils/utils'
import { APIgetRolesList, APIUserRegister } from '../../../apis/UserApis'

import './style.css'

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesData: [], // 角色列表
      EmailRules: [
        { type: 'email', message: '您输入的邮箱格式不正确！' },
        { required: true, message: '请输入您的邮箱！' },
      ]
    }
  }

  componentDidMount() {
    this.getRolesList()
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
    const { EmailRules, rolesData} = this.state
    const itemArr = [
      { label: '用户名', name: 'user', render: <Input />, rules: [{ required: true, message: '请输入您的用户名' }] },
      { label: '密码', name: 'password', render: <Input.Password />, rules: [{ required: true, message: '请输入您的密码' }] },
      { label: '昵称', name: 'nickName', render: <Input />,  },
      { label: 'Email', name: 'email', render: <Form.Item label="Email" name='email' noStyle rules={ EmailRules }><Input /></Form.Item>},
      { label: '角色', name: 'role', render: <SearchSelect data={rolesData} /> },
    ]
    return itemArr
  }

  // 获取角色列表 
  getRolesList = async () => {
    const res = await APIgetRolesList()
    if(res.code === 0) {
      const rolesData = res.data.map(item => {
        item.value = item.id
        item.text = item.name
        return item
      })
      this.setState({ rolesData })
    }
  }

  onFinish = async (values) => {
    let params = values
    params.password = Utils.stringToMd5(params.password)
    const res = await APIUserRegister(params)
    console.log(res)
    if(res.code === 0) {
      message.info(res.msg)
    }
  }

}

export default UserNew;