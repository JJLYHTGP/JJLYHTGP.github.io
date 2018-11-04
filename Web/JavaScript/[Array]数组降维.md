[TOC]

# JavaScript数组降维
### 二维数组降维

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

### 多维数组降维

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
console.log(deepFlatten(arr));// [2, 3, 2, 2, 3, "f", "w", 3, {name: "Tom"}]
```



## Array类型方法总结

- Array方法：  

     | 方法          | 类别            | 描述                                                         | 参数                             | 返回值             |
     | ------------- | --------------- | ------------------------------------------------------------ | -------------------------------- | ------------------ |
     | filter        | 一层深拷贝      | 创建一个新数组，其包含通过所提供函数实现的测试的所有元素     |                                  |                    |
     | concat        | 一层深拷贝      | 合并两个或多个数组 concat() 方法把合并的数组元素**浅拷贝**到一个新数组对象。且原始数组不会被修改。 | 多个数组参数                     | 合并后的数组       |
     | pop           |                 | 改变原数组 删除最后一个元素                                  |                                  | 数组的最后一个元素 |
     | push          |                 | 改变原数组 增加一个元素或更多元素                            | 添加到数组的一个或多个元素       | 新的长度           |
     | reverse       |                 | 改变原数组                                                   |                                  |                    |
     | shift         |                 | 改变原数组 删除第一个元素                                    |                                  | 数组的第一个元素   |
     | unshift       |                 | 改变原数组 从头插入                                          | 一个或多个元素                   | 新的长度           |
     | slice         | 深拷贝 just一层 | slice() 方法返回一个从开始到结束（**\*不包括结束***）选择的数组的一部分**浅拷贝**到一个新数组对象。且原始数组不会被修改。 | start,end默认0,length            | 拷贝的新数组       |
     | sort          |                 | 改变原数组                                                   | sort函数                         |                    |
     | splice        |                 | 改变原数组  向/从数组中添加/删除项目，然后返回被删除的项目。 | 删除位置，删除数量，添加的新项目 | 被删除的项目       |
     | join          |                 | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 | 数组                             | String             |
     | toString      |                 |                                                              |                                  |                    |
     | toLocalString |                 |                                                              |                                  |                    |
     | valueOf       |                 |                                                              |                                  |                    |

​    

```javascript
 // slice是一层深拷贝
var a = [[1,2,3],4,5];
var b = a.slice();
console.log(a === b);// false
a[0][0] = 6;
console.log(a === b); // false
console.log(a[0] === b[0]); // true
```



> [JavaScript之数组降维](https://juejin.im/entry/5847c1600ce46300578d99bf)