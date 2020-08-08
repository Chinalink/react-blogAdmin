/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 18:01:15
 * @LastEditTime: 2020-08-08 21:54:58
 */ 
import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom'
import { main as mainConfig } from './router/config';
import { renderRoutes, history } from './router';

import './App.css'

function App() {
  return (
    <Router history={history}>
      {/* <Switch>通过查找所有的子<Route>并渲染与当前URL匹配的第一个<Route>的内容 */}
      <Switch>
        {renderRoutes(mainConfig)}
        <Redirect from='/' to='/index' />
      </Switch>
    </Router>
  );
}

export default App;
