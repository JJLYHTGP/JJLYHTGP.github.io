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





















