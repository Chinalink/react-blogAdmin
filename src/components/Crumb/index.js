/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-06 11:25:53
 * @LastEditTime : 2020-01-06 17:44:11
 */
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { menus } from '../../router/config';


const Crumb = (props) => {
  const pathName = props.history.location.pathname
  const [extraBreadcrumbsItems, setExtraBreadcrumbsItems] = useState(null)

  const getPath = () => {
    const routes = deepFlatten(menus)
    const pathSnippets = props.history.location.pathname.split('/').filter(i => i)
    const crumbsItems = pathSnippets.map((item, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return routes.map((route) => {
        if (route.path === url) {
          return (
            <Breadcrumb.Item key={url}>
              {route.routes ? route.name : <Link to={url}>{route.name}</Link>}
            </Breadcrumb.Item>
          )
        }
      })
    })
    setExtraBreadcrumbsItems(crumbsItems)
  }

  const deepFlatten = (arr) => {
    let temp = []
    arr.forEach(item => {
      temp.push(item)
      if(item.routes) {
        temp = temp.concat(deepFlatten(item.routes))
      }
    })
    return temp
  }

  useEffect(getPath, [pathName])

  return (
    <Breadcrumb className="crumb">
      <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
      {extraBreadcrumbsItems}
    </Breadcrumb>
  );
}
 
export default withRouter(Crumb);