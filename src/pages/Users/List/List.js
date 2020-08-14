/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 17:18:45
 * @LastEditTime: 2020-08-14 17:06:19
 */ 
import React, { Component, Fragment } from 'react';
// 依赖组件
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import { Button, Input, Table, Popconfirm} from 'antd'

// API
import * as UserApi from '../../../apis/UserApis'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      pagination: {
        current: 1,
        pageSize: 10
      } 
    }
    this.serchFrom = React.createRef()
  }
  render() { 
    const { userList, pagination } = this.state
    const columns = this.getTableColumns()
    const formItems = this.getFormItems()
    const formOptions = { ref: this.serchFrom, name: 'user_list_search', onFinish: this.serchUser }
    const paginationOption = Object.assign({}, pagination, { showSizeChanger: true })

    return (
      <Fragment>
        <SerchForm formOptions={formOptions} formItems={formItems} />
        <Table bordered columns={columns} dataSource={userList} pagination={paginationOption} size="middle" className="article-table" onChange={this.handleTableChange}/>
      </Fragment>
    );
  }

  getFormItems = () => {
    const itemArr = [
      { label: '昵称', name: 'nickName', col: 4, render: <Input /> },
      { label: '电子邮件', name: 'email', col: 4, offset: 1, render: <Input /> },
      { col: 2, offset: 1, render: <Button type="primary" htmlType="submit">筛选</Button> }
    ]
    return itemArr
  }

  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'user', title: '用户名', dataIndex: 'user' },
      { key: 'author', title: '昵称', dataIndex: 'nickName' },
      { key: 'email', title: '电子邮件', dataIndex: 'email' },
      { key: 'role', title: '角色', dataIndex: ['roleName'] },
      { key: 'createdAt', title: '注册时间', dataIndex: 'createdAt' },
      { key: 'articleTotal', title: '文章总数', dataIndex: 'articleTotal' },
      {
        key: 'action', title: '操作', dataIndex: 'action', render: (text, record, index) => (
          <div className="table-action">
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditUser.bind(this, text, record, index)}>编辑</Button>
            <Popconfirm title="确认删除该用户吗？" onConfirm={this.handleRemoveUser.bind(this, text, record, index)}>
              <Button className="table-action__button" type="primary" size="small" danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    return columns
  }

  componentDidMount() {
    const { pagination } = this.state
    this.getUserList({ ...pagination})
  }
  // 获取用户列表
  getUserList = async (params = {}) => {
    const res = await UserApi.APIgetUserList(params)
    if (res.code === 0) {
      const { result, total } = res.data
      const data = result.map(item => {
        item.key = item.id
        return item
      }) 
      this.setState({ userList: data, pagination: { ...params, total } })
    }
  }
  
  // 分页查询
  handleTableChange = (pagination) => {
    console.log(pagination);
    this.getUserList({ ...pagination })
  }
  // 条件查询用户
  serchUser = async (values) => {
    const res = await UserApi.APIgetUserList(values)
    if (res.code === 0) {
      const userData = res.data.result
      this.setState({ userData })
    }
  }

  // 编辑用户
  handleEditUser = (text, record, index) => {
    const { history } = this.props
    history.push({ pathname: '/user/info', state: {userId: record.id} })
  }
  // 删除用户
  handleRemoveUser = async (text, record, index) => {
    const params = { userId: record.id }
    const res = await UserApi.APIdeleteUser(params)
    if (res.code === 0) {
      this.getUserList()
    }
  }
}
 
export default UserList;