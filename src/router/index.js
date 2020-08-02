/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 19:55:16
 * @LastEditTime: 2020-08-02 13:56:11
 */ 
import React from 'react';
import {Route} from 'react-router-dom'

export const renderRoutes = (routes) => {
  return (
    routes.map((route, index) => (
      <RouteWithSubRoutes key={index} {...route} />
    ))
  )
}

export const RenderRoutes = (props) => {
  const { routes } = props
  return (
    routes.map((route, index) => (
      <RouteWithSubRoutes key={index} {...route} />
    ))
  )
}

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (<route.component {...props} routes={route.subs} />)}
     />
  )
}