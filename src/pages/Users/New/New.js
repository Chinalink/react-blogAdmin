/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-12 20:04:28
 */ 
import React, { Component, Fragment } from 'react';
import { Form, Input, Button, message } from 'antd';
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'
import utils from '../../../utils/utils'
import { APIgetRolesList, APIUserRegister } from '../../../apis/UserApis'

import './style.css'

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesData: [], // 角色列表
      passwordRules: [
        { required: true, message: '请输入密码' },
        { max: 18, message: '密码不超过18个字符' },
        { pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/), message: '密码只允许包含数字、字母和下划线' }
      ],
      EmailRules: [
        { type: 'email', pattern: new RegExp(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/), message: '您输入的邮箱格式不正确！' },
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
    const { EmailRules, passwordRules, rolesData} = this.state
    const itemArr = [
      { label: '用户名', name: 'user', render: <Input maxLength='10'/>, rules: [{ required: true, message: '请输入您的用户名' }] },
      { label: '密码', name: 'password', render: <Input.Password />, rules: passwordRules },
      { label: '昵称', name: 'nickName', render: <Input />,  },
      { label: '电子邮件', name: 'email', render: <Form.Item label="Email" name='email' noStyle rules={ EmailRules }><Input /></Form.Item>},
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
    const { history } = this.props

    let params = values
    params.password = utils.stringToMd5(params.password)
    const res = await APIUserRegister(params)
    console.log(res)
    if(res.code === 0) {
      message.info(res.msg)
      setTimeout(() => {
        history.push({ pathname: '/user/list' })
      }, 1000)
    }
  }

}

export default UserNew;