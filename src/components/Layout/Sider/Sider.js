/*
 * @Description: 侧栏导航
 * @Author: HuGang
 * @Date: 2020-07-11 21:34:30
 * @LastEditTime: 2020-08-23 19:28:06
 */ 
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import * as Icon from '@ant-design/icons';

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
    const MenuIcon = routeItem.icon && React.createElement(Icon[routeItem.icon], { style: { fontSize: '14px' } })
    return (
      <SubMenu key = {routeItem.path}
        title={
          <span>
            { routeItem.icon && MenuIcon }
            <span>{ routeItem.title }</span>
          </span>
        }>
        {routeItem.subs.map(this.renderMenuListXml)}
      </SubMenu>
    )
  }
  
  renderMenuXml = (routeItem) => {
    const MenuIcon = routeItem.icon && React.createElement(Icon[routeItem.icon], { style: { fontSize: '14px' } })
    if (!routeItem.menuHide) {
      return (
        <Menu.Item key={routeItem.path} icon={routeItem.icon && MenuIcon}>
          <Link to={routeItem.path}>{routeItem.title}</Link>
        </Menu.Item>
      )
    }
    return []
  }

}

export default LayoutSider;