/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-17 11:07:59
 * @LastEditTime: 2020-07-17 17:49:01
 */ 
import React, { Component } from 'react'
import { Input, Select, DatePicker, Button } from 'antd'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';

import marked from 'marked';
import hljs from 'highlight.js';
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
    return (
      <div className="article-new__wrap">
        <div className="article-new__header">
          <div className="header-item title">
            <span className="header-item__label">标题：</span>
            <Input />
          </div>
          <div className="header-item time">
            <span className="header-item__label">定时发布：</span>
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </div>
        </div>
        <SimpleMDE
          ref={(ref) => this.simpleMDE = ref}
          id="write"
          value={value}
          options={editorOptions}
          onChange={this.handleChange}
        />
        <div dangerouslySetInnerHTML={{ __html: marked(htmlValue) }}></div>
        <div className="article-new__footer">
          <div className="footer-options">
            <div className="header-item">
              <span className="header-item__label">作者：</span>
              <Select className="header-item__select">
                <Select.Option value="demo">Demo1</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
              </Select>
            </div>
            <div className="header-item">
              <span className="header-item__label">公开度：</span>
              <Select className="header-item__select">
                <Select.Option value="demo">Demo1</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
              </Select>
            </div>
            <div className="header-item">
              <span className="header-item__label">标签：</span>
              <Select className="header-item__select">
                <Select.Option value="demo">Demo1</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
              </Select>
            </div>
            <div className="header-item">
              <span className="header-item__label">分类目录：</span>
              <Select className="header-item__select">
                <Select.Option value="demo">Demo1</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
              </Select>
            </div>
          </div>
          <div className="header-item">
            <Button type="primary">保存草稿</Button>
            <Button className="article-submit" type="primary">发布</Button>
          </div>
        </div>
      </div>
    )
  }

  handleChange = (value) => {
    const htmlValue = marked(value)
    this.setState({ value, htmlValue: htmlValue })
  }

  handleSaveArticle = () => {
    
  }

  // 保存文章
  handleSubmitArticle = () => {
    
  }
}
 
export default ArticleNew;