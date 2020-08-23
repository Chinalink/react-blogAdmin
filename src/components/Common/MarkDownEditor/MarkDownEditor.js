/*
 * @Description:
 * @Author: HuGang
 * @Date: 2020-08-21 14:50:18
 * @LastEditTime: 2020-08-23 20:29:40
 */
import React, { Component, Fragment } from 'react'
// 依赖组件
import SimpleMDE from 'yt-simplemde-editor';
import marked from 'marked';
import hljs from 'highlight.js';
import { Modal, Button, Upload, message } from 'antd';

import 'simplemde/dist/simplemde.min.css';
import 'yt-emoji-picker/dist/style.css';
import './markdown.css'

class MarkDownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadVisible: false,
      editorProps: {
        getMdeInstance: simplemde => {
          this.simplemde = simplemde;
        },
        id: 'articleEditor',
        options: {
          previewRender: this.renderMarkdown,
          spellChecker: false,
          toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'code', 'table', 'horizontal-rule', 'unordered-list', 'ordered-list', '|',
            'link', 'image',
            {
              name: 'upload',
              title: '上传图片',
              className: 'fa fa-upload',
              action: this.handleVisibleUpload.bind(this, true)
            },
            '|',
            'side-by-side', 'fullscreen'
          ]
        },
        uploadOptions: {
          ...this.getUploadOptions(),
          progressText: '![图片上传中，请稍后...]()',
          onError: (err, response) => {
            if (response.code !== 0) {
              message.error(response.msg);
            }
          },
          onSuccess: (response, file) => {
            const info = {
              file: { response, originFileObj: file, status: 'done' }
            }
            this.handleUploadChange(info, 'paset')
          }
        }
      }
    }
  }

  render() {
    const { value } = this.props
    const { editorProps, uploadVisible } = this.state
    const uploadProps = this.getUploadOptions()
    return (
      <Fragment>
        <SimpleMDE {...editorProps} value={value} onChange={this.handleChange} />
        {/* 图片上传弹窗 */}
        <Modal
          title="插入图片"
          visible={uploadVisible}
          footer={null}
          centered={true}
          onCancel={this.handleVisibleUpload.bind(this, false)}>
          <Upload { ...uploadProps } onChange = { this.handleUploadChange }>
            <Button type="primary">点击上传</Button>
          </Upload>
        </Modal>
      </Fragment>
    )
  }

  renderMarkdown = text => {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value,
    });
    const html = marked(text, { breaks: true })
    return html;
  };

  getUploadOptions = () => {
    const token = sessionStorage.getItem('token')
    
    const uploadOptions = {
      action: '/upload',
      jsonName: 'data.name', // 服务端响应格式 {"data":{"fileUrl":"http://xxx.jpg"}}
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('请上传正常格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片文件大小请小于2M!');
        }
        return isJpgOrPng && isLt2M;
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { type: 2 }
    }
    return uploadOptions
  }

  // 图片上传回调
  handleUploadChange = (info, isPaset) => {
    if (info.file.status === 'done') {
      const { response: { data } } = info.file;
      const codemirror = this.simplemde.codemirror
      const { name } = data;
      const cursor = codemirror.getCursor()
      const text = codemirror.getValue()
      const oldImgageText = `![file](${name})`
      const imageText = `![图片描述](http://qf8zthosn.hn-bkt.clouddn.com/${name})`
      const diffLength = imageText.length - oldImgageText.length
      const newText = isPaset 
        ? text.replace(oldImgageText, imageText) 
        : text.slice(0, cursor.ch) + imageText + text.slice(cursor.ch)
      codemirror.setValue(newText);
      
      cursor.ch = isPaset 
        ? cursor.ch += diffLength
        : cursor.ch += imageText.length
      codemirror.setCursor(cursor)
      codemirror.focus()
    }
    
    if (info.file.status === 'error') {
      const { response: { msg } } = info.file;
      message.error(msg);
    }

    this.handleVisibleUpload(false);
  }

  handleChange = (value) => {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  handleVisibleUpload = (status) => {
    this.setState({ uploadVisible: status })
  }
}
 
export default MarkDownEditor;