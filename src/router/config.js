/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:31:56
 * @LastEditTime: 2020-07-15 22:51:52
 */ 
import React from 'react';
import { RenderRoutes } from './index'

import Home from '../pages/Home'
import ArticleList from '../pages/Article/ArticleList'

const Icon = () => <h3>Icon</h3>
const List = () => <h3>首页</h3>

export const menus = [
  { path: '/', exact: true, title: '首页', component: List },
  {
    path: '/article', title: '文章', component: RenderRoutes, subs: [
      { path: '/article/list', title: '文章列表', component: ArticleList },
      { path: '/article/new', title: '新建文章', component: Icon },
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