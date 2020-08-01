/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:28
 * @LastEditTime: 2020-08-01 19:17:45
 */ 

import Axios from '../utils/service.js'

export const APIgetCategoryList = params => Axios.get('/article/sort/querySortList', params)    // 查询分类列表
export const APIcreateCategory = params => Axios.post('/article/sort/createSort', params)       // 创建分类
export const APIupdateCategory = params => Axios.put('/article/sort/updateSort', params)       // 更新分类
export const APIdeleteCategory = params => Axios.delete('/article/sort/deleteSort', params)       // 删除分类

export const APIgetArticleList = params => Axios.get('/article/post/queryArticleList', params)  // 查询文章列表
export const APIcreatePost = params => Axios.post('/article/post/createPost', params)           // 创建文章