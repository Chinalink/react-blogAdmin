/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-02 19:01:33
 * @LastEditTime: 2020-08-25 00:09:20
 */
import React, { Component, Fragment } from 'react';
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { APIgetPicList } from '../../apis/OtherApis'

import './style.css'

class collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fileList: [],
      picList: []
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle, picList } = this.state;
    const token = sessionStorage.getItem('token')
    
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">新增图片</div>
      </div>
    );
    const props = {
      showUploadList: false,
      action: '/upload', //上传地址
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        type: 2
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

    return (
      <div className="photo-container">
        {picList.map((year, yearIndex) => {
          return <Fragment key={year.name}>
            {
              year.children.map((month, monthIndex) => {
                return (
                  <Fragment key={month.name}>
                    <h3>日期：{year.name}-{month.name}</h3>
                    <ul>
                      {(yearIndex === 0 && monthIndex === 0) && <li className="photo-uploader"><Upload listType="picture-card" className="avatar-uploader" {...props} onChange={this.handleChange} onPreview={this.handlePreview}>
                        {uploadButton}
                      </Upload></li>}
                      {(yearIndex === 0 && monthIndex === 0) && fileList.map((item) => {
                        return <li key={item.name}><img src={`http://qf8zthosn.hn-bkt.clouddn.com/${item.name}`} alt="art_pic" /></li>
                      })}
                      {
                        month.children.map((pic) => {
                          return <li key={pic.name}><img src={`http://qf8zthosn.hn-bkt.clouddn.com/${pic.name}`} alt="art_pic" /></li>
                        })
                      }
                    </ul>
                  </Fragment>
                )
                
              })
            }
          </Fragment>
        })}
        {/* <ul>
          <li className="photo-uploader">
            <Upload listType="picture-card" className="avatar-uploader" {...props} onChange={this.handleChange} onPreview={this.handlePreview}>
              {uploadButton}
            </Upload>}
          </li>
          {fileList.map((item) => {
            return <li key={item.name}><img src={`http://qf8zthosn.hn-bkt.clouddn.com/${item.name}`} alt="art_pic" /></li>
          })}
          
        </ul> */}
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
  // 图片上传
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: false });
      var res = info.file.response.data
      const dataObj = {
        uid: res.name,
        name: res.name,
        url: `http://qf8zthosn.hn-bkt.clouddn.com/${res.name}`
      }
      const fileList = this.state.fileList.map(item => {
        return item
      })
      fileList.unshift(dataObj)
      this.setState({ fileList })
    }
  }

  componentDidMount() {
    this.getPicList()
  }

  // 获取图片列表
  getPicList = async (params = {}) => {
    const res = await APIgetPicList(params)
    if (res.code === 0) {
      const picList = res.data.result
      this.setState({ picList })
    }
  }

  //点击预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
}

export default collection;