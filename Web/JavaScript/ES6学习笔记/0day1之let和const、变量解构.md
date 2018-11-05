# let和const、变量解构赋值

## let和const

### 块级作用域

无块级作用域：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```



let和const声明的变量or常量只在它所在的代码块有效

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i); // abc abc abc
}
console.log(i); // Uncaught ReferenceError: i is not defined
```

`for`循环比较特殊，设置循环变量的部分是一个父作用域，循环体内部是一个单独的子作用域

### 不存在变量提升

声明的变量一定要在声明后使用。

### 暂时性死区（temporal dead zone）

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

let x = x; //  ReferenceError 在x声明前访问
```



如果区块中存在let和const命令，声明的变量一开始就形成了封闭作用域，在声明前使用会报错。

### 不允许重复声明

不允许在相同作用域内，重复声明同一个变量

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
// 报错
function func() {
  var a = 10;
  let a = 1;
}
```

### const一旦声明，必须初始化，不能改变

> **Object.freeze()** 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

```javascript
const freezeObj = function(obj) {
    Object.freeze(obj);
    const aKeys = Object.keys(obj);
    aKeys.forEach((key) => {
        if (typeof obj[key] === 'object') {
            freezeObj(obj[key]);
        }
    });
    return obj;
};

const obj1 = { a: 1, b: { a: 1 }, c: [] };
const obj2 = freezeObj({ a: 1, b: { a: 1 }, c: [] });

obj1.b = {};
obj1;
obj2.b = {}; // 非严格模式不生效，严格模式下报错
```

## ES6声明变量的六种方式

var function let const import class

## 顶层对象的属性

## 变量的解构赋值 Destructing

### 数组

- 数组

  ```javascript
  let [ , , x] = [1, 2, 3]; // x 3
  let [a, b, ...y] = [4]; // 4 undefined 4 解构不成功，返回undefined
  ```

- 不可遍历结构，则报错

  ```javascript
  // 报错
  let [foo] = 1;
  let [foo] = false; // 转换为对象后无Iterator接口
  let [foo] = {}; // 本身不具有Iterator接口
  ```

- Set

  ```javascript
  let [x, y, z] = new Set([1, 3, 2]); // 1, 3, 2
  ```

- 有Iterator接口的数据结构（Generator函数）

- 允许设置默认值，当一个成员严格等于`undefined`时，默认值才会生效

  - 默认值可以引用解构赋值的其他变量，但该变量必须已经声明

    ```javascript
    let [x = 1, y = x] = []; // 1 1 
    let [x = 1, y = x] = [2]; // 2 2
    let [x = y, y = 1] = []; // y is not defined
    ```

### 对象

对象的属性没有顺序，必须变量与属性同名才能取到正确的值

```javascript
let { foo: baz } = { foo: "a" }; // foo是匹配模式，真正被赋值的变量是baz
```

数组是特殊的对象，因此可以用对象的方法度数组进行解构

```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr; // [arr.length - 1]属于属性名表达式
first // 1
last // 3
```

### 字符串

```javascript
// 转换成类似数组的对象
const [a, b, c] = 'abc'; // a b c
const [f, ...g] = 'hello'; // h ['e', 'l', 'l', 'o'];
// 解构length
const {length} = 'hell'; // 4
```



### 数值和布尔值

如果等号右边不是对象或数组，会将其转为对象，由于null和undefined无法转换为对象，因此对其解构赋值会报错

```javascript
let { toString: s } = 123;
s === Number.prototype.toString; // 数值的包装对象有toString属性
```

### 函数参数

### 圆括号

### 用途

#### 交换变量的值

```javascript
let x = 3;
let y = 4;
[x, y] = [y, x];
```

#### 从函数中返回多个值

### 函数参数默认值

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

#### 遍历map结构

####输入模块的指定方法

[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)