/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 21:34:30
 * @LastEditTime: 2020-07-15 22:44:48
 */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

class LayoutSider extends Component {

  render() { 
    const { collapsed, routes } = this.props

    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu theme="dark" defaultSelectedKeys={[routes[0].path]} mode="inline">
          {routes.map(this.renderMenuListXml)}
        </Menu>
      </Sider>
    );
  }

  renderMenuListXml = (routeItem) => {
    if (routeItem.subs && routeItem.subs.length > 0) {
      return this.renderSubMenuXml(routeItem)
    }
    return this.renderMenuXml(routeItem)
  }

  // 渲染带子菜单的menu
  renderSubMenuXml = (routeItem) => {
    return (
      <SubMenu key={routeItem.path} title={routeItem.title}>
        {routeItem.subs.map(this.renderMenuListXml)}
      </SubMenu>
    )
  }
  
  renderMenuXml = (routeItem) => {
    return (
      <Menu.Item key={routeItem.path}>
        <Link to={routeItem.path}>{routeItem.title}</Link>
      </Menu.Item>
    )
  }

}

export default LayoutSider;