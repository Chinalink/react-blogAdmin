/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-08 17:01:31
 */ 
import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
  }

  render() {
    const formItems = this.getFormItems()
    const fromOptions = { labelCol:{ span: 4 }, onFinish:this.onFinish }
  
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
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = {
      showUploadList: false,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', //上传地址
      beforeUpload(file) {
        console.log(file);
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
      { label: '用户名', name: 'user', render: <Input />, rules: [{ required: true, message: '用户名不能为空' }]},
      { label: '昵称', name: 'nikeName', render: <Input />},
      { name: 'contactInfo', render: <h3>联系信息</h3> },
      { label: '邮箱', name: 'email', render: <Input />, rules: EmailRules },
      { label: '站点', name: 'webUrl', render: <Input />},
      { label: 'QQ', name: 'qq', render: <Input />},
      { label: '微信', name: 'wechat', render: <Input />},
      { label: 'Github', name: 'github', render: <Input />},
      { name: 'aboutYou', render: <h3>关于您自己</h3>},
      { label: '个人说明', name: 'introduce', render: <Input.TextArea rows={4} />},
      {
        label: '资料图片', name: 'avatar', render: 
          <Upload name="avatar" listType="picture-card" className="avatar-uploader" {...props} onChange={this.handleChange} >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
      }
    ]
    return itemArr
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    // console.log(info);
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

  onFinish = (values) => {
    console.log(values)
  }

}

export default UserInfo;