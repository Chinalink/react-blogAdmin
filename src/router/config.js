/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:31:56
 * @LastEditTime: 2020-08-08 15:09:55
 */ 
import React from 'react';
import { RenderRoutes } from './index'

import Home from '../pages/Home/Home.js'
import Login from '../pages/Login/Login.js'

import ArticleList from '../pages/Article/List/List.js'
import ArticleNew from '../pages/Article/New/New.js'
import ArticleCategory from '../pages/Article/Category/Category.js'

import UserNew from '../pages/Users/New/New.js'
import UserList from '../pages/Users/List/List.js'
import UserInfo from '../pages/Users/Info/Info.js'

const List = () => <h3>首页</h3>

export const menus = [
  { path: '/index', title: '首页', component: List },
  {
    path: '/article', title: '文章管理', component: RenderRoutes, subs: [
      { path: '/article/list', title: '文章列表', component: ArticleList },
      { path: '/article/new', title: '新建文章', component: ArticleNew },
      { path: '/article/category', title: '分类目录', component: ArticleCategory },
      { path: '/article/tag', title: '标签', component: UserList }
    ]
  },
  {
    path: '/user', title: '用户管理', component: RenderRoutes, subs: [
      { path: '/user/list', title: '用户列表', component: UserList },
      { path: '/user/new', title: '添加用户', component: UserNew },
      { path: '/user/info', title: '个人资料', component: UserInfo },
    ]
  },
  {
    path: '/theme', title: '主题设置', component: RenderRoutes, 
  },
]

export const main = [
  { path: '/login', exact: true, title: '登录', component: Login},
  { path: '/', component: Home, subs: menus }
]

export const RouterConfig = {
  main,
  menus
}