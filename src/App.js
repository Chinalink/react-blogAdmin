/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 18:01:15
 * @LastEditTime: 2020-07-25 00:08:21
 */ 
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import { main as mainConfig } from './router/config';
import { renderRoutes } from './router';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* <Switch>通过查找所有的子<Route>并渲染与当前URL匹配的第一个<Route>的内容 */}
      <Switch>
        {renderRoutes(mainConfig)}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
