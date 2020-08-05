/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 17:18:45
 * @LastEditTime: 2020-08-05 22:34:34
 */ 
import React, { Component, Fragment } from 'react';
// 依赖组件
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'
import { Button, Input, Table} from 'antd'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    }
    this.serchFrom = React.createRef()
  }
  render() { 
    const { userData } = this.state
    const columns = this.getTableColumns()
    const formItems = this.getFormItems()
    const formOptions = { ref: this.serchFrom, name: 'user_list_search', onFinish: this.serchUserList }

    return (
      <Fragment>
        <SerchForm formOptions={formOptions} formItems={formItems} />
        <Table bordered columns={columns} dataSource={userData} size="middle" className="article-table" />
      </Fragment>
    );
  }

  getFormItems = () => {
    const itemArr = [
      { label: '昵称', name: 'nickName', col: 4, render: <Input /> },
      { label: '电子邮件', name: 'email', col: 4, offset: 1, render: <SearchSelect /> },
      { col: 2, offset: 1, render: <Button type="primary" htmlType="submit">筛选</Button> }
    ]
    return itemArr
  }

  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'user', title: '用户名', dataIndex: 'user' },
      { key: 'author', title: '昵称', dataIndex: 'author' },
      { key: 'email', title: '电子邮件', dataIndex: 'email' },
      { key: 'rols', title: '角色', dataIndex: 'rols' },
      { key: 'createdAt', title: '注册时间', dataIndex: 'createdAt' },
      {
        key: 'action', title: '操作', dataIndex: 'action', render: (text, record, index) => (
          <div className="table-action">
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditArticle.bind(this, text, record, index)}>编辑</Button>
            <Button className="table-action__button" type="primary" size="small" danger onClick={this.handleRemoveArticle.bind(this, text, record, index)}>删除</Button>
          </div>
        )
      }
    ]
    return columns
  }
  
}
 
export default UserList;