/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-17 11:07:59
 * @LastEditTime: 2020-08-02 13:56:35
 */ 
import React, { Component } from 'react'
// 依赖组件
import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked';
import hljs from 'highlight.js';
import { Input, DatePicker, Button, TreeSelect, message } from 'antd'
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'

// 依赖工具 & API
import Utils from '../../../utils/utils'
import { APIcreatePost, APIgetCategoryList } from '../../../apis/ArticleApis'

import 'easymde/dist/easymde.min.css';

import './style.css'
import './markDown.css'

class ArticleNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlValue: '',
      articleData: {
        content: ''
      },
      categoryTreeData: [],
      editorOptions: {
        maxHeight: '500px',
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
    this.newArticleFrom = React.createRef()
  }

  componentDidMount() {
    this.getCategoryList()
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value,
    });
  }

  render() { 
    const { articleData, htmlValue, editorOptions } = this.state
    const { content } = articleData
    const headerFormOptions = { ref: this.newArticleFrom, name: 'article_new_header__search', onValuesChange: this.changeArticleOption }
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
          <Button type="primary" onClick={this.handleSubmitArticle.bind(this, 0)}>保存草稿</Button>
          <Button className="article-submit" type="primary" onClick={this.handleSubmitArticle.bind(this, 1)}>发布</Button>
        </div>
      </div>
    )
  }

  getHeaderFormItems = () => {
    const { categoryTreeData } = this.state
    const itemArr = [
      { label: '标题', name: 'title', col: 16, render: <Input /> },
      { label: '定时发布', name: 'timer', col: 7, offset: 1, render: <DatePicker format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }} /> },
      { label: '标签', name: 'tags', col: 12, render: <SearchSelect /> },
      { label: '分类目录', name: 'category', col: 11, offset: 1, render: <TreeSelect treeData={categoryTreeData} placeholder="请选择分类" allowClear multiple /> },
      { label: '作者', name: 'author', col: 4, render: <SearchSelect /> },
      { label: '文章类型', name: 'type', col: 4, offset: 1, render: <SearchSelect /> },
    ]
    return itemArr
  }

  // 查询分类列表目录
  getCategoryList = async () => {
    const res = await APIgetCategoryList()
    if (res.code === 0) {
      // 添加额外字段，用作antd table treeSelect使用
      const result = res.data.map(item => {
        item.title = item.name // treeSelect 需要
        item.value = item.id // treeSelect 需要
        return item
      })
      // 数据格式转换
      const parentArr = result.filter(i => i.parentId == null)
      const categoryTreeData = Utils.arrToTreeData(result, parentArr, 'parentId')
      this.setState({ categoryTreeData })
    }
  }

  // 文章内容变化追加到提交数据
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

  // 保存文章
  handleSubmitArticle = async (type) => {
    const { postData } = this.state
    const { history } = this.props
    const res = await APIcreatePost({...postData, status: type})
    
    if(res.code === 0) {
      message.info(res.msg)
      history.push({pathname: 'list'})
    }
  }
}
 
export default ArticleNew;