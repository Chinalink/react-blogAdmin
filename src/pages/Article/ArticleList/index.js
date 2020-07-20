/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:01:15
 * @LastEditTime: 2020-07-16 12:51:13
 */ 
import React, { Component } from 'react';
import { Button, Table } from 'antd';
import SerchForm from '../../../components/ArticleList/SerchForm'

import './style.css'

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    
  }

  serchArticleList = values  => {
    console.log(this.formRef)
    console.log(values);
  }
  
  render() {
    const columns = this.getTableColumns()
    const data = [{ key: '1', title: '世界，您好！', author: 'xiaodai', category: '未分类', tags: '—' }]
    return (
      <div className="article-list__wrap">
        <SerchForm onFinish={this.serchArticleList} />
        <Table bordered columns={columns} dataSource={data} className="article-table" />
      </div>
    );
  }

  getTableColumns = () => {
    const columns = [
      { key: 'title', title: '标题', dataIndex: 'title' },
      { key: 'author', title: '作者', dataIndex: 'author' },
      { key: 'category', title: '分类目录', dataIndex: 'category' },
      { key: 'tags', title: '标签', dataIndex: 'tags' },
      { key: 'date', title: '日期', dataIndex: 'date' },
      { key: 'action', title: '操作', dataIndex: 'action', render: () => (
        <div className="table-action">
          <Button type="primary" size="small">查看</Button>
          <Button type="primary" size="small">编辑</Button>
          <Button type="primary" size="small" danger>删除</Button>
        </div>
      )  }
    ]
    return columns
  }

}
 
export default ArticleList;