## 因项目需要自己实现的一个带keepAlive、路由进入动画的REACT路由器

*实现了类似于vue的keepAlive功能，实现了基本的路由跳转*


### 关于动画的一点遗憾
动画刚开始的时候是准备做就业面离去，新页面渐入这种效果的；但是忙活了两天，兼容性不好素以就放弃了；目前的动画为路由进入动画，离去的页面直接就不显示了。

### 使用示例
```
//路由结构定义说明
let routes = [
    {
        title: "页面标题", //页面标题，可选
        path : "/path",  //路由路径，必选；可以为正则表达式， 如果是404页面请用 “*” 号
        component: page1., //用于显示的组件， 必选
        keepAlive: true //是否缓存页面，可选，缺省为false； 注意，如果当前路由是子路由，那么它的父路由也要设置keepAlive为true，否则当前keepAlive无效
        children: [] //子路由，可选
    }
]

//使用路由
import MyRouter from "path/myRouter";
import React from 'react';
import ReactDOM from 'react-dom';

//myRouter 的属性说明：
// 1. routes 为路由结构，必选
// 2. transition 为是否启用路由动画，布尔值；可选，缺省为false
// 3. deep 为当前路由深度，number类型；可选，缺省为零。一级路由可以不设置

ReactDOM.render(
    <MyRouter routes={routes} transition={true} deep={0}/>
, document.getElementById('root'));

```

### 导航
暂时只提供编程式导航
```
//凡是通过MyRouter路由渲染的页面，其props中都含有history、route两个对象
//单行操作由history来进行实现，history.push({path: "/path/path"}) 为去往新的路由，history.goBack()为返回上一页；目前暂时就这两个导航方法。
//route对象就是当前匹配的路由配置中的路由
```

### ！！
目前因为急用，暂时保证了其稳定，先赶工期。