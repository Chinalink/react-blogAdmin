/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-17 11:07:59
 * @LastEditTime: 2020-07-30 13:22:13
 */ 
import React, { Component } from 'react'
import { Input, DatePicker, Button, TreeSelect } from 'antd'
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'

import Utils from '../../../utils/utils'
import { APIcreatePost, APIgetSortList } from '../../../apis/ArticleApis'

import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked';
import hljs from 'highlight.js';

import 'easymde/dist/easymde.min.css';
import 'highlight.js/styles/atom-one-dark.css'

import './style.css'
import './markDown.css'

class ArticleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlValue: '',
      postData: {
        content: ''
      },
      sortTreeData: [],
      editorOptions: {
        spellChecker: false,
        toolbar: [
          'bold', 'italic', 'heading', '|',
          'quote', 'code', 'table', 'horizontal-rule', 'unordered-list', 'ordered-list', '|', 
          'link', 'image', '|',
          'side-by-side', 'fullscreen', '|',
          'guide'
        ]
      }
    }
  }

  componentDidMount() {
    this.getSortList()
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value,
    });
  }

  render() { 
    const { postData, htmlValue, editorOptions } = this.state
    const { content } = postData
    const headerFormOptions = { ref: this.serchFrom, name: 'article_new_header__search', onValuesChange: this.changeArticleOption }
    const headerFormItems = this.getHeaderFormItems()

    return (
      <div className="article-new__wrap">
        <SerchForm formOptions={headerFormOptions} formItems={headerFormItems} />
        <SimpleMDE
          ref={(ref) => this.simpleMDE = ref}
          id="write"
          value={content}
          options={editorOptions}
          onChange={this.handleChange}
        />
        {/* markdown 渲染测试 */}
        <div dangerouslySetInnerHTML={{ __html: marked(htmlValue) }}></div>
        <div className="article-new__footer">
          <Button type="primary" onClick={this.handleSubmitArticle}>保存草稿</Button>
          <Button className="article-submit" type="primary">发布</Button>
        </div>
      </div>
    )
  }

  getHeaderFormItems = () => {
    const { sortTreeData } = this.state
    const itemArr = [
      { label: '标题', name: 'post_title', col: 16, render: <Input /> },
      { label: '定时发布', name: 'time', col: 7, offset: 1, render: <DatePicker format="YYYY-MM-DD HH:mm:ss" /> },
      { label: '标签', name: 'tags', col: 12, render: <SearchSelect /> },
      { label: '分类目录', name: 'category', col: 11, offset: 1, render: <TreeSelect treeData={sortTreeData} placeholder="请选择分类" allowClear multiple treeDataSimpleMode /> },
      { label: '作者', name: 'post_author', col: 4, render: <SearchSelect /> },
      { label: '公开度', name: 'openness', col: 4, offset: 1, render: <SearchSelect /> },
    ]
    return itemArr
  }

  // 查询分类列表目录
  getSortList = async () => {
    const res = await APIgetSortList()
    if (res.code === 1) {
      // 添加额外字段，用作antd table treeSelect使用
      const result = res.data.map(item => {
        item.title = item.sort_name // treeSelect 需要
        item.value = item.id // treeSelect 需要
        item.key = item.id // treeTable 需要
        return item
      })
      // 数据格式转换
      const parentArr = result.filter(i => i.sort_parentId == null)
      const sortTreeData = Utils.arrToTreeData(result, parentArr, 'sort_parentId')
      this.setState({ sortTreeData })
    }
  }

  handleChange = (value) => {
    const { postData } = this.state
    let tempPostData = {}
    tempPostData = { ...postData, content: value }
    this.setState({ postData: tempPostData })
  }

  changeArticleOption = (changedValues, allValues) => {
    const { postData } = this.state
    let tempPostData = {}
    tempPostData = { ...tempPostData, ...postData, ...allValues}
    this.setState({ postData: tempPostData })
  }

  handleSaveArticle = () => {
    
  }

  // 保存文章
  handleSubmitArticle = async () => {
    const { postData } = this.state
    const res = await APIcreatePost(postData)
    console.log(res)
  }
}
 
export default ArticleNew;