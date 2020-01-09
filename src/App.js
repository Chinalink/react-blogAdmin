/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-05 19:22:04
 * @LastEditTime : 2020-01-09 16:14:18
 */
import React from 'react';
import { MainRouter } from './router';
// antd 语言包
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// 引入redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <MainRouter></MainRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App