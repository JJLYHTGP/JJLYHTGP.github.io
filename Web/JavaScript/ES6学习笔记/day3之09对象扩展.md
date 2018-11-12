[TOC]

# 对象的扩展

## 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。

```javascript
const foo = 'bar';
const baz = {
    foo,
    method() {
        return 'hi';
    }
};
```

## 属性名表达式

属性名表达式与简洁表达法不能同时使用

```javascript
// 报错
const foo = 'bae';
const bar = 'abx';
const baz = { [foo] };

//正确
const baz = { [foo] : 'abx' };
```



## 对象方法也是函数，也有name属性

## Object.is相当于===，但是+0与-0不相等，NaN等于自身

```javascript
+0 === -0 // false 
NaN === NaN // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true 

// ES5模拟Object.is
Oject.defineProperty(Object, 'is', {
    value: function(x, y) {
        if (x===y) {
            return x !== 0 || 1/x === 1/y;
        }
        return x !== x && y!==y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});
```



## Object.assign用于对象的合并，将源对象的所有可枚举属性，复制到目标对象

- 源对象的属性会覆盖目标对象的属性

- null和undefined无法转成对象，因此它们作为首参数（目标对象）会报错

- null和undefined作为源对象不会报错，无法转成对象，会跳过

- 数值、字符串、布尔值不在首参数不会报错，字符串会以数组形式拷贝进目标对象，其他值不会有效果

- `Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）。 

- 属性名为 Symbol 值的属性，也会被`Object.assign`拷贝。 

  ```javascript
  Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
  // { a: 'b', Symbol(c): 'd' }
  ```

  

### 浅拷贝

### 同名属性会替换，而不是添加

```javascript
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } } a属性直接被替换
```

### 把数组视为对象

```javascript
Object.assign([1,2,3], [4,5]);
// [4, 5, 3]
```

###取值函数则先求值再复制

```javascript
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

### 为对象增加属性

### 为对象增加方法

### 克隆对象

可将原始对象拷贝到一个空对象，但是不能克隆它继承的值，如果要保持继承链，可以采用下面的代码：

```javascript
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}
```

### 合并多个对象

### 为属性指定默认值

## 属性的可枚举性和遍历

### 可枚举性

对象的每一个属性都有一个描述对象Descriptor，用来控制该属性的行为。Object.getOwnPropertyDescriptors()方法可以获取该属性的描述对象

```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的`enumerable`属性，称为”可枚举性“，如果该属性为`false`，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略`enumerable`为`false`的属性。

- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。

## Object.getOwnPropertyDescriptors()返回对象的所有自身属性（非继承属性）的描述对象

```javascript
const obj = {
    foo: 123,
  	get bar() {return 'abc'}
}
Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

```javascript
// 使用Object.assign拷贝方法，会把赋值函数计算值后赋值，因为assign方法总是拷贝一个属性的值，而不会拷贝它白喉的赋值方法或取值方法

// Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
```

## `__proto__`属性，Object.setPrototypeOf,Object.getPrototypeOf

#### `__proto__`属性用来读取或设置对象的prototype属性

```javascript
// ES5写法
var obj = {};
obj.__proto__ = someObj;

// ES6写法
let obj = Object.create(someObj);

Object.getPrototypeOf({ __proto__: null })
// null
```

#### Object.setPrototypeOf(object, prototype)设置对象的prototype对象，返回第一个参数对象本身

如果第一个参数是null或undefined，会报错

#### Object.getPrototypeOf(object)读取一个对象的原型对象

如果参数是null或者undefined，会报错

## super关键字

this关键字指向函数所在的当前对象，super指向当前对象的原型对象

```javascript
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};
// 只能用在对象的方法里，相当于Object.getPropertyOf(this).foo
const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

## Object.keys Object.entries Object.values

#### Object.keys返回包括对象自身的可枚举的属性（不含Symbol）的键名

#### Object.values返回包括对象自身的可枚举的属性（不含Symbol）的键值

#### Object.entries返回包括对象自身的可枚举的属性（不含Symbol）的键值对数组

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

## 对象的扩展运算符

对象的解构赋值用于从一个对象取值，相当于将目标对象**自身**的所有**可枚举**的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。 

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
// 解构赋值必须是最后一个参数，否则会报错
let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
```

如果扩展运算符的参数是`null`或`undefined`，这两个值会被忽略，不会报错。 

```javascript
let emptyObject = { ...null, ...undefined }; // 不报错
```





































