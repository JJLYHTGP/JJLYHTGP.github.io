[TOC]

# == & ===

== 先转换再比较
=== 不转换直接比较

## 相等转换规则
### 一个操作数是Boolean值，将其转换为数值（0,1）

### 一个操作符是字符串，另一个是数值，将字符串转换为数值。

- 只包含数字、前面正负号，转换为十进制数
- 有效的浮点数和十六进制数格式都转为对应的浮点数和十进制
- 空串转为0
- 其他情况NaN

### 一个操作数是对象，另一个不是，则对象用valueOf转化为基本类型值，再按照前面的规则比较
### null == undefined
### 但是null和undefined不转类型，想不到吧.jpg（虽然null可以转0，undefined可以转NaN）
```
null != 0
undefined != NaN
```
### 只要有一个是NaN就返回false，NaN不和任何值相等，NaN != NaN
### 两个操作数是对象，就比较是不是同一个对象 []!=[] {}!={}

```
console.log('![]', ![], '!![]', !![]); // false true
console.log('[]==false', [] == false); // true 
console.log('!![]==true', !![] == true); // true
```

## 参考资料
> 《JavaScript高级程序设计（第3版）》