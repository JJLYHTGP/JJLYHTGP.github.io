[TOC]

# Proxy

## 1. 概述

- 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”。即对编程语言进行编程。Proxy可以理解成，在目标对象之前架设一层拦截，外界对该对象的访问，必须先通过这层拦截。

- ES6提供Proxy构造函数来生成Proxy实例

```javascript
var proxy = new Proxy(target, handler);
```

- 如果handler没有设置任何拦截，那就等同于直接通向原对象。

- proxy可以作为原型对象

  ```javascript
  var proxy = new Proxy({}, {
    get: function(target, property) {
      return 35;
    }
  });
  
  let obj = Object.create(proxy);
  obj.time // 35
  // proxy对象是obj对象的原型，obj对象本身没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
  ```

- 同一个拦截器函数，可以设置拦截多个操作。

  ```javascript
  var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  fproxy(1, 2) // 1
  new fproxy(1, 2) // {value: 2}
  fproxy.prototype === Object.prototype // true
  fproxy.foo === "Hello, foo" // true
  ```

  对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

----------------------------------------

## 2. Proxy实例的方法

### get(target, key, receiver)
拦截对象属性的读取。目标对象，属性名，proxy实例本身（严格的说，是操作行为所针对的对象）

下面的例子使用`get`拦截，实现数组读取负数的索引。

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

上面代码中，数组的位置参数是`-1`，就会输出数组的倒数第一个成员。

下面是一个`get`方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。

```javascript
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
```

上面代码中，`proxy`对象的`getReceiver`属性是由`proxy`对象提供的，所以`receiver`指向`proxy`对象。

```javascript
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
  }
});

const d = Object.create(proxy);
d.a === d // true
```

上面代码中，`d`对象本身没有`a`属性，所以读取`d.a`的时候，会去`d`的原型`proxy`对象找。这时，`receiver`就指向`d`，代表原始的读操作所在的那个对象。

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```javascript
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
```

### set(target, key, value, receiver)

拦截对象属性的设置，返回一个布尔值

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合`get`和`set`方法，就可以做到防止这些内部属性被外部读写。

```javascript
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。

注意，如果目标对象自身的某个属性，不可写且不可配置，那么`set`方法将不起作用。

```javascript
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

上面代码中，`obj.foo`属性不可写，Proxy 对这个属性的`set`代理将不会生效。

### has(target, propKey)

拦截propKey in prop的操作 返回一个布尔值

下面的例子使用`has`方法隐藏某些属性，不被`in`运算符发现。

```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

上面代码中，如果原对象的属性名的第一个字符是下划线，`proxy.has`就会返回`false`，从而不会被`in`运算符发现。

如果原对象不可配置或者禁止扩展，这时`has`拦截会报错。

```javascript
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown
```

上面代码中，`obj`对象禁止扩展，结果使用`has`拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则`has`方法就不得“隐藏”（即返回`false`）目标对象的该属性。

值得注意的是，`has`方法拦截的是`HasProperty`操作，而不是`HasOwnProperty`操作，即`has`方法不判断一个属性是对象自身的属性，还是继承的属性。

### deleteProperty(target, propkey)

 拦截delete proxy[propkey]的操作，返回一个布尔值，如果这个方法抛出错误或者返回false。当前属性就无法被delete命令删除。

```javascript
const handler = {
    deleteProperty (target, key) {
        invariant(key, 'delete');
        delete target[key];
        return true;
    }
}

const invariant = (key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: ...
```

注意，目标对象自身的不可配置（configurable）的属性，不能被`deleteProperty`方法删除，否则报错。

### ownKeys(target)

拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys()、for...in循环，返回一个数组，该方法返回目标对象的所有自身属性的属性名

使用`Object.keys`方法时，有三类属性会被`ownKeys`方法自动过滤，不会返回。

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（`enumerable`）的属性

### getOwnPropertyDescriptor(target， propkey)
拦截Object.getOwnPropertyDescripter(proxy, propkey)，返回属性的描述符对象或undefined



### defineProperty(target, propkey, propkey)
拦截Object.defineProperty(target, propkey, propdesc) Object.defineProperties(target, propdescs)，返回一个布尔值

如果目标对象不可扩展（extensible），则`defineProperty`不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则`defineProperty`方法不得改变这两个设置。

### preventExtensions(target)
拦截Object.preventExtensions(proxy)，返回一个布尔值
### getPrototypeOf(target)
拦截Object.getPrototypeOf(proxy)返回一个对象

`getPrototypeOf`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

下面是一个例子。

```javascript
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

上面代码中，`getPrototypeOf`方法拦截`Object.getPrototypeOf()`，返回`proto`对象。

注意，`getPrototypeOf`方法的返回值必须是对象或者`null`，否则报错。另外，如果目标对象不可扩展（extensible）， `getPrototypeOf`方法必须返回目标对象的原型对象。



### isExtensible(target)

拦截Object.isExtensible(proxy)，返回一个布尔值

这个方法有一个强限制，它的返回值必须与目标对象的`isExtensible`属性保持一致，否则就会抛出错误。

```javascript
Object.isExtensible(proxy) === Object.isExtensible(target)
```

下面是一个例子。

```javascript
var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p) // 报错
```

### setPrototypeOf(target, proto)
拦截Object.setPrototypeOf(proxy, proto)。返回一个布尔值
### apply(target, object, args)
拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

```javascript
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

上面代码中，每当执行`proxy`函数（直接调用或`call`和`apply`调用），就会被`apply`方法拦截。

另外，直接调用`Reflect.apply`方法，也会被拦截。

```javascript
Reflect.apply(proxy, null, [9, 10]) // 38
```

### construct(target, args)
拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

construc方法用于拦截new命令

```javascript
const handler = {
    // 目标对象，构造函数的参数对象，创建实例对象时new命令作用的构造函数
    construct (target, args, newTarget) {
        console.log('constructed');
        return new target(...args);
    }
};

var proxy = new Proxy(function () {}, handler);

new proxy(1);
```

construct方法返回的必须是一个对象，否则会报错。

## 3. Proxy.revocable()

返回一个可以取消的proxy实例

```javascript
let target = {};
let handler = {};

// 返回了包含proxy实例和可以取消proxy实例的revoke函数
let { proxy, revoke } = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo; // 123

// 取消实例后再次访问，就会抛出一个错误
revoke();
proxy.foo // TypeError: Revoked
```

proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，等到访问结束，就收回代理权，不允许再次访问。

## 4.  this问题

在Proxy代理的目标对象内部的this关键字会指向proxy代理



## 5. 实例：Web服务的客户端