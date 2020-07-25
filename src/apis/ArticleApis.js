/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 16:42:28
 * @LastEditTime: 2020-07-25 16:35:48
 */ 

import Axios from '../utils/service.js'

// 查询全部分类
export const APIgetSortList = params => Axios.get('/artice/sort/querySortList', params)
//创建分类
export const APIcreateSort = params => Axios.post('/article/sort/createSort', params)
