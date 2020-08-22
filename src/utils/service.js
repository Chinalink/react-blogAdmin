/*
 * @Description: axios 封装
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:05
 * @LastEditTime: 2020-08-22 20:59:17
 */ 
import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd';
import { history } from '../router/index'

const Axios = axios.create({
  // baseURL: 'http://127.0.0.1:3444/apis',
  timeout: 15000,
  withCredentials: true, // 是否允许携带Cookie
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
})

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    message.error('请求超时')
    console.warn("请求超时")
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data && res.data.code !== 0) {
      if(res.data.code !== 1) {
        message.error(res.data.msg)
      }
      return Promise.resolve(res)
    }
    return res
  },
  error => {
    if(error && error.response) {
      const errorMsg = (error.response.data && error.response.data.msg) || '网络请求错误'
      message.warning(errorMsg)
      if(error.response.status === 401 && error.response.data.code === 1002) {
        history.push({ pathname: '/login'})
      }
      return Promise.reject(error.response.data)
    } else {
      message.error('没有联系到服务器哟~')
      return Promise.reject(error)
    }
  }
)

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(url, { params: params }).then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  put(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.put(url, params, config).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, {params: params}).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
        .catch((error) => {
          reject(error)
        })
    })
  },
  postToForm(url, params = {}, config = {}) {
    params = Qs.stringify(params)
    config.headers = { "Content-Type": "application/x-www-form-urlencoded" }
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
        .catch((error) => {
          reject(error)
        })
    })
  }
}