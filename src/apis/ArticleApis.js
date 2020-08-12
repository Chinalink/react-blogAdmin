/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:28
 * @LastEditTime: 2020-08-12 23:19:18
 */ 

import Axios from '../utils/service.js'

// 分类
export const APIgetCategoryList = params => Axios.get('/article/sort', params) // 查询分类列表
export const APIcreateCategory = params => Axios.post('/article/sort', params)  // 创建分类
export const APIupdateCategory = params => Axios.put(`/article/sort/${params.id}`, params)  // 更新分类
export const APIdeleteCategory = params => Axios.delete(`/article/sort/${params.id}`) // 删除分类
// 文章
export const APIgetArticleList = params => Axios.get('/article/post', params) // 查询文章列表
export const APIcreatePost = params => Axios.post('/article/post', params) // 创建文章
// 标签
export const APIgetTagList = params => Axios.get('/article/tag', params) // 查询标签列表
export const APIcreateTag = params => Axios.post('/article/tag', params) // 创建标签
export const APIupdateTag = params => Axios.put(`/article/tag/${params.id}`, params) // 更新标签
export const APIdeleteTag = params => Axios.delete(`/article/tag/${params.id}`) // 删除标签