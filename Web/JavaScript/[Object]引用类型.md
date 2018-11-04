[TOC]

# 引用类型

## Object类型

## Array类型

### 检测数组
```JavaScript
// 只有一个全局作用域
arr instanceof Array

// 可以多个全局作用域
Array.isArray(arr)

```
### 转换方法
toString
toLocalString
valueOf

### 栈方法
push pop

### 队列方法
push shift

### 重排序方法
reverse
sort

### 操作方法
slice
concat
splice

### 位置方法
indexOf lastIndexOf

### 迭代方法
every
filter
forEach
map
some

### 归并方法
reduce
reduceRight

## Date类型
## RegExp类型
## Function类型

### 没有重载

### 函数声明与函数表达式
```JavaScript
// 不会报错
// 函数声明被提升到执行环境顶部
// JavaScript引擎在向执行环境加载数据时，
// 对函数声明和函数表达式一视同仁。
// 解析器会在第一遍声明函数并将它们放到源代码树的顶部
alert(sum)

function sum () {
    return 1;
}
```

```JavaScript
// 报错 unexpected identifier
// 函数在一个初始化语句中，而不是一个函数声明
//在执行到函数所在的语句之前，
//变量sum中不会保存有对函数的引用。
alert(sum)

var sum = function() {
    return 1;
};
```
### 作为值的函数

### 函数内部属性
#### arguments
  arguments是一个==类数组对象==，包含传入函数的所有参数，
这个对象有一个callee属性，该属性是一个指针，指向拥有这个arguments对象的函数。

#### this
http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html




### 函数的属性和方法

属性：length prototype

方法：apply call 接收参数是运行函数的作用域，参数数组


