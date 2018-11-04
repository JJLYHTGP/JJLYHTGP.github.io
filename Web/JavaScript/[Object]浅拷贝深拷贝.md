[TOC]

# 浅拷贝和深拷贝

## 浅拷贝

### Object.assign 不拷贝继承属性，不拷贝赋值函数

```javascript
function cloneShallow(source) {
	return Object.assign({}, source);   
}

const obja = Object.defineProperties({}, {
    // 可枚举 赋值函数
    nameFunc: {
      	value: (value) => value,
        enumerable: true,
    },
    // 不可枚举
    name: {
      	value: '张四',
        enumerable: false,
    },
    // 可枚举 自身属性
    age: {
      	value: 12,
        enumerable: true,
    },
    // Symbol
    [Symbol()]: {
		value: 'I am a Symbol property',
        enumerable: true,
    },
});

const objb = Object.defineProperties({}, {
    // 可枚举 赋值函数
    nameFunc: {
      	value: (value) => 'proto '+value,
        enumerable: true,
    },
    // 不可枚举
    name: {
      	value: '李三',
        enumerable: false,
    },
    // 可枚举
    age: {
      	value: 12,
        enumerable: true,
    },
    // Symbol
    [Symbol()]: {
		value: 'I am a Symbol property',
        enumerable: true,
    },
});

cloneShallow();
```

### Object.create拷贝继承属性 + Object.getOwnPropertyDescritors 拷贝赋值函数

```javascript
function cloneShallow(source) {
	return Object.create(Object.getPrototypeOf(source), Object.getOwnPropertyDescritors(source));   
}
```
### 扩展运算符

```javascript
function cloneShallow(source) {
	return {...source};   
}
```

### 数组：Array.slice、Array.filter、Array.concat

### 数组：扩展运算符

```javascript
function cloneShallow(arr) {
    // return arr.slice();
    // return arr.filter(() => true);
    // return arr.concat();
	return [...arr];   
}
```



## 深拷贝

### JSON.parse(JSON.stringify(obj))

