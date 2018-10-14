[TOC]

# this
## 定义
this是执行上下文中的一个属性，this值在进入上下文时确定，并且在上下文运行期间永久不变。

> 在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象（base object），在其他情况下（与引用类型不同的任何其它属性），这个值为null。不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。
## 案例
### 全局代码中的this
```
//直接打印
console.log(this) //window

//自执行函数
(function () {console.log(this)})(); //window
```

### 函数代码中的this
进入上下文时确定

1. 对象方法调用，this指向当前对象
```
var foo = {x: 10};
var bar = {
	x: 20,
	test: function () {
		console.log(this);
	    console.log(this.x); 
	}
 };
 bar.test(); // bar, 20		 
foo.test = bar.test;		 
foo.test(); // foo, 10

```
2. 事件绑定
```
var btn = document.querySelector('#btn');
btn.onclick=function() {
    console.log(this);
} // btn
```
3. 事件监听
```
btn.addEventListener('click', function() {
    console.log(this);//btn
})
```
4. 在构造函数或构造函数原型对象
```
function Person (name) {
    this.name = name;
    console.log(this);
    self=this;
}
// 不使用new指向window
Person('inwe');// window
// 使用new
var person = new Person('iwen');
console.log(self===person);// true
```
### 箭头函数中的this

## 改变this指向的方法
bind\apply\call：接收第一个参数并将其赋给this。
```
function fn() {
    console.log(this.a);
}
fn.call({a:2});//2
```
1. apply的第二个参数必须是数组或者arguments对象，call可以接收多个参数，第一个是作用域对象，第二个及之后的作为函数的参数
2. 如果传递第一个值为简单值，那么后台会自动转换为相应的封装对象，如果传值为null，那么结果就是绑定默认为全局变量

> [深入理解JavaScript系列（13）：This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)<br>
[彻底弄懂js中this的指向](https://blog.csdn.net/qq_33988065/article/details/68957806)