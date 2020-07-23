/*
 * @Description: 顶栏
 * @Author: HuGang
 * @Date: 2020-07-12 00:21:45
 * @LastEditTime: 2020-07-23 10:54:23
 */ 
import React from 'react';
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

function LayoutHeader(props) {
  const { collapsed, handlerToggle } = props
  const iconMenu = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  return (
    <Header className="home-main__header">
      { React.createElement(iconMenu, { className: 'trigger', onClick: handlerToggle }) }
    </Header>
  )
}

export default LayoutHeader