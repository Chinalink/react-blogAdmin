/*
 * @Description: axios 封装
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:05
 * @LastEditTime: 2020-07-24 13:55:41
 */ 
import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd';

const Axios = axios.create({
  baseURL: '127.0.0.1:3333/apis',
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
    // if (getCookie("token")) {
    // config.headers.token = getCookie("token");
    // }
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
      switch (res.data.code) {
        case 4444:
          return Promise.reject(res)
        default:
          message.error('系统繁忙，请稍后再试')
          return Promise.reject(res)
      }
    }
    return res
  },
  error => {
    if (error.response.status === 504 || error.response.status === 404) {
      message.warning('服务器被吃了⊙﹏⊙∥')
      console.warn("服务器被吃了⊙﹏⊙∥")
    } else if (error.response.status === 401) {
      message.warning('登录信息失效⊙﹏⊙∥')
      console.warn("登录信息失效⊙﹏⊙∥")
    } else if (error.response.status === 500) {
      message.warning('服务器开小差了⊙﹏⊙∥')
      console.warn("服务器开小差了⊙﹏⊙∥")
    }
    return Promise.reject(error)
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