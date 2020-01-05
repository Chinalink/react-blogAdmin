/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-05 20:55:58
 * @LastEditTime : 2020-01-05 23:35:36
 */
import React from 'react';
import { RenderRoutes } from './index';

import Layout from '../components/Layout';
import Home from '../views/Home';
import Login from '../views/Login';

const Ui = ({ routes }) => <RenderRoutes routes={routes}></RenderRoutes>
const Button = () => <h3>Button</h3>
const Icon = () => <h3>Icon</h3>

export const menus = [
  { path: '/', exact: true, name: '首页', icon: 'video-camera', component: Home },
  {
    path: '/ui', name: 'UI', icon: 'video-camera', component: Ui, routes: [
      { path: '/ui/button', name: '按钮', icon: 'video-camera', component: Button },
      { path: '/ui/icon', name: '图标', icon: 'video-camera', component: Icon }
    ]
  },
]

export const main = [
  { path: '/', component: Layout, routes: menus },
  { path: '/login', component: Login }
]