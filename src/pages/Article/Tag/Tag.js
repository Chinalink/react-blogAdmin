/*
 * @Description: 分类目录
 * @Author: HuGang
 * @Date: 2020-07-25 09:27:47
 * @LastEditTime: 2020-08-14 00:58:02
 */ 
import React, { Component, Fragment } from 'react';
// 依赖组件
import { Button, Input, Table, Form, message, Modal, Popconfirm } from 'antd'
// API
import * as TagApi from '../../../apis/ArticleApis'

import './style.css'

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      isUpdate: false, // 是否为更新态，用于展示Modal按钮
      modalButtonLoading: false, // 弹窗按钮loading
      modalVisible: false, // 弹窗显示状态
      confirmLoading: false, // 弹窗确认按钮加载态
      pagination: {
        current: 1,
        pageSize: 10
      }
    }
    this.tagFromRef = React.createRef()
  }
  render() {
    const { modalVisible, confirmLoading, isUpdate, tagList, pagination } = this.state
    const columns = this.getTableColumns()
    const formItems = this.getFormItems()
    const ModalFooter = this.renderModalFooterXml()
    const formOptions = { ref: this.tagFromRef, preserve: false, labelCol: { span: 5 }, initialValues: { parentId: 'none' }, name: 'article_category_create' }
    const paginationOption = Object.assign({}, pagination, { showSizeChanger: true })
    return (
      <Fragment>
        <Button className="btn-add-tag" type="primary" onClick={this.openModal}>添加标签</Button>
        <Table bordered columns={columns} dataSource={tagList} pagination={paginationOption} size="middle" className="article-table" onChange={this.handleTableChange} />
        {/* 添加标签Modal  */}
        <Modal
          title={`${isUpdate ? '更新' : '创建'}添加`}
          visible={modalVisible}
          destroyOnClose={true}
          footer={ModalFooter}
          onOk={this.handleSubmitTag}
          confirmLoading={confirmLoading}
          onCancel={this.closeModal}>
          <Form {...formOptions}>
            {formItems.map((item, index) => {
              return <Form.Item key={`sort${index}`} className="search-form__item" {...item}>{item.render && item.render}</Form.Item>
            })}
          </Form>
        </Modal>
      </Fragment>
    )
  }

  renderModalFooterXml = () => {
    const { modalButtonLoading, isUpdate } = this.state
    return [
      <Button key="back" onClick={this.closeModal}>取消</Button>,
      <Button key="submit" type="primary" loading={modalButtonLoading} onClick={this.handleSubmitTag}>{isUpdate ? '更新' : '创建'}</Button>,
    ]
  }

  // 添加标签表单项
  getFormItems = () => {
    const itemArr = [
      { label: '标签ID', name: 'id', render: <Input disabled />, hidden: true },
      { label: '标签名称', name: 'name', render: <Input />, rules: [{ required: true, message: '标签名称不能为空' }] },
      { label: '标签别名', name: 'alias', render: <Input /> },
    ]
    return itemArr
  }
  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'name', title: '标签名称', dataIndex: 'name' },
      { key: 'alias', title: '标签别名', dataIndex: 'alias' },
      {
        key: 'action', title: '操作', dataIndex: 'action', render: (text, record, index) => (
          <div className="table-action">
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditTag.bind(this, text, record, index)}>编辑</Button>
            <Popconfirm title="确认删除该标签吗？" onConfirm={this.handleRemoveTag.bind(this, text, record, index)}>
              <Button className="table-action__button" type="primary" size="small" danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    return columns
  }

  componentDidMount() {
    const { pagination } = this.state
    this.getTagList({ ...pagination })
  }
  // 查询标签列表
  getTagList = async (params = {}) => {
    const res = await TagApi.APIgetTagList(params)
    if (res.code === 0) {
      const { result, total } = res.data
      const data = result.map(item => {
        if (item.alias === null) {
          item.alias = '--'
        }
        item.key = item.id
        return item
      })
      this.setState({ tagList: data, pagination: { ...params, total } })
    }
  }
  // 加载某个页数数据
  handleTableChange = (pagination) => {
    this.getAllArticleList({ ...pagination })
  }
  // 创建、更新标签
  handleSubmitTag = async () => {
    const tagFromData = await this.tagFromRef.current.validateFields()
    const callBack = tagFromData.id ? TagApi.APIupdateTag : TagApi.APIcreateTag
    this.actionCategory(tagFromData, callBack)
  }
  // 删除分类
  handleRemoveTag = (text, record, index) => {
    const params = { id: record.id }

    this.actionCategory(params, TagApi.APIdeleteTag)
  }
  // 打开弹窗
  openModal = () => {
    this.setState({ modalVisible: true })
  }
  // 关闭弹窗 
  closeModal = () => {
    this.setState({ isUpdate: false, modalVisible: false })
  }
  // 编辑分类
  handleEditTag = (text, record, index) => {
    this.setState({ isUpdate: true })
    const formData = Object.assign({}, record)
    this.openModal()
    setTimeout(() => {
      this.tagFromRef.current.setFieldsValue(formData)
    }, 50)
  }
  
  actionCategory = async (values, APIcallBack) => {
    const res = await APIcallBack(values)

    if (res.code === 0) {
      message.info(res.msg)
      this.closeModal()
      this.getTagList()
    }
  }
}

export default TagList;