# React-Router

## 参考链接

- https://github.com/ReactTraining/react-router/
- https://react-guide.github.io/react-router-cn/index.html

## 介绍

### 路由配置

- `Router` 只有一个，保持UI和URL的同步
  - children  一个或多个Route or PlainRoute，当history改变，Router匹配一个Route的分支，并渲染对应的组件。
- `Link` 以适当的href渲染一个可访问的锚点标签。为激活状态的`Route`添加`activeClassName`和`activeStyle`
- `IndexRoute`入口页面，无需path属性
- `Redirect`重定向
- `onEnter`hook：在所有将进入的路由触发，从最外层的父路由直到最下层子路由结束
- `onLeave`hook：在所有将离开的路由触发，从最下层的子路由开始直到最外层父路由结束
- 配置方式：
  - 嵌套使用route，把Route作为Router的children
  - 使用原生的route数组对象，作为Router的routes属性传入



### 匹配原理

- 深度优先遍历整个嵌套的路由配置树，寻找匹配的路由
- 路径匹配支持:paramName，可选匹配，通配符匹配
- 优先级：自上而下



### History



### `IndexRoute`与`IndexLink`



### 动态路由

https://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html



### 跳转前确认

