/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-05 20:30:30
 * @LastEditTime : 2020-01-05 22:37:24
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { main } from './config';

// 循环渲染当前路由数组中一维数组中的组件
export const RenderRoutes = ({ routes }) => {
  return (
    routes.map((route, index) =>
      <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props} routes={route.routes} />} />
    )
  )
}

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RenderRoutes routes={main}></RenderRoutes>
      </Switch>
    </BrowserRouter>
  )  
}