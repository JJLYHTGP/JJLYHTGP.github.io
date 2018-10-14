[TOC]

# 面向对象的程序设计
## 理解对象

### 属性类型
**数据属性**
```
// 在对象上直接定义属性，以下属性默认为true
// 用defineProperty(obj, property, descriptor)定义属性,
// 默认为false
[[configurable]]
能否通过delete删除从而重新定义属性
[[enumerable]]
是否能通过for-in循环返回属性
[[writable]]
能否修改属性的值
[[value]]
值
```

## 创建对象

### 工厂模式

### 构造函数模式
```JavaScript
function Person(name, age, job) {
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) } 
}
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');
```
==实例对象的construcor属性指向构造函数==

### 原型模式

```JavaScript
function Person() {}

Person.prototype = {
   name:  'Zaxlct',
   age: 28,
   job: 'Software Engineer',
   sayName: function() {
     alert(this.name);
   }
}
var person1 = new Person();
```



==每个对象都有 `__proto__` 属性，但只有函数对象才有 prototype 属性==

==在默认情况下，所有的原型对象都会自动获得一个 constructor（构造函数）属性，这个属性（是一个指针）指向 prototype 属性所在的函数（Person）==
```
Person.prototype.constructor == Person
```
==__proto__属性指向对象的构造函数的原型==
```
person1.__proto__ == Person.prototype
```

==原型对象是构造函数的一个实例==

```

```

## 继承
### 原型链

当使用new去调用构造函数时，相当于执行了
```
var o = {};
o.__proto__ = F.prototype;
F.call(o);
```
![继承](https://segmentfault.com/img/bVwFw5)
### 原型继承


### 借用构造函数

### 组合式继承