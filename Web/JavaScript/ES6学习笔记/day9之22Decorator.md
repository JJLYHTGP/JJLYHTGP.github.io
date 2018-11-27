[TOC]

# 修饰器

## 1. 类的修饰

许多面向对象的语言都有修饰器(Decorator)函数，用来修改类的行为。目前，有一个提案将这项功能，引入了ES。

```javascript
// 为MyTestableClass增加了静态属性
@testable
class MyTestableClass {
    // ...
}

// 修饰器的第一个参数，就是所要修饰的目标类
function testable(target) {
    target.isTestable = true;
}

MyTestableClass.isTestable // true
```

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码，修饰器本质是编译时运行的函数。

如果想添加实例属性，可以通过目标类的prototype对象操作。

```javascript
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```



## 2. 方法的修饰

修饰器不仅可以修饰类，还可以修饰类的属性。

```javascript
class Person {
	// 修饰器readonly修饰类的name方法
    @readonly
    name() {
        return `${this.first} ${this.last}`;
    }
}

// 修饰器函数可以接受三个参数，第一个是类的原型对象，即Person.prototype（修饰器的本意是修饰类的实例，但这个时候实例尚未生成，所以只能修饰原型），第二个参数是要修饰的属性名，第三个参数是该属性的描述对象
function readonly(target, name, descriptor) {
    // descriptor
    /*
    {
    	value: specifiedFunction,
    	enumerable: false,
    	configurabel: true,
    	writabel: true
    }
    */
    descriptor.writable = false;
}

const person = new Person();
person.name = () => {};
```

如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

```javascript
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

上面代码中，外层修饰器`@dec(1)`先进入，但是内层修饰器`@dec(2)`先执行。

## 3. 为什么修饰器不能用于函数？



## 4. core-decorator.js
## 5. 使用修饰器实现自动发布事件
## 6. Mixin

在修饰器的基础上，可以实现`Mixin`模式。所谓`Mixin`模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。

下面，我们部署一个通用脚本`mixins.js`，将 Mixin 写成一个修饰器。

```javascript
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}
```

然后，就可以使用上面这个修饰器，为类“混入”各种方法。

```javascript
import { mixins } from './mixins';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

通过`mixins`这个修饰器，实现了在`MyClass`类上面“混入”`Foo`对象的`foo`方法。

## 7. Trait
## 8. Babel转码器的支持