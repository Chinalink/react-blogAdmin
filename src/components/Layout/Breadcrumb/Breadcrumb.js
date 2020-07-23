/*
 * @Description: 面包屑导航
 * @Author: HuGang
 * @Date: 2020-07-14 13:33:55
 * @LastEditTime: 2020-07-23 10:54:31
 */ 
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

import { Breadcrumb } from 'antd';

class LayoutBreadcrumb extends Component {

  render() {
    return (
      <Breadcrumb className="home-main_breadcrumb">
        <Breadcrumb.Item key='/'><Link to='/'>首页</Link></Breadcrumb.Item>
        {this.renderCrumbListXml()}
      </Breadcrumb>
    );
  }

  // 渲染面包屑导航
  renderCrumbListXml = () => {
    const { routes, location } = this.props
    const { pathname } = location
    const breadCrumbRoutes = this.flattenRoutes(routes)
    const pathArr = pathname.split('/').filter(i => i)

    const crumbList = pathArr.map((crumb, index) => {
      const url = `/${pathArr.slice(0, index + 1).join('/')}`
      const name = breadCrumbRoutes.find(item => item.path === url).title

      return (
        <Breadcrumb.Item key={url}>{name}</Breadcrumb.Item>
      )
    })
    
    return crumbList
  }

  // 多维对象数组拉平为对象数组
  flattenRoutes = (arr) => {
    let result = []
    arr.forEach(item => {
      if (Array.isArray(item.subs)) {
        result.push(item)
        result = result.concat(this.flattenRoutes(item.subs))
      } else {
        result.push(item)
      }
    })
    return result
  }

}
 
export default withRouter(LayoutBreadcrumb);