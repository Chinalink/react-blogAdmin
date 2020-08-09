/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:28
 * @LastEditTime: 2020-08-09 19:52:16
 */ 

import Axios from '../utils/service.js'

export const APIgetCategoryList = params => Axios.get('/article/sort', params)    // 查询分类列表
export const APIcreateCategory = params => Axios.post('/article/sort', params)       // 创建分类
export const APIupdateCategory = params => Axios.put(`/article/sort/${params.userId}`, params)       // 更新分类
export const APIdeleteCategory = params => Axios.delete(`/article/sort/${params.userId}`)       // 删除分类

export const APIgetArticleList = params => Axios.get('/article/post', params)  // 查询文章列表
export const APIcreatePost = params => Axios.post('/article/post', params)           // 创建文章