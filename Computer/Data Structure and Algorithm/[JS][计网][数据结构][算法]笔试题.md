[TOC]
# 笔试题

## JavaScript

### 异步编程

#### 用setTimeout实现setInterval
```javascript
const mySetInterval = function (callback, time) {
    const execute = function (fn, time) {
        setTimeout(function() {
            fn();
            execute(fn, time);
        }, time);
    }
    execute(callback, time);
}
mySetInterval(function () {
    console.log(1);
}, 1000);
```
#### 用clearTimeout实现clearInterval
```javascript
var timeWoker = {};

var mySetInterval = function (callback, time) {
    var key = Symbol();
    var execute = function (fn, time) {
        timeWoker[key] = setTimeout(function() {
            fn();
            execute(fn, time);
        }, time);
    }
    execute(callback, time);
    return key;
}

var myClearInterval = function (key) {
    if (key in timeWoker) {
        clearTimeout(timeWoker[key]);
        delete timeWoker[key];
    }
}
var fn = mySetInterval(function () {
    console.log(1);
}, 1000);

setTimeout(function() {
    myClearInterval(fn);
}, 5000);
```

### 字符串

#### 翻转

```js
function reverseStr(str) {
    return [...str].reverse().join('');
}
```



### 数组

#### 二维数组降维（concat）

Q: [[1,2,3],[4,5,6]]这样的二维数组降维成一维数组

```
// 遍历数组 使用concat连接
function reduceDimension(arr) {
    let arr2 = []; 
    arr.forEach((item) => {
        arr2 = arr2.concat(item);
    });
    return arr2;
}
// 使用apply传入参数数组，仅一行代码
function reduceDimension2(arr) {
    return Array.prototype.concat.apply([], arr);
    // [].concat(arr[0], arr[1], ...);
}
const arr = [[1, 2, 3],[{},'i am string']];
console.log(reduceDimension(arr), reduceDimension2(arr));
```

#### 多维数组降维（concat）

```javascript
var arr = [2, 3, [2, 2], [3, 'f', ['w', 3]], { "name": 'Tom' }];
function deepFlatten(arr) {
    var res = [];
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            res = res.concat(deepFlatten(item));
        });
    } else {
        res = res.concat(arr);
    }
    return res;
}
console.log(deepFlatten(arr));//[2, 3, 2, 2, 3, "f", "w", 3, {name: "Tom"}]
```

#### 一个只有数字和字符串的字符串，寻找其中1出现的次数（正则+遍历）
对于字符串，先用正则判断是否有1出现，再寻找1的个数
```
function findOne(arr) {
    var num = 0;
    arr.forEach((item) => {
        // number string
        if (typeof item === 'number') {
            item = item.toString();
        }
        // 如果包含1
        if (/1+/.test(item)) {
            for (var i = 0; i < item.length; i++) {
                if (item[i] === '1') {
                    num++;
                }
            }
        } 
    });
    return num;
}

var arr = [121, '2jwuwj81', 761, '7h2ij1hhu', ' hug'];

console.log(findOne(arr)); // 5

```
#### 数组去重
##### 全等
###### 使用ES6的Set结构，自动处理NaN
```
const dedupe = function (arr) {
    return Array.from(new Set(arr));
}
let arr = [NaN, 0, [0], [], '0', NaN, {}, ['q'], 'q']; 
console.log(dedupe(arr));
```

###### 使用indexOf和filter，需要特殊处理NaN
```
function dedupeq(array) {
    var hasNaN = false;
    var res = array.filter(function(item, index, array){
        // 由于[NaN].indexOf(NaN) === -1
        // 因此对NaN特殊处理
        if (!hasNaN && item !== item) {
            hasNaN = true;
            return true;
        }
        return array.indexOf(item) === index;
    });
    return res;
}


var arr = [NaN, 0, [0], [], '0', NaN, {}, ['q'], 'q', null, {}, undefined]; 
console.log(dedupeq(arr));
// // [NaN, 0, [0], [], "0", {}, ['q'], "q", null, {}, undefined]
```
##### 相等
这个方法不好
```
function dedupeq(array) {
    var hasNaN = false;
    var res = array.filter(function(item, index, array){
        // 由于[NaN].indexOf(NaN) === -1，因此对NaN特殊处理
        if (!hasNaN && item !== item) {
            hasNaN = true;
            return true;
        }
        for (var i = 0; i < index; i++) {
            if (array[i] == item || item !== item) {
                return false;
            }
        }
        return true;
    });
    return res;
}

var arr = [NaN, 0, [0], [], [], '0', NaN, {}, ['q'], 'q', undefined, null, null];
console.log(dedupeq(arr));
// [NaN, 0, {}, Array(1), undefined]
```

### 引用类型

#### 变量复制 

```js
(function(callback) {
    city = { name: 'hangzhou' };
    callback(city);
})(function(obj) {
    obj.name = 'shanghai';
    obj = { name: 'beijing' };
});

console.log(city.name);
// shanghai 
// 参数obj是引用类型，因此创建了新的变量空间但是指向的仍然是city，obj.name='shanghai'就改变了city的属性，但是obj = { name: 'beijing' }将参数指向了新的变量。因此city.name是shanghai
```

##### 基本类型和引用类型

ES变量可能包含基本数据类型和引用数据类型。基本数据类型（undefined, null, boolean, number, string）是按值访问的，可以操作保存在变量中的实际的值。引用类型的值是保存在内存中的对象，js不能直接访问内存中的位置，也就是说不能直接操作对象的内存空间。操作对象时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是按引用访问的。

##### 复制变量值

从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

从一个变量向另一个变量复制引用类型的值，在栈里分配一个新的变量空间，指向同一个对象。

##### 传递参数

基本类型值的传递和基本类型值的复制一样，引用类型值的传递和引用类型变量的复制一样

## 计网

### www.xxx.com在12:30的访问量
在打开浏览器窗口时计算此时离12:30分的时间，再利用setTimeout执行定时函数查看地址栏域名是否为 www.xxx.com，如果是则在cookie记录发送给服务器，服务器计算访问量

## 逻辑题
### 64匹马，8个跑道，不能记录时间，只能排名次，决定出最快的4匹马

剪枝思想

> [64匹马,8个赛道,找出前4名最少比赛多少场?](https://www.cnblogs.com/reanote/p/find_4th_in_64horse.html)