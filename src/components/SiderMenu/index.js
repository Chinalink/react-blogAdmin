/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-05 23:00:48
 * @LastEditTime : 2020-01-05 23:36:21
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu

const SiderMenu = (item) => {

  const renderSubMenu = (item) => {
    return (
      <SubMenu key={item.path} title={
        <span>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </span>
      }>
        {item.routes.map(renderMenu)}
      </SubMenu>
    )
  }

  const renderMenu = (item) => {
    return (
      <Menu.Item key={item.path}>
        <Link to={(item.path)}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    )
  }

  return item.routes && item.routes.length > 0 ? renderSubMenu(item) : renderMenu(item)
  
}
 
export default SiderMenu;