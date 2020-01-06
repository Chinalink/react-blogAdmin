/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-03 16:04:42
 * @LastEditTime : 2020-01-06 11:46:35
 */
import React from 'react';
import { LayoutWrap, MainWrap } from './style';
import Sider from '../Sider';
import Header from '../Header';
import Crumb from '../Crumb';
import Main from '../Main';

const DefaultLayout = (props) => {
  const { routes } = props
  return ( 
    <LayoutWrap>
      {/* 侧边栏 */}
      <Sider />
      {/* 内容 */}
      <MainWrap>
        <Header />
        <Crumb />
        <Main routes={routes} />
      </MainWrap>
    </LayoutWrap>
  );
}
 
export default DefaultLayout;