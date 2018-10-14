[TOC]



# 数据双向绑定

![MVVM](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png) 

MVVM(model-view-viewmodel)类框架的一般特色就是对象属性和UI数据的双向绑定。方法一般有发布订阅模式([BackBone.js](http://www.css88.com/doc/backbone/))、脏值检测([Angular.js]())、数据劫持([Vue.js]())

## 观察者模式

有人认为观察者模式 == 发布订阅模式，其实不然。

来自维基百科的定义：

> **观察者模式** 在软件设计中是一个对象（Subject），维护一个依赖列表（Observers），当任何状态发生改变(event)自动通知(notify)它们。



![img](https://user-gold-cdn.xitu.io/2017/11/22/15fe1b1f1797e09a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```javascript
/*
Subject维护了一个依赖列表，event类型作为依赖对象的key，每种event对应一个回调函数列表，每当状态改变时，调用对应的回调函数们
Subject的原型上有下列方法：
添附：新增观察者到依赖列表里
解附：将已存在的观察者从依赖列表中移除
通知：利用观察者所提供的回调函数来通知此目标已经产生变化
*/

// 维护依赖列表
function Subject() {
    this.handlers = {};
}

Subject.prototype = {
    // 添附
    attach: function (eventType, callback) {
        var self = this;
        var keys = Object.keys(self.handlers);
        if (!keys.find((key) => key === eventType)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(callback);
    },
    // 解附 detach
    detach: () => {},
    // 通知
    notify: function (eventType) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        // 通知 notify 直接调用回调函数，一一通知观察者
        self.handlers[eventType].forEach((handler) => {
            handler.apply(self, args);
        });
    }
};
```

用观察者模式实现一个最简单的input与span的双向绑定：

```javascript
function updateSpan(value) {
    // 更新数据
    spantext.innerHTML = value;
    // 发布modelUpt事件，通知观察者
    subject.noify('modelUpt', value);
}
// 订阅viewUpt事件
subject.attach('viewUpt', function(value){
    updateSpan(value);
});

// 订阅modelUpt事件
subject.attach('modelUpt', function(value) {
    // 更新视图中绑定的值
    inputEle.value = value;
});

// 视图数据修改，发布viewUpt事件，通知观察者
inputEle.addEventListener('keyup', function() {
    subject.notify('viewUpt', inputEle.value);
});
```

问题：

1. 视图数据更改时怎么通知观察者？

   从视图改变数据的一般方法：表单元素的改变（input, select, checkboxes, textarea，radio等）。利用DOM的事件处理程序，为可能引发视图数据改变的事件（change、keypress、keyup、paste）注册处理函数，在处理函数中通知观察者。

2. 如何检测对象属性变更？

   - 脏值检测
   - 数据劫持





## 发布-订阅模式

来自维基百科的定义

>在[软件架构](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E6%9E%B6%E6%9E%84)中，**发布-订阅**是一种[消息](https://zh.wikipedia.org/wiki/%E6%B6%88%E6%81%AF)[范式](https://zh.wikipedia.org/wiki/%E8%8C%83%E5%BC%8F)，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。
>
>在许多发布/订阅系统中，发布者发布消息到一个中间的[消息代理](https://zh.wikipedia.org/w/index.php?title=%E6%B6%88%E6%81%AF%E4%BB%A3%E7%90%86&action=edit&redlink=1)，然后订阅者向该消息代理注册订阅，由消息代理来进行过滤。消息代理通常执行[存储转发](https://zh.wikipedia.org/w/index.php?title=%E5%AD%98%E5%82%A8%E8%BD%AC%E5%8F%91&action=edit&redlink=1)的功能将消息从发布者发送到订阅者。



发布者和订阅者不知道对方的存在。需要一个第三方组件，叫做**信息中介**，它将订阅者和发布者串联起来，它过滤和分配所有输入的消息。换句话说，发布-订阅模式用来处理不同系统组件的信息交流，即使这些组件不知道对方的存在。

![img](https://user-gold-cdn.xitu.io/2017/11/22/15fe1b1f174cd376?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

图片来源: [developers-club](https://link.juejin.im/?target=http%3A%2F%2Fdevelopers-club.com%2Fposts%2F270339%2F)



### 两种模式差异

由此可以总结出两种模式的以下差异：

- 观察者模式因为Subject维护着Observers队列，对观察者保持着记录，但是发布-订阅模式中，发布者与订阅者**不知道对方的存在**，它们通过消息代理进行通信，发布者的消息不是直接发送给订阅者。
- 发布订阅模式的组件是松散耦合的，与观察者模式相反
- 观察者模式大多数是同步的，如上述例子，通知事件时依次调用回调函数序列的函数。发布-订阅模式大多数是**异步**的（使用消息队列）



## 脏值检测

```
Angular.js是通过脏值检查的方式来对比数据是否有变更，来决定是否更新视图，最简单的方式就是通过setInterval()定时检测数据变动，angular只有在指定事件被触发时进入脏值检测，大体如下：
 1.DOM事件，比如用户输入文本，点击按钮等。(ng-click)
 2.XHR响应事件(http)
 3.浏览器Location变更(location)
 4.Time事件(timeout, interval)
 5.执行digest()或者apply()
```



## 数据劫持

### 理解对象

##### 数据属性

数据属性包含一个数据值的位置，在这个位置可以读取和写入值。

| 属性名           | 描述                                                         | 默认值    |
| ---------------- | ------------------------------------------------------------ | --------- |
| [[Configurable]] | 能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性 | true      |
| [[Enumerable]]   | 能否通过for-in循环返回属性                                   | true      |
| [[Writable]]     | 能否修改属性的值                                             | true      |
| [[Value]]        | 包含这个属性的数据值。读取属性的时候，从这个位置读；写入数据值得时候，把新值保存在这个位置 | undefined |

要修改属性默认的特性，使用ES5的Object.defineProperty()方法。接收三个参数：属性所在的对象，属性的名字，一个描述符对象。描述符对象的属性必须是configurable,enumerable,writable,value

```javascript
var person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'May',
});
console.log(person.name);// May
person.name = 'Julia'; // 严格模式下报错，非严格模式下赋值操作被忽略
console.log(person.name);// May
```



##### 访问器属性

访问器属性不包含数据值，包含一对getter和setter函数。在读取访问器属性时会调用getter，写入访问器属性时，会调用set函数并传入新的值。定义访问器属性也用Object.defineProperty()方法。

数据劫持就是利用Object.defineProperty()来劫持对象的getter和setter操作，在数据变动时执行操作。



## vue的做法：数据劫持+发布订阅

### Vue数据双向绑定方案

#### 回顾Vue生命周期

![img](https://image-static.segmentfault.com/174/175/1741752219-59c9b774a4ccf)

**beforeCreate & created**

在Vue的构造函数中，对传入的options对象调用了_init函数，其中执行了以下操作。

```javascript
// new Vue 实例初始化
initLifecycle(vm) // 初始化生命周期，给vm对象添加了$parent $root $children，_watchers等属性，以及一些生命周期相关的标识 
initEvents(vm) // 初始化事件相关的属性，会在这里把父组件绑定在自定义标签上的事件添加到子组件里
initRender(vm) // 初始化渲染
callHook(vm, 'beforeCreate')// beforeCreate   执行beforeCreated的钩子函数

initInjections(vm) // 初始化inject resolve injections before data/props
initState(vm) // 初始化数据
initProvide(vm) // 初始化provide resolve provide after data/props
callHook(vm, 'created') // created
```

**initState** 初始化数据，对props、methods、data、computed、watch的处理

```javascript
function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) {
      initProps(vm, opts.props);
    }
    if (opts.methods) {
      initMethods(vm, opts.methods);
    }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */ );
    }
    if (opts.computed) {
      initComputed(vm, opts.computed);
    }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }
```



**initData**主要是初始化data中的数据，将数据进行Observer，监听数据的变化

```javascript
function initData(vm) {
    /*得到data数据*/
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ?
      getData(data, vm) :
      data || {};
    
    /*判断是否是对象*/
    if (!isPlainObject(data)) {
      data = {};
      "development" !== 'production' && warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    
    /*遍历data对象*/
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i]; 
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      /*保证data中的key不与props中的key重复，props优先，如果有冲突会产生warning*/
      if (props && hasOwn(props, key)) {
        "development" !== 'production' && warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        /*判断是否是保留字段*/
        /*将data上面的属性代理到了vm实例上*/
        proxy(vm, "_data", key);
      }
    }
    // observe data 980
    observe(data, true /* asRootData */ );
  }
```
#### 管理订阅者
对订阅者进行收集、存储和通知
**Dep构造函数**

```javascript
/**
  * Dep类是一个发布者，有多个订阅者可以订阅它
  */
var Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
};
// 添加一个订阅者对象
Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
};
// 移除一个订阅者对象
Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub);
};
// 依赖收集，当存在Dep.target的时候添加订阅者对象
Dep.prototype.depend = function depend() {
    if (Dep.target) {
        Dep.target.addDep(this);
    }
};
// 通知所有订阅者
Dep.prototype.notify = function notify() {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/
Dep.target = null;
```


#### 监听数据变化

**proxy**代理
将data的最外层属性代理到Vue实例上

```javascript
/*添加代理*/ 
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
```



**observe**尝试创建一个新的Observer实例(`_ob_`),Vue的响应式数据都会有一个`_ob_`的属性作为标记，里面存放了该属性的观察器，也就是Observer的实例，防止重复绑定。

```javascript
/**
   * 尝试创建一个Observer实例（__ob__），
   * 如果成功创建Observer实例则返回新的Observer实例，
   * 如果已有Observer实例则返回现有的Observer实例。
  */
  function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      /*创建一个新的Observer实例*/
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }
```



**Observer构造函数**

```javascript
var Observer = function Observer(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    // 将Observer实例绑定到data的__ob__属性上面
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
        var augment = hasProto 
        	? protoAugment 
        	: copyAugment
        augment(value, arrayMethods, arrayKeys);
        /*如果是数组则需要遍历数组的每一个成员,为其创建一个Observer实例（_ob_）*/
        this.observeArray(value);
    } else {
        /*如果是对象则使用walk进行绑定*/
        this.walk(value);
    }
};
```

**walk**

```javascript
Observer.prototype.walk = function walk(obj) {
    var keys = Object.keys(obj);
    /*walk方法会遍历对象的每一个属性进行defineReactive绑定*/
    for (var i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i]);
    }
};
```

**defineReactive** 通过Object.defineProperty为数据定义上getter\setter方法，进行依赖收集后Deps会存放Watcher对象。触发setter改变数据的时候会通知Deps订阅者通知所有的Watcher观察者对象进行UI的更新。

```javascript
function defineReactive(
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    // 定义一个dep对象
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }
  
    // 对象的子对象递归进行observe并返回子节点的observe对象
    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        // 如果对象原本就有getter则执行
        var value = getter ? getter.call(obj) : val;
        // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
        // target指向一个Watcher实例，每个Watcher都是一个订阅者
        // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
        // 并不是每次Dep.target有值时都需要添加到订阅者管理员中去管理，需要对订阅者去重
        if (Dep.target) {
          // 进行依赖收集
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              // 如果是数组对象则需要对每一个成员都进行依赖收集
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter(newVal) {
        // 通过getter方法获取当前值，与新值进行比较，一致则不需要执行set操作
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if ("development" !== 'production' && customSetter) {
          customSetter();
        }
        // 如果原对象有setter方法则执行setter
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        // 新值重新进行observe，保证数据响应式
        childOb = !shallow && observe(newVal);
        // dep对象通知所有的观察者
        dep.notify();
      }
    });
  }
```

**Watcher**是一个观察者对象。依赖收集后Watcher对象会被保存在Deps中，数据变动时，Deps会通知Watcher实例，然后由Watcher实例回调进行视图的更新。订阅者维护着每一次更新之前的数据，然后将其和更新之后的数据进行对比，如果发生了变化，则执行回调函数，并更新订阅者中维护的数据的值。

**beforeMount & mounted**

#### 解析器Compile初始化订阅者

Compile(HTML指令解析器),对元素节点的指令进行扫描和解析，如果存在v-model、v-on、插值等，则初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher），接收到属性变化时执行回调函数更新视图。

- 如果是元素节点（有v-指令），对元素添加监听事件（addEventListener，对input、click、change等事件添加监听）
- 如果是文本节点（有插值），则提取出{{}}内的data，然后根据绑定的数据对其进行初始化

**beforeUpdate & updated**

![img](https://upload-images.jianshu.io/upload_images/2591396-45e1d191acbd3a9c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/689/format/webp)



数据劫持：

`Object.defineProperty` 定义对象属性的getter内进行依赖收集，把订阅者添加到Dep的subs数组内，setter内通过getter方法获取当前值，与新值进行比较，一致则不需要执行set操作，并将改变通知给所有的订阅者

发布订阅：

使用 [Dep](https://github.com/VanMess/vue/blob/master/src/core/observer/dep.js) 解耦了依赖者与被依赖者之间关系的确定过程。简单来说：

- 通过 [Observer](https://github.com/VanMess/vue/blob/master/src/core/observer/index.js) 提供的接口，遍历状态对象，给对象的每个属性、子属性都绑定了一个专用的 `Dep` 对象。这里的状态对象主要指组件当中的`data`属性。

- 创建三种类型的watcher：

- 1. 调用 [initComputed](https://github.com/VanMess/vue/blob/master/src/core/instance/state.js#L172) 将 `computed` 属性转化为 `watcher` 实例
  2. 调用 [initWatch](https://github.com/VanMess/vue/blob/master/src/core/instance/state.js#L288) 方法，将 `watch` 配置转化为 `watcher` 实例
  3. 调用 [mountComponent](https://github.com/VanMess/vue/blob/master/src/core/instance/lifecycle.js#L143) 方法，为 `render` 函数绑定 `watcher` 实例

- 状态变更后，触发 `dep.notify()` 函数，该函数再进一步触发 [Watcher](https://github.com/VanMess/vue/blob/master/src/core/observer/watcher.js) 对象 `update` 函数，执行watcher的重新计算。

![img](http://upload-images.jianshu.io/upload_images/4351237-5f352e93f78982f3?imageMogr2/auto-orient/strip)

1. 对数组进行push、pop等操作时，对于数组的新对象何时进行双向绑定，怎么监听数组的这些变化？

    Vue的方法：重写push、pop、shift、unshift、splice、sort、reverse这些数组的原型方法。在使用了这些方法，如果数组增加了元素（push、unshift、splice），给新元素再添加双向绑定。同时数组元素发生变化，dep通知(notify change)所有注册的观察者进行响应式处理 。源码可见[observer/array.js](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js)

2. 数据劫持利用的`Object.defineProperty`是ES5的方法，需要支持ES5的浏览器
3. 属性劫持的出发点是“变”，所以Vue无法很好接入immutable模式
4. 订阅者进行数据更新时会维护原数据，增加内存成本



## DIFF算法





## 总结

Vue利用的数据劫持+发布订阅模式，实现了视图和对象属性的双向绑定。Vue3的作者宣称他们会使用ES2015的Proxy来实现双向绑定，在目标对象外面架设一层“拦截”,外部对该对象的访问，都会先通过这层拦截，因此提供了对外界的访问进行过滤和改写的机制，同时Proxy除了可以直接监听对象而非属性、直接监听数组变化，拦截方式还十分多样。即使Proxy有兼容性问题，但仍值得期待。



# 参考资料

> [设计模式之观察者模式  -cnblogs](https://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html)
>
> [观察者模式 -wiki](https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)
>
> [vuejs -github](https://github.com/vuejs/vue)
>
> [观察者模式 vs 发布-订阅模式 -掘金](https://juejin.im/post/5a14e9edf265da4312808d86)
>
> [数据双向绑定的 分析和简单实现   - 知乎专栏](https://zhuanlan.zhihu.com/p/25464162)
> [收藏好这篇，别再只说“数据劫持”了  -慕课手记](https://www.imooc.com/article/28573)
>
> [Vue框架核心之数据劫持](https://juejin.im/entry/589ff26486b599006b3dea9b)
>
> [Vue源码必知必会](https://zhuanlan.zhihu.com/p/30548119)
>
> http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day
>
> https://www.jianshu.com/p/f194619f6f26
>
> https://juejin.im/entry/5923973da22b9d005893805a
> https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf