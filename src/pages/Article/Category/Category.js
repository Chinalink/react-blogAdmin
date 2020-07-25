/*
 * @Description: 分类目录
 * @Author: HuGang
 * @Date: 2020-07-25 09:27:47
 * @LastEditTime: 2020-07-25 22:18:25
 */ 
import React, { Component } from 'react';
import { Row, Col, Button, Input, TreeSelect, Table, Form, message } from 'antd';
import Utils from '../../../utils/utils'
import { APIcreateSort, APIgetSortList } from '../../../apis/ArticleApis'

import './Category.css'


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortData: [],
      sortTreeData: [
        { title: '无', id: null }
      ]
    }
    this.createCategoryFrom = React.createRef()
  }

  componentDidMount() {
    this.getSortList()
  }

  render() {
    const { sortData } = this.state
    const columns = this.getTableColumns()
    const formOptions = { ref: this.createCategoryFrom, name: 'article_category_create', onFinish: this.createSort }
    const formItems = this.getFormItems()
    return (
      <Row>
        <Col span="24">
          <Table bordered columns={columns} dataSource={sortData} className="article-table" />
        </Col>
        <Col span="8" offset="1">
          <h3 className="article-category-title">添加新分类目录</h3>
          <Form {...formOptions}>
            {formItems.map((item,index) => {
              return <Form.Item key={`sort${index}`} className="search-form__item" {...item}>{item.render && item.render}</Form.Item>
            })}
            <Form.Item>
              <Button type="primary" htmlType="submit">添加分类目录</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }

  // 表单项
  getFormItems = () => {
    const { sortTreeData } = this.state
    const itemArr = [
      { label: '名称', name: 'sort_name', render: <Input /> },
      { label: '别名', name: 'sort_alias', render: <Input />  },
      { label: '父级分类目录', name: 'sort_parentId', render: <TreeSelect treeData={sortTreeData} placeholder="请选择父级分类" treeDataSimpleMode/> }
    ]
    return itemArr
  }

  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'sort_name', title: '名称', dataIndex: 'sort_name' },
      { key: 'sort_alias', title: '别名', dataIndex: 'sort_alias' },
      { key: 'sort_num', title: '分类下文章数量', dataIndex: 'sort_num' },
      {
        key: 'action', title: '操作', render: (text, record, index) => (
          <div className="table-action">
            <Button className="table-action__button" type="primary" size="small" onClick={this.handlePreviewArticle.bind(this, text, record, index)}>查看</Button>
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditArticle.bind(this, text, record, index)}>编辑</Button>
            <Button className="table-action__button" type="primary" size="small" danger onClick={this.handleRemoveArticle.bind(this, text, record, index)}>删除</Button>
          </div>
        )
      }
    ]
    return columns
  }

  // 查询分类列表目录
  getSortList = async () => {
    const res = await APIgetSortList()
    if(res.code === 1) {
      // 添加额外字段，用作antd table treeSelect使用
      const result = res.data.map(item => {
        item.title = item.sort_name // treeSelect 需要
        item.value = item.id // treeSelect 需要
        item.key = item.id // treeTable 需要
        return item
      })
      // 数据格式转换
      const parentArr = result.filter(i => i.sort_parentId == null)
      const sortData = Utils.arrToTreeData(result, parentArr, 'sort_parentId')
      const sortTreeData = this.state.sortTreeData.concat(sortData)
      this.setState({ sortData, sortTreeData})
    }
  }

  // 创建分类目录
  createSort = async values => {
    const res = await APIcreateSort(values)
    if(res.code === 1) {
      message.info(res.msg)
      this.createCategoryFrom.current.resetFields()
      this.getSortList()
    }
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
 
export default Category;