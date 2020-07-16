/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 18:01:15
 * @LastEditTime: 2020-07-12 13:25:35
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root')

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
