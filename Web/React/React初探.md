[TOC]

# 核心概念
## JSX简介

```jsx
const name = 'John';
const element = (
    <h1>
        Hello, {name}!
    </h1>
);
```
- React将标记与逻辑共同放在“组件”这个松散耦合单元之中，实现关注点分离。
- 建议把JSX分成多行并包裹在括号中。

### JSX中嵌入表达式
- JSX语法中，可以在`{}`内放置任何有效的JavaScript表达式。
- JSX语法中，可以使用引号来将属性值指定为字符串字面量或者使用大括号在属性值中插入JavaScript表达式。(2-1, user.firstname, func(user)等都属于JavaScript表达式)
- JSX在编译后转为普通JavaScript函数调用，对其取值后得到JavaScript对象。
- 你可以安全地在 JSX 当中插入用户输入内容：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

#### 在属性中嵌入JavaScript表达式

- 你可以通过使用引号，来将属性值指定为字符串字面量：
```jsx
const element = <div tabIndex="0"></div>;
```
也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：
```jsx
const element = <img src={user.avatarUrl}></img>;
```
在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

### JSX被转译成React.createElement()函数调用
```js
React.createElement(
  type,
  [props],
  [...children]
)
```
创建并返回指定类型的新 React 元素。其中的类型参数既可以是标签名字符串（如 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

使用 JSX 编写的代码将会被转换成使用 React.createElement() 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 React.createElement()。请查阅不使用 JSX 章节获得更多信息。

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：
```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：
```js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

## 元素渲染

## 组件 & Props

### 函数组件与class组件
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class 来定义组件：
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改



## State & 生命周期

State & 生命周期 – React
https://zh-hans.reactjs.org/docs/state-and-lifecycle.html

### 正确使用state

- 只有在构造函数中才能给this.state赋值`this.state = {n: 'a'}`
- 其他方法使用`setState`赋值
- state的更新可能是异步的，this.state和this.props可能会异步更新
- 自上而下数据流

### 生命周期



## 事件处理

React元素的事件处理与DOM元素的事件处理的不同之处：

1. 事件命名采用小驼峰式

2. 使用JSX语法时传入一个函数作为事件处理函数，而不是字符串

   例如，传统的 HTML：（Angular、Vue的事件绑定也这样使用）

   ```
   <button onclick="activateLasers()">
     Activate Lasers
   </button>
   ```

   在 React 中略微不同：(Vue中也可以这样使用)

   ```jsx
   <button onClick={activateLasers}>
     Activate Lasers
   </button>
   ```

3. 显式使用`preventDefault`来阻止默认行为。

## 条件渲染

- 阻止组件渲染：`render()`方法返回`null`。在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。

## 列表 & Key

