/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-23 18:30:17
 */
import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import utils from '../../../utils/utils'

// 用户信息的获取更新
import { APIgetUserInfo, APIupdateUserInfo } from '../../../apis/UserApis'

import './style.css'

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailRules: [
        { type: 'email', message: '请输入正确的邮箱地址!' },
        { required: true, message: '请输入你的邮箱!' },
      ],
      loading: false
    }
    this.userFromRef = React.createRef()
  }

  render() {
    const formItems = this.getFormItems()
    const fromOptions = { ref: this.userFromRef, labelCol: { span: 4 }, onFinish: this.onFinish }

    return (
      <Fragment>
        <Form {...fromOptions} className="user-new__wrap">
          {
            formItems.map((item, index) => {
              return <Form.Item key={item.name} {...item}>{item.render && item.render}</Form.Item>
            })
          }
          <Form.Item className="user-form-submit">
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }

  getFormItems = () => {
    const { EmailRules, imageUrl } = this.state
    const token = sessionStorage.getItem('token')
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      showUploadList: false,
      action: '/upload', //上传地址
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        type: 1
      },
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
      }
    };
    const itemArr = [
      { name: 'basicInfo', render: <h3>基本信息</h3> },
      { label: '用户名', name: 'user', render: <Input disabled />, rules: [{ required: true, message: '用户名不能为空' }] },
      { label: '昵称', name: 'nickName', render: <Input /> },
      { name: 'contactInfo', render: <h3>联系信息</h3> },
      { label: '邮箱', name: 'email', render: <Input />, rules: EmailRules },
      { label: 'QQ', name: 'qq', render: <Input /> },
      { label: '微信', name: 'wechat', render: <Input /> },
      { label: 'Github', name: 'github', render: <Input /> },
      { name: 'aboutYou', render: <h3>关于您自己</h3> },
      { label: '个人简介', name: 'introduce', render: <Input.TextArea rows={4} /> },
      {
        label: '头像', name: 'avatar', render:
          <Upload listType="picture-card" className="avatar-uploader" {...props} onChange={this.handleChange} >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
      }
    ]
    return itemArr
  }

  // 图片上传
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  componentDidMount() {
    this.getUserInfo()
  }

  // 获取用户信息
  getUserInfo = async () => {
    const { location } = this.props
    const userInfo = JSON.parse(utils.sessionGetItem('userInfo'))
    let params
    if (location.state) {
      params = { userId: location.state.userId }
    } else {
      params = { userId: userInfo.uid }
    }
    const res = await APIgetUserInfo(params)
    if (res.code === 0) {
      Object.keys(res.data).map((key) => {
        if (res.data[key] == null) {
          res.data[key] = ''
          return key
        }
      })
      this.setState({ imageUrl: res.data.avatar })
      // const formData = Object.assign({}, res.data)
      setTimeout(() => {
        this.userFromRef.current.setFieldsValue(res.data)
      }, 50)
    }
  }

  // 更新用户资料
  onFinish = async (values) => {
    const { history, location } = this.props
    const userInfo = JSON.parse(utils.sessionGetItem('userInfo'))

    delete values.basicInfo
    delete values.contactInfo
    delete values.aboutYou

    //更新本地缓存头像
    if (values.avatar instanceof Object) {
      const avatorName = values.avatar.file.response.data.name
      const avatorUrl = `http://qf8zthosn.hn-bkt.clouddn.com/${avatorName}`
      values.avatar = avatorUrl
      userInfo.avatar = avatorUrl
    } else {
      userInfo.avatar = values.avatar
    }
    //更新本地缓存昵称
    userInfo.name = values.nickName
    utils.sessionSetItem('userInfo', JSON.stringify(userInfo))

    if (location.state) {
      values.userId = location.state.userId
    } else {
      values.userId = userInfo.uid
    }
    const res = await APIupdateUserInfo(values)
    if (res.code === 0) {
      history.push({ pathname: '/user/list' })
    }
  }

}

export default UserInfo;