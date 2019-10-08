# Vue.js初探

##Class 与 Style 绑定 — Vue.js

- 教程：https://cn.vuejs.org/v2/guide/class-and-style.html

`:class`和`:style`可以绑定对象和数组

```html
<div v-bind:class="{ active: isActive }"></div>

<div v-bind:class="computedObject"></div>
```

```js
data: {
		isActive: true,
    error: null
}

computed: {
  computedObject: function() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```



## 条件渲染

- 教程：https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。



## 事件处理

### 事件修饰符

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`

  阻止事件继续传播

- `.prevent`

阻止事件的默认绑定事件

- `.capture`

  添加事件监听器时使用事件捕获模式

- `.self`

  只当`event.target`是元素自身时触发事件

- `.once`

  只触发一次

- `.passive`

设置为true时，表示 `listener` 永远不会调用 `preventDefault()。`

### 按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用。