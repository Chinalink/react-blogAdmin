/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:01:15
 * @LastEditTime: 2020-08-02 18:32:53
 */ 
import React, { Component, Fragment } from 'react';
// 依赖组件
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'
import { Button, Input, DatePicker, Tag, Table } from 'antd';
// 依赖API
import { APIgetArticleList } from '../../../apis/ArticleApis.js'
import { APIgetUserInfo } from '../../../apis/UserApis.js'

import './style.css'

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: []
    }
    this.serchFrom = React.createRef()
  }

  componentDidMount() {
    this.getAllArticleList()
  }
  
  render() {
    const { articleList } = this.state
    const columns = this.getTableColumns()
    const formOptions = { ref: this.serchFrom, name: 'article_list_search', onFinish: this.serchArticleList }
    const formItems = this.getFormItems()
    // const data = [{ key: '1', title: '世界，您好！', author: 'xiaodai', category: '未分类', tags: '—' }]

    return (
      <Fragment>
        <SerchForm formOptions={formOptions} formItems={formItems} />
        <Table bordered columns={columns} dataSource={articleList} size="middle" className="article-table" />
      </Fragment>
    );
  }
  
  getFormItems = () => {
    const itemArr = [
      { label: '文章标题', name: 'title', col: 8, render: <Input /> },
      { label: '分类', name: 'category', col: 7, offset: 1, render: <SearchSelect /> },
      { label: '标签', name: 'tags', col: 7, offset: 1, render: <SearchSelect /> },
      { label: '发布状态', name: 'status', col: 4, render: <SearchSelect /> },
      { label: '作者', name: 'author', col: 4, offset: 1, render: <SearchSelect /> },
      { label: '日期', name: 'date', col: 7, offset: 1, render: <DatePicker.RangePicker format='YYYY/MM/DD' /> },
      { className: 'search-button__wrap', col: 2, offset: 5, render: <Button type="primary" htmlType="submit">筛选</Button> }
    ]
    return itemArr
  }

  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'title', title: '标题', dataIndex: 'title', render: (text, record, index) => (
        [
          <span className="article-table__title">{record.title}</span>, 
          <Tag color={`${record.status ? '#2db7f5' : '#87d068'}`}>{record.status ? '已发布' : '草稿'}</Tag>
        ]
      )},
      { key: 'author', title: '作者', dataIndex: 'author' },
      { key: 'sorts', title: '分类目录', dataIndex: 'sorts', render: (text, record, index) => (
        <Fragment>
          {
            record.sorts.map(item => (
              <span key={item.id}>{item.name}、</span>
            ))
          }
        </Fragment>
      )},
      { key: 'tags', title: '标签', dataIndex: 'tags' },
      { key: 'updatedAt', title: '最后修改日期', dataIndex: 'updatedAt' },
      {
        key: 'action', title: '操作', dataIndex: 'action', render: (text, record, index) => (
        <div className="table-action">
          <Button className="table-action__button" type="primary" size="small" onClick={this.handlePreviewArticle.bind(this, text, record, index)}>查看</Button>
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditArticle.bind(this, text, record, index)}>编辑</Button>
            <Button className="table-action__button" type="primary" size="small" danger onClick={this.handleRemoveArticle.bind(this, text, record, index)}>删除</Button>
        </div>
      )}
    ]
    return columns
  }

  getAllArticleList = async () => {
    const res = await APIgetArticleList()
    if(res.code === 1) {
      const data = res.data.map(item => {
        item.key = item.id
        return item
      })
      this.setState({ articleList: data })
    }
  }

  serchArticleList = async values => {
    console.log(values);
    const res = await APIgetUserInfo(values)
    console.log(res)
  }

  handlePreviewArticle = (text, record, index) => {
    console.log(text)
    console.log(record)
    console.log(index)
  }

  handleEditArticle = (text, record, index) => {
    console.log(text)
    console.log(record)
    console.log(index)
  }

  handleRemoveArticle = (text, record, index) => {
    console.log(text)
    console.log(record)
    console.log(index)
  }

}
 
export default ArticleList;