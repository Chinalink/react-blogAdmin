/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:01:04
 * @LastEditTime: 2020-08-12 00:03:04
 */ 
// lib
import React, { Component } from 'react';
import { Layout } from 'antd';

// component
import Sider from '../../components/Layout/Sider/Sider.js'
import Header from '../../components/Layout/Header/Header.js'
import Breadcrumb from '../../components/Layout/Breadcrumb/Breadcrumb.js'

import { renderRoutes } from '../../router';
import './style.css'

const { Content } = Layout

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuData: [
        { text: '个人资料', key: 'edit', icon: 'SettingOutlined' },
        { divider: true },
        { text: '退出登录', key: 'loginOut', icon: 'LogoutOutlined' }
      ]
    }
  }

  render() {
    const { collapsed, menuData } = this.state
    const { routes } = this.props

    return (
      <div className="home-wrap">
        <Layout className="home-layout">
          <Sider collapsed={collapsed} routes={routes} />
          <Layout className="home-main">
            <Header collapsed={collapsed} handlerToggle={this.toggle} menuData={menuData} handlerMenu={this.handlerMenu} userInfo={JSON.parse(sessionStorage.userInfo)} />
            <div className="home-main__wrap">
              <Breadcrumb routes={routes} />
              <Content className="home-main__content">
                {renderRoutes(routes)}
              </Content>
            </div>
          </Layout>
        </Layout>
      </div>
    )
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  
  handlerMenu = ({ key }) => {
    const { history } = this.props

    switch (key) {
      case 'edit':
        history.push({ pathname: '/user/info', state: { userId: JSON.parse(localStorage.userInfo).uid} })
        break;
      case 'loginOut':
        sessionStorage.clear()
        history.push({ pathname: '/login' })
        break;
      default:
        break;
    }
  }

}
 
export default Home;