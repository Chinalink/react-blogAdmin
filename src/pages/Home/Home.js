/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 20:01:04
 * @LastEditTime: 2020-07-23 19:43:44
 */ 
// lib
import React, { Component } from 'react';
import { Layout } from 'antd';

// component
import Sider from '../../components/Layout/Sider/Sider.js'
import Header from '../../components/Layout/Header/Header.js'
import Breadcrumb from '../../components/Layout/Breadcrumb/Breadcrumb.js'

import { RenderRoutes } from '../../router';
import './style.css'

const { Content } = Layout

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  render() {
    const { collapsed } = this.state
    const { routes } = this.props

    return (
      <div className="home-wrap">
        <Layout className="home-layout">
          <Sider collapsed={collapsed} routes={routes} />
          <Layout className="home-main">
            <Header collapsed={collapsed} handlerToggle={this.toggle} />
            <div className="home-main__wrap">
              <Breadcrumb routes={routes} />
              <Content className="home-main__content">
                <RenderRoutes routes={routes} />
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
}
 
export default Home;