[TOC]

> [Vue.js](https://cn.vuejs.org/index.html)
>
>[API - Vue.js](https://cn.vuejs.org/v2/api/#keep-alive)

# Vue学习之API

## 全局API

### Vue.nextTick

在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM

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

> 2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，你得自己提供 polyfill。

### Vue.set

- **参数**：

  - `{Object | Array} target`
  - `{string | number} key`
  - `{any} value`

- **返回值**：设置的值。

- **用法**：

  向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 `this.myObject.newProperty = 'hi'`)

## 数据

### data

Vue实例上的数据对象。Vue将会递归将data的属性转换为getter/setter，从而让data的属性能够响应数据变化。对象必须是纯粹的对象。原型属性会被忽略。

以_或$开头的属性不会被Vue实例代理。

### props

用于接收来自父组件的数据。允许配置类型检测、自定义校验和设置默认值

```javascript
props: {
    // 检测类型 + 其他验证
    age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
            return value >= 0;
        }
    }
}
```

### computed

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。如果某个依赖在该实例范畴之外，则计算属性不会被更新。

```javascript
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```

### watch

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个属性。

```javascript
const handler = function (val, oldVal) {
    console.log(val, oldVal);
};
const vm = new Vue({
    data: {
        a: 1,
        b: 2,
        d: 4,
        e: {
            f: {
                g: 5
            }
        }
    },
    watch: {
        a: handler,
        // 方法名
        b: 'someMethod',
        // 深度 watcher 返回的是同一个对象，因为是复杂数据类型
        e: {
            handler,
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler,
            immediate: true
        },
    }
})
vm.a = 2;
vm.d = 3; 
vm.e.f.g = 4;
4 undefined
2 1
e: {
    f: {
        g: 4
    }
}
e: {
    f: {
        g: 4
    }
}
3 4
```

### 生命周期钩子

### 

![Vue å®ä¾çå½å¨æ](https://cn.vuejs.org/images/lifecycle.png)

| 钩子                                                        | 描述                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| beforeCreate                                                | 实例初始化之后，数据观测和事件配置之前被调用                 |
| created                                                     | 实例创建完成之后。已完成的配置：数据观测(data observer),属性和方法的运算，watch、event事件回调。然而，挂载阶段还没开始，$el属性目前不可见 |
| beforeMount                                                 | 在挂载开始之前被调用：相关的 `render` 函数首次被调用。**该钩子在服务器端渲染期间不被调用。** |
| mounted                                                     | `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。注意 `mounted` **不会**承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick) 替换掉 `mounted`。**该钩子在服务器端渲染期间不被调用。** |
| beforeUpdate                                                | 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。**该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。** |
| updated                                                     | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 |
|                                                             | 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或 [watcher](https://cn.vuejs.org/v2/api/#watch) 取而代之。注意 `updated` **不会**承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick) 替换掉 `updated` |
| activated                                                   | keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。 |
| deactivated                                                 | keep-alive 组件停用时调用。**该钩子在服务器端渲染期间不被调用。** |
| beforeDestroy                                               | 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。 |
| destroyed                                                   | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。**该钩子在服务器端渲染期间不被调用。** |
| [errorCaptured](https://cn.vuejs.org/v2/api/#errorCaptured) | 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。 |



## 指令

### v-text

innerText

### v-html

innerHtml

### v-model



## 特性

### key

key的特殊属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨别VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用key，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

拥有相同父元素的子元素必须有独特的key，重复的key会造成渲染错误。

为了高效更新虚拟DOM。

### is

用于动态组件



### 数组更新检测

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

## 内置的组件

### slot

### keep-alive

用`<keep-alive>`包裹的动态组件，会缓存不活动的组件实例，而不是销毁它们。它自身不会渲染在DOM里，也不会出现在父组件链里。当组件在keep-alive内被切换，它的activated和deactivated这两个生命周期钩子函数将会被对应执行。

在高版本中，这两个钩子函数会在keep-alive树内的所有嵌套组件中被触发。



## 自定义事件

### .sync修饰符

```javascript
// 子组件
this.$emit('update:title', newTitle);

// 父组件
<text-document :title.sync="doc.title"></text-document>
// 相当于
<text-document :title="doc.title" @update:title="doc.title = $event"></text-document>
```

注意：

1. 不能使用表达式。 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。
2. 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

