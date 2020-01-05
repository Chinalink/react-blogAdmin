/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-06 00:12:52
 * @LastEditTime : 2020-01-06 00:59:01
 */
import React from 'react';
import { RenderRoutes } from '../../router';
import { Layout } from 'antd';
const { Content } = Layout

const Main = (props) => {
  console.log(props);
  return ( 
    <Content className="content-box">
      <RenderRoutes routes={props.routes}></RenderRoutes>
    </Content>
  );
}
 
export default Main;