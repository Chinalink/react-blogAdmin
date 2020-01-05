/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-03 16:04:42
 * @LastEditTime : 2020-01-06 00:16:10
 */
import React from 'react';
import { LayoutWrap, MainWrap } from './style';
import Sider from '../Sider';
import Main from '../Main';

const DefaultLayout = (props) => {
  return ( 
    <LayoutWrap>
      {/* 侧边栏 */}
      <Sider />
      {/* 内容 */}
      <MainWrap>
        <Main routes={props.routes} />
      </MainWrap>
    </LayoutWrap>
  );
}
 
export default DefaultLayout;