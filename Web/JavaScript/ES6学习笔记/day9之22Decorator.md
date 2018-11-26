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

function testable(target) {
    target.isTestable = true;
}
```



## 2. 方法的修饰
## 3. 为什么修饰器不能用于函数？
## 4. core-decorator.js
## 5. 使用修饰器实现自动发布事件
## 6. Mixin
## 7. Trait
## 8. Babel转码器的支持