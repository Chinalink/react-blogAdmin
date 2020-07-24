/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-24 13:49:44
 * @LastEditTime: 2020-07-24 13:53:06
 */ 
import Axios from '../utils/service.js'

 //获取用户信息
export const APIgetUserInfo = params => Axios.get('/user/info', params)
// 更新用户信息
export const APIupdateUserInfo = params => Axios.post('/user/updateInfo', params)