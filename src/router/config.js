/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:31:56
 * @LastEditTime: 2020-07-24 12:55:39
 */ 
import React from 'react';
import { RenderRoutes } from './index'

import Home from '../pages/Home/Home.js'
import ArticleList from '../pages/Article/List/List.js'
import ArticleNew from '../pages/Article/New/New.js'

const Icon = () => <h3>Icon</h3>
const List = () => <h3>首页</h3>

export const menus = [
  { path: '/', exact: true, title: '首页', component: List },
  {
    path: '/article', title: '文章管理', component: RenderRoutes, subs: [
      { path: '/article/list', title: '文章列表', component: ArticleList },
      { path: '/article/new', title: '新建文章', component: ArticleNew },
      { path: '/article/category', title: '分类目录', component: Icon },
      { path: '/article/tag', title: '标签', component: Icon }
    ]
  }
]

export const main = [
  { path: '/', component: Home, subs: menus }
]

export const RouterConfig = {
  main,
  menus
}