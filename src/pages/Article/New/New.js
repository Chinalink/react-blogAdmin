/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-17 11:07:59
 * @LastEditTime: 2020-08-23 16:19:58
 */ 
import React, { Component } from 'react'
// 依赖组件
import MarkDownEditor from '../../../components/Common/MarkDownEditor/MarkDownEditor'
import { Input, DatePicker, Button, message, Row, Col, Switch } from 'antd'
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import FormSelect from '../../../components/Common/FormSelect/FormSelect.js'
import FormTree from '../../../components/Common/FormTree/FormTree'

// 依赖工具 & API
import utils from '../../../utils/utils'
import * as ArticleApi from '../../../apis/ArticleApis'
import * as UserApi from '../../../apis/UserApis'

import './style.css'

class ArticleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTreeData: [], // 分类列表
      authorData: [], // 作者列表
      tagData: [], // 标签列表
      articleData: {
        content: ''
      }
    }
  }

  componentDidMount() {
    this.init()
  }

  render() { 
    const { articleData } = this.state
    const { content } = articleData
    const headerFormOptions = { ref: this.newArticleFrom, name: 'article_new__form', layout: 'vertical', onValuesChange: this.changeArticleOption }
    const headerFormItems = this.getArticleFormItems()

    return (
      <div className="article-new__wrap">
        <Row>
          <Col span="19">
            <h4 className="article-new__label">标题</h4>
            <Input className="article-new__title" onChange={this.handleTitleChange} />
            <h4 className="article-new__label">正文</h4>
            <MarkDownEditor value={content} onChange={this.editorChange} />
          </Col>
          <Col span="4" offset="1">
            <div className="article-new__button">
              <Button type="default" onClick={this.handleSubmitArticle.bind(this, 0)}>保存草稿</Button>
              <Button className="article-submit" type="primary" onClick={this.handleSubmitArticle.bind(this, 1)}>发布文章</Button>
            </div>
            <SerchForm formOptions={headerFormOptions} formItems={headerFormItems} />
            
          </Col>
        </Row>
      </div>
    )
  }

  getArticleFormItems = () => {
    const { categoryTreeData, authorData, tagData } = this.state
    const itemArr = [
      { label: '文章置顶', name: 'topping', col: 24, valuePropName: 'checked', render: <Switch /> },
      { label: '定时发布', name: 'timer', col: 24, render: <DatePicker format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }} /> },
      { label: '分类', name: 'category', col: 24, render: <FormTree className="category-tree" checkable checkStrictly treeData={categoryTreeData} /> },
      { label: '标签', name: 'tags', col: 24, render: <FormSelect labelInValue mode="tags" data={tagData} /> },
      { label: '作者', name: 'author', col: 24, render: <FormSelect data={authorData} /> },
      { label: '缩略图', name: 'thumbnail', col: 24, valuePropName: 'checked', render: <Switch /> },
    ]
    return itemArr
  }
  // 初始化数据
  init = () => {
    this.getCategoryList()
    this.getTagList()
    this.getAuthorList()
  }

  // 查询分类列表目录
  getCategoryList = async () => {
    const res = await ArticleApi.APIgetCategoryList()
    if (res.code === 0) {
      const { result } = res.data
      // 添加额外字段，用作antd Tree使用
      const resultData = result.map(item => {
        item.title = item.name // tree 需要
        item.key = item.id // tree 需要
        return item
      })
      // 数据格式转换
      const parentArr = resultData.filter(i => i.parentId == null)
      const categoryTreeData = utils.arrToTreeData(resultData, parentArr, 'parentId')
      this.setState({ categoryTreeData })
    }
  }

  // 查询标签列表
  getTagList = async () => {
    const res = await ArticleApi.APIgetTagList({ pageSize: 100 })
    if (res.code === 0) {
      const { result } = res.data
      const data = result.map(item => {
        item.text = item.name
        item.value = item.name
        return item
      })
      this.setState({ tagData: data })
    }
  }

  // 获取作者列表
  getAuthorList = async () => {
    const res = await UserApi.APIgetUserList({ pageSize: 100, roles: 'author' })
    if (res.code === 0) {
      const { result } = res.data
      const data = result.map(item => {
        item.text = item.nickName
        item.value = item.id
        return item
      })
      this.setState({ authorData: data })
    }
  }

  // 标题变化
  handleTitleChange = (ev) => {
    const { articleData } = this.state
    let tempPostData = {}
    tempPostData = { ...articleData, title: ev.target.value }
    this.setState({ articleData: tempPostData })
  }

  // 文章内容变化
  editorChange = (value) => {
    const { articleData } = this.state
    let tempPostData = {}
    tempPostData = { ...articleData, content: value }
    this.setState({ articleData: tempPostData })
  }

  // 表单内容变化
  changeArticleOption = (changedValues, allValues) => {
    const { articleData } = this.state
    let tempPostData = {}
    let tags = []
    if (allValues.tags && allValues.tags.length > 0) {
      tags = this.filterTags(allValues.tags)
    }
    tempPostData = { ...tempPostData, ...articleData, ...allValues, tags }
    this.setState({ articleData: tempPostData })
  }

  // 处理tag标签数据
  filterTags = (tags) => {
    const { tagData } = this.state
    const result = tags.map(tag => {
      let index = tagData.findIndex(item => item.name === tag.label)
      const node = { id: tag.value, name: tag.label }
      if(index > -1) {
        node.id = tagData[index].id
      }
      return node
    }) 
    return result
  }

  // 保存文章
  handleSubmitArticle = async (type) => {
    const { articleData } = this.state
    const { history } = this.props
    const res = await ArticleApi.APIcreatePost({ ...articleData, status: type })

    if (res.code === 0) {
      message.info(res.msg)
      history.push({ pathname: 'list' })
    }
  }
}

export default ArticleNew;