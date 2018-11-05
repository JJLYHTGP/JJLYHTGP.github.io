[TOC]

# 字符串扩展

## 6. includes(), startWith(), endsWith() 返回布尔值

## 7. repeat()

```javascript
'abx'.repeat(2); // abxabx
-1 Infinity 报错
NaN 0
0-1的小数 取整后为0
'3' 3 参数是字符串，则先转换为数字
```



## 8. padStart padEnd 补全长度

## 9. MatchAll 返回一个正则表达式在当前字符串的所有匹配

## 10. 模板字符串

```javascript
// 模板字符串由反引号标识，可以当做普通字符串，可以定义多行字符串，或嵌入变量。如果模板字符串中有反引号，使用反斜杠转义。
`\`shu`
// 模板字符串中可以调用函数、进行运算、引用对象属性
function fn() { return 'adi'; }
`${fn()}`
// 内部的值不是字符串，则转为字符串
`${true}` // 'true'
// 如果模板字符串中的变量没有声明，将报错
`${obj}`
```