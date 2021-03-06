/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:31:56
 * @LastEditTime: 2020-08-23 19:24:23
 */ 
import Home from '../pages/Home/Home.js'
import Index from '../pages/Index/Index.js'
import Login from '../pages/Login/Login.js'
import Photo from '../pages/Photo/Photo.js'
// import Theme from '../pages/Theme/Theme.js'

import ArticleCategory from '../pages/Article/Category/Category.js'
import ArticleList from '../pages/Article/List/List.js'
import ArticleNew from '../pages/Article/New/New.js'
import ArticleTag from '../pages/Article/Tag/Tag.js'

import UserNew from '../pages/Users/New/New.js'
import UserList from '../pages/Users/List/List.js'
import UserInfo from '../pages/Users/Info/Info.js'

export const menus = [
  { path: '/', exact: true, title: '首页', icon: 'HomeOutlined', component: Index },
  {
    path: '/article', title: '文章管理', icon: 'ProfileOutlined', subs: [
      { path: '/article/list', title: '文章列表', component: ArticleList },
      { path: '/article/new', title: '新建文章', component: ArticleNew },
      { path: '/article/edit', title: '编辑文章', menuHide: true, component: ArticleNew },
      { path: '/article/category', title: '分类目录', component: ArticleCategory },
      { path: '/article/tag', title: '标签', component: ArticleTag }
    ]
  },
  {
    path: '/user', title: '用户管理', icon: 'TeamOutlined', subs: [
      { path: '/user/list', title: '用户列表', component: UserList },
      { path: '/user/new', title: '添加用户', component: UserNew },
      { path: '/user/info', title: '个人资料', component: UserInfo },
    ]
  },
  {path: '/photo', title: '图片集', icon: 'AppstoreOutlined', component: Photo },
  // {path: '/theme', title: '主题设置', icon: 'AppstoreOutlined', component: Theme },
]

export const main = [
  { path: '/login', exact: true, title: '登录', component: Login},
  { path: '/', component: Home, subs: menus }
]

export const RouterConfig = {
  main,
  menus
}