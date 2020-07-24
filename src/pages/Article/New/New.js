/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-17 11:07:59
 * @LastEditTime: 2020-07-24 13:11:58
 */ 
import React, { Component } from 'react'
import { Input, DatePicker, Button } from 'antd'
import SerchForm from '../../../components/Common/SearchForm/SearchForm.js'
import SearchSelect from '../../../components/Common/SearchSelect/SearchSelect.js'

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
      value: '',
      htmlValue: '',
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
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value,
    });
  }

  render() { 
    const { value, htmlValue, editorOptions } = this.state
    const headerFormOptions = { ref: this.serchFrom, name: 'article_new_header__search', onValuesChange: this.changeArticleOption }
    const headerFormItems = this.getHeaderFormItems()

    return (
      <div className="article-new__wrap">
        <SerchForm formOptions={headerFormOptions} formItems={headerFormItems} />
        <SimpleMDE
          ref={(ref) => this.simpleMDE = ref}
          id="write"
          value={value}
          options={editorOptions}
          onChange={this.handleChange}
        />
        {/* markdown 渲染测试 */}
        <div dangerouslySetInnerHTML={{ __html: marked(htmlValue) }}></div>
        <div className="article-new__footer">
          <Button type="primary">保存草稿</Button>
          <Button className="article-submit" type="primary">发布</Button>
        </div>
      </div>
    )
  }

  getHeaderFormItems = () => {
    const itemArr = [
      { label: '标题', name: 'title', col: 16, render: <Input /> },
      { label: '定时发布', name: 'time', col: 7, offset: 1, render: <DatePicker format="YYYY-MM-DD HH:mm:ss" /> },
      { label: '标签', name: 'tags', col: 9, render: <SearchSelect /> },
      { label: '分类目录', name: 'category', col: 6, offset: 1, render: <SearchSelect /> },
      { label: '作者', name: 'author', col: 3, offset: 1, render: <SearchSelect /> },
      { label: '公开度', name: 'openness', col: 3, offset: 1, render: <SearchSelect /> },
    ]
    return itemArr
  }

  handleChange = (value) => {
    const htmlValue = marked(value)
    this.setState({ value, htmlValue: htmlValue })
  }

  changeArticleOption = (changedValues, allValues) => {
    console.log('changedValues', changedValues)
    console.log('allValues', allValues)
  }

  handleSaveArticle = () => {
    
  }

  // 保存文章
  handleSubmitArticle = () => {
    
  }
}
 
export default ArticleNew;