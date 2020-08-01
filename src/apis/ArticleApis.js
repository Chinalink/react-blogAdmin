/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:28
 * @LastEditTime: 2020-07-31 12:58:22
 */ 

import Axios from '../utils/service.js'

// 查询全部分类
export const APIgetSortList = params => Axios.get('/article/sort/querySortList', params)
//创建分类
export const APIcreateSort = params => Axios.post('/article/sort/createSort', params)

// 查询全部文章
export const APIgetArticleList = params => Axios.get('/article/post/queryArticleList', params)
// 新建文章
export const APIcreatePost = params => Axios.post('/article/post/createPost', params)