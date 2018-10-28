[TOC]

# Symbol

## 概述 可以显示转换为字符串和布尔值，但是不能转换为数值

Symbol表示独一无二的值，是JavaScript语言的第七种数据类型，前面不能使用new命令。Symbol值由Symbol函数生成，因此对象的属性名可以是字符串，也可以是Symbol类型，凡是属性名属于Symbol类型，就是独一无二的，不会与其他属性名产生冲突

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');
let s3 = Symbol('foo');
s1 // Symbol(foo)
s2 // Symbol(bar)
s3 // Symbol(foo)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
s3.toString() // "Symbol(foo)"

// Symbol函数的参数只是对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的
Symbol() === Symbol() // false
Symbol() == Symbol() // false
```



## 作为属性名的Symbol

每一个Symbol值都是不相等的，意味着Symbol值可以做标识符。可以保证不会出现同名属性，防止某一个键被不小心改写或者覆盖

```javascript
let mySymbol = Symbol();
let a = {};
a = {
    [mySymbol]: 'hi',
};
// 相当于
Object.defineProperty(a, mySymbol, { value: 'hi'});
// 不能用.运算符
a.mySymbol // undefined 
```

## 实例：消除魔术字符串

## 属性名的遍历

| 方法                              | 描述                                                         | 不可枚举的 | 继承的 | Symbol |
| --------------------------------- | ------------------------------------------------------------ | ---------- | ------ | ------ |
| for...in                          | 遍历对象自身的和继承的可枚举(不含Symbol属性)                 |            | yes    |        |
| Object.keys(obj)                  | 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）的键名 |            |        |        |
| Object.getOwnPropertyNames(obj)   | 返回一个数组，包括对象的所有自身属性（不含symbol属性，但是包括不可枚举属性）的键名 | yes        |        | yes    |
| Object.getOwnPropertySymbols(obj) | 返回一个数组，包括对象的所有自身的Symbol属性的键名           |            |        | yes    |
| Reflect.ownKeys(obj)              | 返回一个数组，包括对象自身的所有键名，不管键名是Symbol还是字符串，也不管是否可枚举 | yes        |        | yes    |

## Symbol.for() 、Symbol.keyFor()

重新使用一个Symbol值。

```javascript
// 搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回以该字符串为名称的Symbol值
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

`Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。 

## 实例：模块的Singleton模式

## 内置的Symbol值

### Symbol.hasInstance

```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

