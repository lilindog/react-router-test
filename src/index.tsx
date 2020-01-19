import React from 'react';
import ReactDOM from 'react-dom';

//必要样式
import './index.less';
import 'antd-mobile/dist/antd-mobile.css';

//图标样式
import './assets/style.css'

//路由相关
import routes from './router/index';
import MyRouter from "./components/my-router";

ReactDOM.render(
    <MyRouter routes={routes} basename="" />
, document.getElementById('root'));