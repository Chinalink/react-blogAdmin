/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 19:55:16
 * @LastEditTime: 2020-08-20 22:46:13
 */ 
import React from 'react';
import {Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const renderRoutes = (routes) => {
  return (
    routes.map((route, index) => (
      <RouteWithSubRoutes key={index} {...route} />
    ))
  )
}

export const RouteWithSubRoutes = (route) => {
  if(route.component) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props) => {
          const token = sessionStorage.getItem('token')
          if(!token && route.subs) {
            return <Redirect to='/login' />
          }
          document.title = route.title ? `${route.title} - 呆呆萌萌Blog管理系统` : '呆呆萌萌Blog管理系统'
          return <route.component {...props} routes={route.subs} />
        }}
      />
    )
  }
  if(route.subs && route.subs.length > 0) {
    return renderRoutes(route.subs)
  }
  return []
}