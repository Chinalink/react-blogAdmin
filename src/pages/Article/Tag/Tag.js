/*
 * @Description: 分类目录
 * @Author: HuGang
 * @Date: 2020-07-25 09:27:47
 * @LastEditTime: 2020-08-09 00:51:22
 */ 
import React, { Component, Fragment } from 'react';
// 依赖组件
import { Button, Input, Table, Form, Modal } from 'antd'
// API
import { APIgetUserList } from '../../../apis/UserApis'

import './style.css'

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagData: [],
      isUpdate: false, // 是否为更新态，用于展示Modal按钮
      modalButtonLoading: false, // 弹窗按钮loading
      modalVisible: false, // 弹窗显示状态
      confirmLoading: false, // 弹窗确认按钮加载态
    }
  }
  render() {
    const { modalVisible, confirmLoading, isUpdate, userData } = this.state
    const columns = this.getTableColumns()
    const formItems = this.getFormItems()
    const ModalFooter = this.renderModalFooterXml()
    const formOptions = { ref: this.categoryFromRef, preserve: false, labelCol: { span: 5 }, initialValues: { parentId: 'none' }, name: 'article_category_create' }

    return (
      <Fragment>
        <Button className="btn-add-tag" type="primary" onClick={this.openModal}>添加标签</Button>
        <Table bordered columns={columns} dataSource={userData} size="middle" className="article-table" />
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
      { label: '标签名称', name: 'name', render: <Input />, rules: [{ required: true, message: '标签名称不能为空' }] },
      { label: '标签别名', name: 'alias', render: <Input /> },
    ]
    return itemArr
  }
  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'name', title: '标签名称', dataIndex: 'user' },
      { key: 'alias', title: '标签别名', dataIndex: 'nickName' },
      // {
      //   key: 'action', title: '操作', dataIndex: 'action', render: (text, record, index) => (
      //     <div className="table-action">
      //       <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditArticle.bind(this, text, record, index)}>编辑</Button>
      //       <Button className="table-action__button" type="primary" size="small" danger onClick={this.handleRemoveArticle.bind(this, text, record, index)}>删除</Button>
      //     </div>
      //   )
      // }
    ]
    return columns
  }

  componentDidMount() {
    this.getUserList()
  }
  // 查询标签列表
  getUserList = async () => {
    const res = await APIgetUserList()
    const userData = res.data
    this.setState({ userData })
  }
  // 打开弹窗
  openModal = () => {
    this.setState({ modalVisible: true })
  }

  // 关闭弹窗 
  closeModal = () => {
    this.setState({ isUpdate: false, modalVisible: false })
  }
  // 校验表单项并提交
  handleSubmitTag = async () => {
    console.log('gggg');
    // const categoryFromData = await this.categoryFromRef.current.validateFields()
    // const callBack = categoryFromData.id ? APIupdateCategory : APIcreateCategory
    // this.actionCategory(categoryFromData, callBack)
  }
}
 
export default TagList;