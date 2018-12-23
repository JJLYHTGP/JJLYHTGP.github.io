# RxJS学习日记

> [30天精通RxJS](https://github.com/ShaofeiZi/30-days-proficient-in-rxjs)

## 02 函数式编程基本观念

### 什么是函数式编程

是一种编程范式，用函数说话。中心思想上把运算过程尽量写成一系列的嵌套的函数调用。



### 基本要件

- 函数能够赋值给变量

- 函数能作为参数

- 函数能当做回传值


### 重要特性

- 表达式而不是陈述式

  add(1, 2) a=1

- 纯函数

  - http请求
  - 画面印出值或log
  - 获得使用者input
  - Query DOM


### 优势 

- 可读性高
- 可维护性
- 易于并行、平行处理



## 03通用函数

### ForEach

### Map

### Filter

### ContcatAll

## 04什么是Observable

### 观察者模式

- 消息发布者和订阅者紧耦合

### Iterator Pattern

## 05、06 建立Observable

### Operators

#### empty，never，throw

```js
var source = Rx.Observable.empty();
// 返回一个空的observable 如果订阅则立即执行complete的回调！
```

```js
var source = Rx.Observable.never();
// 什么都不做的observable，不发出任何东西
```

```js
var source = Rx.Observable.throw('Oop!');
// 只做一件事就是抛出错误
```

## 07-20Observable Operators & Marble Diagrams

**每个operator都会回传一个新的observable。**

### map

传入一个回调函数，这个回调函数处理发送来的元素后回传新的元素。

### filter

传入一个回调函数，并回传一个布尔值，如果为true就会保留，如果为false就会被过滤掉

### take

取前几个元素后就结束。first即为接收到第一个元素时就结束，行为与take(1)一致。

### takeUntil

```ts
var source = Rx.Observable.interval(1000);
var click = Rx.Observable.fromEvent(document.body, 'click');
var example = source.takeUntil(click);     
// click发生时，example发送complete信息

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 0
// 1
// 2
// 3
// complete (点击body了
```

### contactAll

### 拖拽实战

```js
const dragDOM = document.getElementById('drag');
const body = document.body;

const mouseDown = Rx.Observable.fromEvent(dragDOM, 'mousedown');
const mouseUp = Rx.Observable.fromEvent(body, 'mouseup');
const mouseMove = Rx.Observable.fromEvent(body, 'mousemove');

mouseDown
  // mouseup发生时，mousemove完成
  .map(event => mouseMove.takeUntil(mouseUp))
  // mousedown发送的mousemove: Observal，拍扁数组
  .concatAll()
  // 返回每个位置的坐标
  .map(event => ({ x: event.clientX, y: event.clientY }))
  .subscribe(pos => {
    // 更改dom位置
  	dragDOM.style.left = pos.x + 'px';
    dragDOM.style.top = pos.y + 'px';
  });

mouseDown
  .pipe(
  	map(event => mouseMove.takeUntil(mouseUp)),
    concatAll(),
    map(event => ({ x: event.clientX, y: event.clientY }))
  )
  .subscribe(pos => {
  	dragDOM.style.left = pos.x + 'px';
    dragDOM.style.top = pos.y + 'px';
  });
```

### skip

### merge

merge与concat一样都是合并observable，但是行为上存在差异。

concat保证先处理完第一个observable，再处理后面的。而merge则是把多个可观察对象同时处理

### withLatestForm

### debounceTime

只有在特定的一段时间经过后并且没有发出另一个源值，才能从源Observable中发出一个值。

debunceTime会延迟发送源Observable发送的值，但是会丢弃正在排队的发送。如果源Observable又发出新值。

控制发送频率的操作符，可以看做延时操作符。=> 函数节流



### concatAll



### switch

switch 最重要的就是他会**在新的 observable 送出后直接处理新的 observable 不管前一个 observable 是否完成，每当有新的 observable 送出就会直接把旧的 observable 退订(unsubscribe)，永远只处理最新的 observable!

### switchMap

下一个observable被送出后直接退订前一个未处理完的observable => 发出多个HTTP请求，但是前一个未处理完就又发了第二个，就退订前一个请求。



## 22-25 Subject

```js
source.subscribe(observerA);
source.subscribe(observerB);
// 每次的订阅都建立了一个新的执行
```

虽然前面我们已经示范直接手写一个简单的 subject，但到底 RxJS 中的 Subject 的概念到底是什么呢？

首先 Subject 可以拿去订阅 Observable(source) 代表他是一个 Observer，同时 Subject 又可以被 Observer(observerA, observerB) 订阅，代表他是一个 Observable。

总结成两句话

- Subject 同时是 Observable 又是 Observer
- Subject 会对内部的 observers 清单进行组播(multicast)

```ts
subject.subscribe(observerA);
subject.subscribe(observerB);
```



### BehaviorSubject

如果今天有一个新的订阅 Subject能立即给出最新的值

### ReplaySubject

在某些时候我们会希望 Subject 代表事件，但又能在新订阅时重新发送最后的几个元素，这时我们就可以用 ReplaySubject