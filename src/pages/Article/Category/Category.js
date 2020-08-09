/*
 * @Description: 分类目录
 * @Author: HuGang
 * @Date: 2020-07-25 09:27:47
 * @LastEditTime: 2020-08-09 16:59:00
 */ 
import React, { Component } from 'react';
// 依赖组件
import { Row, Col, Button, Input, TreeSelect, Table, Form, message, Modal, Popconfirm } from 'antd';
// 依赖工具 & API
import Utils from '../../../utils/utils'
import { APIcreateCategory, APIupdateCategory, APIdeleteCategory, APIgetCategoryList } from '../../../apis/ArticleApis'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false, // 是否为更新态，用于展示Modal按钮
      tableLoading: true, // 表格loading 
      modalButtonLoading: false, // 弹窗按钮loading
      modalVisible: false, // 弹窗显示状态
      confirmLoading: false, // 弹窗确认按钮加载态
      categoryData: [], // 分类列表数据
      categoryTreeData: [ // TreeSelect 分类数据
        { title: '无', value: 'none' }
      ]
    }
    this.categoryFromRef = React.createRef()
  }

  componentDidMount() {
    this.getCategoryList()
  }

  render() {
    const { modalVisible, tableLoading, confirmLoading, categoryData, isUpdate } = this.state
    const columns = this.getTableColumns()
    const formOptions = { ref: this.categoryFromRef, preserve:false, labelCol: { span: 5 }, initialValues: { parentId: 'none' }, name: 'article_category_create' }
    const formItems = this.getFormItems()
    const ModalFooter = this.renderModalFooterXml()
    
    return (
      <Row gutter={[0, 16]}>
        <Col span="24">
          <Button type="primary" onClick={this.openModal}>添加分类目录</Button>
        </Col>
        <Col span="24">
          <Table bordered columns={columns} loading={tableLoading} dataSource={categoryData} size="middle" className="article-table" />
        </Col>
        {/* 创建分类Modal */}
        <Modal 
          title={`${isUpdate ? '更新' : '创建'}分类目录`}
          visible={modalVisible}
          destroyOnClose={true}
          footer={ModalFooter}
          onOk={this.handleSubmitCategory}
          confirmLoading={confirmLoading}
          onCancel={this.closeModal}>
          <Form {...formOptions}>
            {formItems.map((item, index) => {
              return <Form.Item key={`sort${index}`} className="search-form__item" {...item}>{item.render && item.render}</Form.Item>
            })}
          </Form>
        </Modal>
      </Row>
    )
  }

  renderModalFooterXml = () => {
    const { modalButtonLoading, isUpdate } =this.state
    return [
      <Button key="back" onClick={this.closeModal}>取消</Button>,
      <Button key="submit" type="primary" loading={modalButtonLoading} onClick={this.handleSubmitCategory}>{isUpdate ? '更新' : '创建'}</Button>,
    ]
  }

  // 表单项
  getFormItems = () => {
    const { categoryTreeData } = this.state
    const itemArr = [
      { label: '分类ID', name: 'id', render: <Input disabled />, hidden: true },
      { label: '分类名称', name: 'name', render: <Input />, rules: [ {required: true, message: '分类名称不能为空' } ] },
      { label: '分类别名', name: 'alias', render: <Input />  },
      { label: '分类描述', name: 'desc', render: <Input /> },
      { label: '父级分类目录', name: 'parentId', render: <TreeSelect treeData={categoryTreeData} placeholder="请选择父级分类" /> }
    ]
    return itemArr
  }

  // 表格列配置
  getTableColumns = () => {
    const columns = [
      { key: 'name', title: '名称', dataIndex: 'name' },
      { key: 'alias', title: '别名', dataIndex: 'alias' },
      { key: 'desc', title: '分类描述', dataIndex: 'desc' },
      { key: 'num', title: '文章数量', dataIndex: 'num' },
      {
        key: 'action', title: '操作', render: (text, record, index) => (
          <div className="table-action">
            <Button className="table-action__button" type="primary" size="small" onClick={this.handlePreviewArticle.bind(this, text, record, index)}>查看</Button>
            <Button className="table-action__button" type="primary" size="small" onClick={this.handleEditCategory.bind(this, text, record, index)}>编辑</Button>
            <Popconfirm title="确认删除该分类吗？" onConfirm={this.handleRemoveCategory.bind(this, text, record, index)}>
              <Button className="table-action__button" type="primary" size="small" danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    ]
    return columns
  }

  // 查询分类列表目录
  getCategoryList = async () => {
    this.setState({ tableLoading: true })
    const res = await APIgetCategoryList()
    if(res.code === 0) {
      // 添加额外字段，用作antd table treeSelect使用
      const result = res.data.map(item => {
        item.title = item.name // treeSelect 需要
        item.value = item.id // treeSelect 需要
        item.key = item.id // treeTable 需要
        return item
      })
      // 数据格式转换
      const parentArr = result.filter(i => i.parentId == null)
      const categoryData = Utils.arrToTreeData(result, parentArr, 'parentId')
      const categoryTreeData = this.state.categoryTreeData.concat(categoryData)
      this.setState({ categoryData, categoryTreeData, tableLoading: false})
    }
  }

  // 打开弹窗
  openModal = () => {
    this.setState({ modalVisible: true })
  }
  
  // 关闭弹窗 
  closeModal = () => {
    this.setState({ isUpdate: false, modalVisible: false })
  }

  // 创建、更新分类
  handleSubmitCategory = async () => {
    const categoryFromData = await this.categoryFromRef.current.validateFields()
    const callBack = categoryFromData.id ? APIupdateCategory : APIcreateCategory
    this.actionCategory(categoryFromData, callBack)
  }

  actionCategory = async (values, APIcallBack) => {
    const res = await APIcallBack(values)
    
    if(res.code === 0) {
      message.info(res.msg)
      this.closeModal()
      this.getCategoryList()
    }
  }
  
  // 查看当前分类目录的文章
  handlePreviewArticle = (text, record, index) => {
    
  }

  // 编辑分类
  handleEditCategory = (text, record, index) => {
    console.log(text);
    this.setState({isUpdate: true})
    console.log(record)
    const formData = Object.assign({}, record)
    if (formData.parentId === null) {
      formData.parentId = 'none'
    }
    this.openModal()
    setTimeout(() => {
      this.categoryFromRef.current.setFieldsValue(formData)
    }, 50)
  }

  // 删除分类
  handleRemoveCategory = (text, record, index) => {
    const params = { id: record.id }
    
    this.actionCategory(params, APIdeleteCategory) 
  }
}

export default Category;