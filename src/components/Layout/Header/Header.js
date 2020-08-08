/*
 * @Description: 顶栏
 * @Author: HuGang
 * @Date: 2020-07-12 00:21:45
 * @LastEditTime: 2020-08-08 23:09:00
 */ 
import React from 'react';
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

function LayoutHeader(props) {
  const { collapsed, handlerToggle, menuData, handlerMenu } = props
  const iconMenu = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined

  const menu = () => {
    return (
      <Menu onClick={handlerMenu}>
        {
          menuData.map((item, index) => {
            if (!item.divider) {
              return <Menu.Item key={item.key}><span>{item.text}</span></Menu.Item>
            }
            return <Menu.Divider key={`divider${index}`} />
          })
        }
      </Menu>
    )
  }

  return (
    <Header className="home-main__header">
      { React.createElement(iconMenu, { className: 'trigger', onClick: handlerToggle }) }
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Avatar className="home-avatar" style={{ backgroundColor: '#008dff' }} icon={<UserOutlined />} />
          <span>呆呆萌萌的超级管理员</span>
        </a>
      </Dropdown>
    </Header>
  )
}

export default LayoutHeader