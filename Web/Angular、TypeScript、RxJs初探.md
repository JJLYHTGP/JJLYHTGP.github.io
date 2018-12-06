# Angular

## 起步

- 安装淘宝镜像

  ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

- AppComponent

  .ts组件的类的代码

  .html组件的模板

  .css组件的私有css样式

- 旧版本：必须理解作用域的概念。

## 优点

- 模板功能强大丰富，提供多种指令
- 完善的MVVM框架。包含模板、数据双向绑定、路由、模块化、服务器、依赖注入
- 引入依赖注入、单元测试等Java思想

## 缺点

- 双向数据绑定耗费性能。利用数据脏检查机制，作用域的每一次变化，都会引发一次脏值检测。
- 路由。
- 作用域。
- 表单验证
- typescript

## 特点

### 1. 双向绑定

> [AngularJS脏值检测深入分析](https://www.cnblogs.com/likeFlyingFish/p/6183630.html)

angular实现界面到数据的更改，是由UI事件、Ajax请求、或者timeout等回调操作，数据到UI的呈现是脏检查机制。



angular每一个绑定到UI的数据，都有一个$watch对象

```javascript
watch = {
    name:'',      //当前的watch 对象 观测的数据名
    getNewValue ($scope){ //得到新值
        ...
        return newValue;
    },
    listener (newValue,oldValue){// 当数据发生改变时需要执行的操作
        ...
    }
}
```

### 2. 模板

### 3. MVVM

### 4. 依赖注入

### 5. 指令

### 6. 路由

### 7. 过滤器

### 8. 测试

## 与Vue.js的横向比较

|                | Angular                                    | Vue                      |
| -------------- | ------------------------------------------ | ------------------------ |
| 模板           | 模板功能强大丰富，声明式的，提供多种指令。 |                          |
| 双向绑定       | 数据脏值检测。默认单项绑定                 | 数据劫持结合发布订阅模式 |
| 服务器渲染     | 官方实现                                   | 靠第三方库实现           |
| 命令行工具     | AngularCli                                 | Vue-cli                  |
| 移动和桌面兼容 |                                            |                          |
| 学习成本       | 高                                         | 低                       |
| 性能           |                                            | 虚拟DOM提高性能          |
| 路由           | ng-view                                    |                          |
|                |                                            |                          |
|                |                                            |                          |

## Angular程序架构

1. 组件
2. 指令
3. 模块
   - 将应用中不同部分组织成一个angular框架可以理解的单元

## AngularCli

完成的工作

- 快速搭建框架。创建module
- 代码打包压缩，模块测试，端到端测试
- 热部署，立即编译
- 有开发、测试、生产环境的配置
- sass、less的预编译也都会被自动识别后缀来编译
- typescript的配置



学习计划

1. 编译时发现错误，一些interface和class的扩展。typescript比起JavaScript增加了枚举、类等其他的以前学C++时会看到的概念，我会先迅速把ES6学习完然后开始学习typescript。
2. Vue的学习上手很快，而且学习初期比较容易。Angular学习成本是比较高，需要的时间比较长。但是其中的一些模板指令，生命周期，组件和模块等内容可以和Vue.js结合起来理解。会在学习typescript之后立即自己先通读教程然后找项目练手。
3. rxjs观察者模式、迭代器模式、使用集合的函数式编程。

# JavaScript 和 TypeScript 的概要介绍

## JavaScript

JavaScript 是一种轻量级的解释性脚本语言，可嵌入到 HTML 页面中，在浏览器端执行，能够实现浏览器端丰富的交互功能，为用户带来流畅多样的用户体验。

JavaScript 是基于对象和事件驱动的，无需特定的语言环境，只需在支持的浏览器上就能运行。

JavaScript 语言具有以下特点：

- JavaScript 是一种脚本编写语言，无需编译，只要嵌入 HTML 代码中，就能由浏览器逐行加载解释执行。
- JavaScript 是一种基于对象的语言，可以创建对象同时使用现有对象。但是 Javascript 并不支持其它面向对象语言所具有的继承和重载功能。
- JavaScript 的语法简单，使用的变量为弱类型。
- JavaScript 语言较为安全，仅在浏览器端执行，不会访问本地硬盘数据。
- JavaScript 语言具有动态性。JavaScript 是事件驱动的，只根据用户的操作做出相应的反应处理。
- JavaScript 只依赖于浏览器，与操作系统的因素无关。因此 JavaScript 是一种跨平台的语言。
- JavaScript 兼容性较好，能够与其他技术（如 XML，REST API 等）一起使用。

## TypeScript

TypeScript 是 Microsoft 开发和维护的一种面向对象的编程语言。它是 JavaScript 的超集，包含了 JavaScript 的所有元素，可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。

TypeScript 具有以下特点：

- TypeScript 是 Microsoft 推出的开源语言，使用 Apache 授权协议
- TypeScript 增加了静态类型、类、模块、接口和类型注解
- TypeScript 可用于开发大型的应用
- TypeScript 易学易于理解

 

# JavaScript 和 TypeScript 的主要差异

TypeScript 可以使用 JavaScript 中的所有代码和编码概念，TypeScript 是为了使 JavaScript 的开发变得更加容易而创建的。例如，TypeScript 使用类型和接口等概念来描述正在使用的数据，这使开发人员能够快速检测错误并调试应用程序

- TypeScript 从核心语言方面和类概念的模塑方面对 JavaScript 对象模型进行扩展。
- JavaScript 代码可以在无需任何修改的情况下与 TypeScript 一同工作，同时可以使用编译器将 TypeScript 代码转换为 JavaScript。
- TypeScript 通过类型注解提供编译时的静态类型检查。
- TypeScript 中的数据要求带有明确的类型，JavaScript不要求。
- TypeScript 为函数提供了缺省参数值。
- TypeScript 引入了 JavaScript 中没有的“类”概念。
- TypeScript 中引入了模块的概念，可以把声明、数据、函数和类封装在模块中。

 

# TypeScript 的优势

下面列举 TypeScript 相比于 JavaScript 的显著优势：

## 1. 静态输入

静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

## 2. 大型的开发项目

有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。

## 3. 更好的协作

当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

## 4. 更强的生产力

干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。

 

# JavaScript 的优势

相比于 TypeScript，JavaScript 也有一些明显优势。

## 1. 人气

JavaScript 的开发者社区仍然是巨大而活跃的，在社区中可以很方便地找到大量成熟的开发项目和可用资源。

## 2. 学习曲线

由于 JavaScript 语言发展的较早，也较为成熟，所以仍有一大批开发人员坚持使用他们熟悉的脚本语言 JavaScript，而不是学习 TypeScript。

## 3. 本地浏览器支持

TypeScript 代码需要被编译（输出 JavaScript 代码），这是 TypeScript 代码执行时的一个额外的步骤。

## 4. 不需要注释

为了充分利用 TypeScript 特性，开发人员需要不断注释他们的代码，这可能会使项目效率降低。

## 5. 灵活性

有些开发人员更喜欢 JavaScript 的灵活性。

 

# 如何抉择

TypeScript 正在成为开发大型编码项目的有力工具。因为其面向对象编程语言的结构保持了代码的清洁、一致和简单的调试。因此在应对大型开发项目时，使用 TypeScript 更加合适。如果有一个相对较小的编码项目，似乎没有必要使用 TypeScript，只需使用灵活的 JavaScript 即可。

参考文章：https://dzone.com/articles/typescript-vs-javascript-should-you-migrate-your-j