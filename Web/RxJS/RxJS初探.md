# 入门

结合了观察者模式、迭代器模式和使用集合的函数式编程。

- Observable 可观察对象  是一个可调用的未来值或者事件的集合
- Observer 观察者 一个回调函数的合集，指导如何监听由可观察对象提供的值
- Subscription 订阅 表示可观察对象的执行，可以取消可观察对象的执行
- Operators 操作符 采取函数式编程的纯函数（pure function），使用像map、filter、contact、flatMap这样的操作符来处理集合
- Subject主体 相当于EventEmitter 将值或事件多路推送给多个观察者的唯一方式
- Schedulers 调度器。用来控制并发并且是调度员。



## Observable可观察对象

### 创建

```js
new of from interval ajax create fromPromise fromEvent 
```



### 订阅



### 执行

next 发送一个值。通知

error 发送一个JavaScript错误或者异常

complete 不再发送任何值

### 清理

Obervable的实例.subscribe()会返回一个Subscription对象，订阅者有一个unsubscribe方法可以取消订阅

## Observer观察者

观察者是由Observable发送的值的消费者。观察者只是一组回调函数的集合。要使用观察者，需要把它提供给Observable的subscribe方法。

```javascript
observable.subscribe(observer);
```



## Subscription(订阅者)

Subscription表示可清理资源的对象，通常是Observable的执行。有一个unsubscribe方法用来释放资源或者取消Observable执行。

## Subject主体

多播主体。



## Operators(操作符)

### 什么是操作符

操作符是observable类型上的方法。比如.map、.filter，它们返回一个新的Observable。



Map 将给定地project函数应用于源Observable对象发出的每个值，并将结果值作为Observable发出

switchMap 将每个源值投射成Observable，该Observable会合并到输出observable中，并且只发出最新投射地observable中的值。

finalize finally

[debounceTime](https://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-debounceTime)(dueTime: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), scheduler: [Scheduler](https://cn.rx.js.org/class/es6/Scheduler.js~Scheduler.html)): [Observable](https://cn.rx.js.org/class/es6/Observable.js~Observable.html)只有在特定的一段时间经过后并且没有发出另一个源值，才从源 Observable 中发出一个值。

tap 窃听Observable的生命周期事件，而不会产生打扰

catchError 捕获observable中的错误，可以通过返回一个新的observable或者抛出错误对象来处理

