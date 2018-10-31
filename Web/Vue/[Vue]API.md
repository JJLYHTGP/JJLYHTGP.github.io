[TOC]

> [Vue.js](https://cn.vuejs.org/index.html)
>
>

# Vue学习之API

## 全局API

### Vue.nextTick：在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM

参数：

\- {Function}

\- {Object}

```javascript
// 修改数据
Vue.msg = 'Hello';
// DOM还没有更新
Vue.nextTick(function () {
    // DOM更新了
});
```



## 数据

### data

### props

### computed

### watch



## DOM

### template



### 生命周期钩子



## 组合

### parent



## 实例属性





## 实例事件

vm.$emit



## 指令

### v-html



### v-model



## 特性

slot



## VNode接口



## 服务端渲染

