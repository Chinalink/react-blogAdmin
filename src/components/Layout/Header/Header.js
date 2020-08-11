/*
 * @Description: 顶栏
 * @Author: HuGang
 * @Date: 2020-07-12 00:21:45
 * @LastEditTime: 2020-08-12 00:23:00
 */ 
import React from 'react';
import { Layout } from 'antd'
import { Avatar, Menu, Dropdown } from 'antd';
import * as Icon from '@ant-design/icons';

const { Header } = Layout;

function LayoutHeader(props) {
  const { collapsed, handlerToggle, menuData, handlerMenu, userInfo } = props
  const iconMenu = collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'
  const UserAvatar = React.createElement(Icon['UserOutlined'])

  const menu = () => {
    return (
      <Menu onClick={handlerMenu}>
        {
          menuData.map((item, index) => {
            if (!item.divider) {
              const MenuIcon = React.createElement(Icon[item.icon])
              return <Menu.Item key={item.key} icon={MenuIcon}><span>{item.text}</span></Menu.Item>
            }
            return <Menu.Divider key={`divider${index}`} />
          })
        }
      </Menu>
    )
  }

  return (
    <Header className="home-main__header">
      { React.createElement(Icon[iconMenu], { className: 'trigger', onClick: handlerToggle }) }
      <Dropdown overlay={menu}>
        <div className="user-info">
          {
            userInfo.avatar ? <img className="home-avatar" src={userInfo.avatar} /> : <Avatar style={{ backgroundColor: '#008dff' }} icon={UserAvatar} />
          }
          <span className="home-user-name">{userInfo.name}</span>
        </div>
      </Dropdown>
    </Header>
  )
}

export default LayoutHeader