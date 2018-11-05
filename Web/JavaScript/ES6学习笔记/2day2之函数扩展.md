[TOC]

# 函数扩展

## 参数可以设置默认值

```javascript
// ES6允许为函数的参数设置默认值，即直接写在参数定义的后面
function log(x, y = 'Boy') {
    console.log(x, y);
}
log('He is a '); // He is a Boy
```

### 参数表达式是惰性求值的

```javascript
let x = 1;
function f(y = x+1) {
    console.log(y);
}
f(); // 2
x= 2;
f(); // 3
```

每次调用函数时都重新求值

### 与解构赋值默认值结合使用

```javascript
function foo({x, y=5} = {}) {}
// 如果不给参数设置默认值，解构就会报错，因为等号右边是undefined，设置了默认值后，可以避免这种情况
```

### 函数的length属性

指定了默认值后，函数的length属性，将返回没有默认值的参数个数。

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数。

```javascript
(function(a, b=1, c) {}).length // 1
```

### 作用域 （一旦设置了参数的默认值，函数在进行声明初始化时，参数会形成一个单独的作用域）

```javascript
var x;
function f(x, y=x) {
    console.log(y);
}
f(2); // 2
// 参数y的默认值是x，因为形成了一个单独作用域，因此x指向第一个参数而不是全局变量

let x = 1;
function f(y=x) {
    let x =2;
    console.log(y);
}
// 由于形成了单独作用域，x无定义，则执行外层的全局变量x
// 如果外层也没有定义x，则报错

function f(x=x){}
f();// 也会报错，因为作用域内相当于let x=x;由于let定义变量形成了暂时性死区，所以在声明前使用会报错。
```

### 应用

#### 指定某个参数不能忽略

```javascript
function foo(mustBeProvided = () => throw new Error('Missing parameter')) {}

foo();// Missing parameter
// 如果省略了参数调用默认值求参数，则抛出错误。还可以看出参数表达式是惰性求值的，在使用时计算而不是定义时计算
```

#### 指定某个参数可以忽略

```javascript
function foo(optional = undefined) {}
```

## rest参数 剩余参数

```javascript
function add (...values) {
    let sum = 0;
    for (var val of values) {
        sum+=val;
    }
    return sum;
}
add(1);// 1

// 参数排序
function sortArgs() {
   return Array.prototype.slice.call(arguments).sort();
}

const sorArgs = (...numbers) => numbers.sort();
```

#### 剩余参数只能是最后一个参数，函数的length属性，不含有rest参数和有默认值的参数

```javascript
function f(a, ...x, s) {} // 报错
```

#### 剩余参数与arguments的区别

#####1. arguments是一个对象，剩余参数是数组

##### 2. arguments对象还有一些附加属性，如callee

##### 3. 剩余参数包括没有指定形参的参数，arguments包括所有参数

## 严格模式

ES5：函数内部可以设定为严格模式

ES2016：只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```javascript
// 报错
function f(a, b=1) {
    'use strict';
}
```

> 避免先解析函数参数代码，再执行函数体代码时，发现是严格模式。如果参数里有不符合严格模式的语法，到了执行函数体才报错。

## name属性 返回函数名

```javascript
function foo() {}
foo.name; // foo

var f = function() {}
f.name // f (ES5遇上匿名函数会返回"")

var foo = function baz() {}
foo.name // baz 具名函数返回原本的名字

(new Function()).name // anonymous
// Function构造函数返回的函数实例，name属性的值为anonymous

foo.bind({}).name // "bound foo" bind返回的函数，name属性会加上bound函数
```

## 箭头函数

### 函数体内的this对象，是定义时所在的对象，而不是使用时所在的对象

```javascript
function foo() {
    setTimeout(()=> {
        console.log('id', this.id);
    },100);
}
var id = 21;
foo.call({id: 42});
```

箭头函数让this绑定了定义时所在的作用域，而不是运行时所在的作用域

```javascript
function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function() { this.s2++; }, 1000);
}
var timer = new Timer();
setTimeout..... // 3.1秒后打印timer的s1和s2
3,0
//前者绑定Timer，后者绑定运行时所在作用域全局对象
```

```javascript
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
```

init和和doSomething的this都指向handler对象。因为箭头函数没有自己的this，所以内部的this就是外部的代码块的this

### 不可以当做构造函数，不可以使用new命令

### 不可以使用arguments对象，可以使用剩余参数

### 不可以使用yield命令，因此箭头函数不能作Generator函数

### 箭头函数没有自己的this arguments super new.target



## 双冒号运算符

`::`左边是一个对象，右边是一个函数，该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上

```javascript
foo::bar; // bar.bind(foo);
foo::bar(...arguments); // bar.apply(foo, arguments);
```





## 尾调用优化

## 允许函数参数有尾逗号





















