/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-02 15:28:42
 * @LastEditTime : 2020-01-03 16:04:04
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
