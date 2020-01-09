/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-05 19:22:04
 * @LastEditTime : 2020-01-07 16:38:59
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { MainRouter } from './router';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <MainRouter></MainRouter>
    </ConfigProvider>
  )
}

export default App