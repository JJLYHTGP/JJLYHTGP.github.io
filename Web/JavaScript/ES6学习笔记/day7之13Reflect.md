[TOC]

# Reflect

## 1. 概述

Reflect对象设计目的：

1. 把Object对象的一些明显属于语言内部的方法，部署到Reflect对象上。
2. 修改某些Object方法的返回结果，使其变得更合理。如Object.defineProperty在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)会返回false
3. 让Object操作都变成函数行为，某些Object操作是命令式，如name in obj, delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们都变成了函数行为
4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。
5. 

## 2. 静态方法

### Reflect.apply(target, thisArg, args)

绑定this对象后执行给定函数

一般来说，如果要绑定一个函数的`this`对象，可以这样写`fn.apply(obj, args)`，但是如果函数定义了自己的`apply`方法，就只能写成`Function.prototype.apply.call(fn, obj, args)`，采用`Reflect`对象可以简化这种操作。

```javascript
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

### Reflect.construct(target, args)

new target(...args);提供了一种不使用new，来调用构造函数的方法。

### Reflect.get(target, name, receiver)

```javascript
var obj = { foo: '1' };
Reflect.get(obj, 'foo'); // '1'
Reflect.get(obj, 'bar'); // 如果没有找到name属性，返回undefined


// 如果name属性部署了读取函数getter，则读取函数的this绑定receiver
var myobj = {
    foo: '1',
    bar: '2',
    get baz() {
        return this.foo + this.bar;
    },
};

var myreceiveobj = { foo: 4, bar: 4 };
Reflect.get(myobj, 'baz', myreceiveobj);// 8

// 如果第一个参数不是对象，会报错
Reflect.get(1, 'd'); // false
```

### Reflect.set(target, name, value, receiver)

```javascript
// 如果name属性设置了赋值函数，赋值函数的this绑定receiver
```

注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了`receiver`，那么`Reflect.set`会触发`Proxy.defineProperty`拦截。

```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
```

上面代码中，`Proxy.set`拦截里面使用了`Reflect.set`，而且传入了`receiver`，导致触发`Proxy.defineProperty`拦截。这是因为`Proxy.set`的`receiver`参数总是指向当前的 Proxy 实例（即上例的`obj`），而`Reflect.set`一旦传入`receiver`，就会将属性赋值到`receiver`上面（即`obj`），导致触发`defineProperty`拦截。如果`Reflect.set`没有传入`receiver`，那么就不会触发`defineProperty`拦截。

```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
```

如果第一个参数不是对象，`Reflect.set`会报错。

```javascript
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
```

### Reflect.defineProperty(target, name, desc)

第一个参数不是对象则抛出错误

### Reflect.deleteProperty(target, name)

delete obj[name]，用于删除对象的属性。如果删除成功或者属性不存在，返回true；删除失败，则返回false

### Reflect.has(target, name)

`Reflect.has`方法对应`name in obj`里面的`in`运算符。如果第一个参数不是对象，`Reflect.has`和`in`运算符都会报错。

### Reflect.ownKeys(target)

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

```javascript
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

### Reflect.isExtensible(target)

`Reflect.isExtensible`方法对应`Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。

```javascript
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true
```

如果参数不是对象，`Object.isExtensible`会返回`false`，因为非对象本来就是不可扩展的，而`Reflect.isExtensible`会报错。

```javascript
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错
```

### Reflect.preventExtensions(target)

`Reflect.preventExtensions`对应`Object.preventExtensions`方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

```javascript
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true
```

如果参数不是对象，`Object.preventExtensions`在 ES5 环境报错，在 ES6 环境返回传入的参数，而`Reflect.preventExtensions`会报错。

```javascript
// ES5 环境
Object.preventExtensions(1) // 报错

// ES6 环境
Object.preventExtensions(1) // 1

// 新写法
Reflect.preventExtensions(1) // 报错
```

### Reflect.getOwnPropertyDescriptor(target, name)

`Reflect.getOwnPropertyDescriptor`和`Object.getOwnPropertyDescriptor`的一个区别是，如果第一个参数不是对象，`Object.getOwnPropertyDescriptor(1, 'foo')`不报错，返回`undefined`，而`Reflect.getOwnPropertyDescriptor(1, 'foo')`会抛出错误，表示参数非法

### Reflect.getPrototypeOf(target)

读取对象的`__proto__`属性。如果参数不是对象，Object.getPrototypeOf会将参数转为对象再运行，Reflect.getPrototypeOf会报错

### Reflect.setPrototypeOf(target, prototype)

设置目标对象的原型，返回布尔值，表示设置是否成功。

如果无法设置目标对象的原型（如：目标对象进制扩展），返回false

如果第一个参数不是对象，Object方法会返回第一个参数本身，Reflect方法报错，如果第一个参数是null或者undefined，两种方法都会报错

## 3. 实例：用Proxy实现观察者模式

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

```javascript
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```

上面代码中，数据对象`person`是观察目标，函数`print`是观察者。一旦数据对象发生变化，`print`就会自动执行。

下面，使用 Proxy 写一个观察者模式的最简单实现，即实现`observable`和`observe`这两个函数。思路是`observable`函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。

```javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```

上面代码中，先定义了一个`Set`集合，所有观察者函数都放进这个集合。然后，`observable`函数返回原始对象的代理，拦截赋值操作。拦截函数`set`之中，会自动执行所有观察者。