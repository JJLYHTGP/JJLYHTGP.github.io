[TOC]

# JavaScript高级程序设计

## 第5章 引用类型

### 5.4 RegExp类型

匹配模式

- g：全局模式，即模式将被应用于所有字符串，而非发现第一个匹配项时立即停止
- i：不区分大小写
- m：多行模式

```javascript
var re = /cat/g;
re.test('catasfsa');//true
re.test('catasfsa');//false
```

只为/cat/创建了一个RegExp实例，由于实例属性不会重置，因此在循环体中再次调用test方法会失败。