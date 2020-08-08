/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-24 13:49:44
 * @LastEditTime: 2020-08-08 23:47:53
 */ 
import Axios from '../utils/service.js'

// 登录
export const APIUserLogin = params => Axios.post('/login', params)
// 注册
export const APIUserRegister = params => Axios.post('/register', params)
//获取用户信息
export const APIgetUserInfo = params => Axios.get('/user', params)
// 更新用户信息
export const APIupdateUserInfo = params => Axios.post('/user/updateInfo', params)
// 获取用户角色列表
export const APIgetRolesList = params => Axios.get('/user/roles', params)
// 获取用户列表
export const APIgetUserList = params => Axios.get('/user/list', params)
