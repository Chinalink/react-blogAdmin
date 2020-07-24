/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 19:55:16
 * @LastEditTime: 2020-07-25 00:24:35
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
      render={() => (<route.component routes={route.subs} />)}
     />
  )
}