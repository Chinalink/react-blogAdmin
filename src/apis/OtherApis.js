/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-21 01:16:58
 * @LastEditTime: 2020-08-23 18:28:57
 */
import Axios from '../utils/service.js'

// 图片集
export const APIgetPicList = params => Axios.get('/picture', params) // 获取图片列表