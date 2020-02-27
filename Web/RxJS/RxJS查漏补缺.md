# RxJS查漏补缺

> [30天精通RxJS](https://github.com/ShaofeiZi/30-days-proficient-in-rxjs)
>
> [[译] 认识 rxjs 中的 Subject - 掘金](https://juejin.im/post/5cb49cd9e51d456e577f9346)
>
> 

结合了观察者模式、迭代器模式和使用集合的函数式编程。

- Observable 可观察对象  是一个可调用的未来值或者事件的集合
- Observer 观察者 一个回调函数的合集，指导如何监听由可观察对象提供的值
- Subscription 订阅 表示可观察对象的执行，可以取消可观察对象的执行
- Operators 操作符 采取函数式编程的纯函数（pure function），使用像map、filter、contact、flatMap这样的操作符来处理集合
- Subject主体 相当于EventEmitter 将值或事件多路推送给多个观察者的唯一方式
- Schedulers 调度器。用来控制并发并且是调度员。

## Subject

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

### AsyncSubject

### PublishSubject

### ControlSubject

