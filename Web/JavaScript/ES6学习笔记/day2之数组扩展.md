[TOC]

# 数组的扩展

## 扩展运算符

`...`将一个数组转化为逗号分割的参数序列

```javascript
...[1,2,3] // 1,2,3
```

应用：

1. 浅拷贝数组

   ```javascript
   const a2 = [...[1,2,3]];
   const [...a2] = a1;
   ```

2. 合并数组

3. 与解构赋值结合，生成数组

   ```javascript
   // ES5
   a = list[0], rest = list.slice(1);
   // ES6
   [a, ...rest] = list;
   // 报错，扩展运算符用于数组赋值时，只能放在参数的最后一位， 否则报错
   const [fir, ...sec, last] = [1,2];
   ```

4. 字符串

   ```javascript
   [...'hello']; // ['h','e','l','l','o']
   ```

5. 实现了Interator接口的对象

6. Map和Set结构，Generator函数

   扩展运算符内部调用数据结构的Iterator接口，因此只要有该接口就可以使用扩展运算符，如Map结构

   

## Array.from()可将类似数组的对象和可遍历对象(iterable)转为真正的数组

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
// 类似数组的对象还有arguments、DOM操作返回的NodeList集合等
// 有Iterator接口的数据结构
// Set Map
```

扩展运算符调用遍历器接口，对象没有这个接口就没法转换。而Array.from对于有length属性的对象都可以转为数组

```javascript
Array.from({ length: 2});// [undefined, undefined]
```

还可以接受第二个参数，对每个元素处理后再放回返回的数组，类似于map方法

第三个参数，绑定map

## Array.of(3,1) // [3, 1]将一组值，转换为数组

为了弥补Array()和new Array()的不足

```javascript
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## 数组实例的copyWithin

## 数组实例的find和findIndex

## 数组实例的fill

## 数组实例的entries keys values

ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历 

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```



## 数组实例的includes

## 数组实例的flat flatMap

## 数组的空位

```javascript
Array(3); // [ , , ,]
// 空位不是undefined，空位没有任何值
0 in [undefined] // true
0 in [,] // false
```

