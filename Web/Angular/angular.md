# Angular

## 架构

### 架构概览

- NgModule：为组件提供了编译的上下文环境，会把相关的代码收集到一些功能集中。
- 组件：组件类的元数据将组件类与一个用来定义视图的模板关联起来。`@Component`装饰器表示紧随它的那个类时一个组件，并提供模板和该组件专属的元数据。
- 模板：把普通的HTML和指令与绑定标记组合起来。这样angular就可以在呈现HTML之前修改HTML
- 视图：一组可见的屏幕元素。
- 服务：服务的元数据提供了一些信息，angular要用这些信息来让组件可以通过依赖注入使用该服务。
- 组件可以使用服务，服务也可以使用服务，服务提供商可以作为依赖被注入到组件中。
- 路由：
  - 当前应用状态需要特定功能，但定义功能的模块尚未加载，则路由器会按需惰性加载此模块。

### NgModule简介

app.module.ts

```typescript
@NgModule({
    // 可声明对象表，属于本NgModule的组件、指令、管道
    declarations: [
        AppComponent,
        BoardComponent
    ],
   // 导出表 能在其他模块的组件模板中使用的可声明对象的子集
    export:
    // 导入表 导出了本模块中的组件模板所需的类的其他模块
  	imports: [
    	BrowserModule
  	],
   	// 本模块向全局服务中贡献的那些服务的创建器。这些服务能被本应用的任何部分使用
  	providers: [],
    // 应用的主视图，成为根组件。它是应用中所有其他视图的宿主。只有跟模块才应该设置这个bootstrap属性。
  	bootstrap: [AppComponent]
})
export class AppModule { }
```

- NgModule为其中的组件提供了一个编译上下文环境。根模块总会有一个根组件，并在引导期间创建它。

- 任何模块都能包含任意数量的其他组件。
- 组件可以通过路由器加载，也可以通过模板创建
- 属于这个NgModule的组件会共享同一个编译上下文环境

### 组件简介

组件：组件控制屏幕上被称为视图的一小片区域

app.component.ts 组件的元数据

```ts
@Component({
    // css选择器
    selector: 'app-root',
    templateUrl: './app.component.html',
    // 当前组件所需的服务提供商的一个数组。
    providers: [],
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'gobang';
}
```

管道（相当于过滤器）：

- 自带管道，如date管道和currency管道
- {{|}}
- 可以接受参数

指令：

- 指令是一个带有@Directive()装饰器的类
- 结构型指令：通过添加、移除或替换DOM元素来修改布局。*ngFor *ngIf等
- 属性型指令：会修改现有元素的外观或行为。[(ngModule)]实现了双向绑定

### 服务与依赖注入（DI）简介

- angular把组件和服务区分开，以提高模块性和复用性
- 服务可以依赖其他服务

## 组件与模板

### 显示数据

- 插值。angular会从组件中提取出插值花括号内的属性的值，并把值插入到浏览器中。当这些属性发生变化时，angular就会自动刷新
- 模板可以内联或者使用文件
- 构造函数
- ngFor
- ngIf 条件



### 模板语法

MVC：模型-视图-控制器

MVVM：模型-视图-视图模型

在angular中，组件是控制器或视图模型，模板是视图

#### 模板中的HTML

HTML是angular的模板语言，它禁用了script标签

#### 插值表达式

- 插值表达式可以把计算后的字符串插入到**HTML标签内的文本**或者对**标签属性**进行赋值
- 括号内的素材是模板表达式的话，会先求值再转换为字符串。可以使用运算符，也可以调用宿主组件的方法。
- angular将插值表达式转换成了属性绑定



#### 模板表达式操作符

##### 管道操作符{{|}}

##### 安全导航操作符?.

```html
<!-- 当hero为空时，避免视图渲染器抛出错误导致整个视图都不见了 -->
{{hero?.name}}
{{a?.b?.c?.d }}
```

##### 非空断言操作符!

--strictNullChecks(https://www.tslang.cn/docs/release-notes/typescript-2.0.html)

如果类型检查器在运行期间无法确定一个变量是 null 或 undefined，那么它也会抛出一个错误。 你自己可能知道它不会为空，但类型检查器不知道。 所以你要告诉类型检查器，它不会为空，这时就要用到[*非空断言操作符*](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)。

非空断言操作符不会防止出现null或undefined，只是告诉typescript的类型检查器对特定的属性表达式，不做“严格空值检测”。

#### 模板表达式

[property]="expression"



禁止的表达式：

- 赋值= += -=
- new运算符
- 使用;或,的链式表达式
- 自增和自减运算符

其他：

- 不支持位运算| &
- 新的模板表达式运算符| ?. !

##### 表达式上下文

优先级：模板变量、指令的上下文变量、组件的成员

- 组件实例
- 指令的上下文变量
- 组件之外的对象：模板输入变量(let hero)和模板引用变量(#heroInput)

```ts
<div *ngFor="let hero of heroes">{{hero.name}}</div>
<input #heroInput> {{heroInput.value}}
```

- 模板表达式不能引用全局明命名空间的任何东西。如window、document，也不能调用console.log和Math.max。只能引用表达式上下文中的成员

##### 表达式指南

- 执行迅速。

Angular 会在每个变更检测周期后执行模板表达式。 它们可能在每一次按键或鼠标移动后被调用。表达式应该快速结束，否则用户就会感到拖沓，特别是在较慢的设备上。 当计算代价较高时，应该考虑缓存那些从其它值计算得出的值。

Angular executes template expressions after every change detection cycle. **Change detection cycles are triggered by many asynchronous activities such as promise resolutions, http results, timer events, keypresses and mouse moves.**

- ...

#### 模板语句

模板**语句**用来响应由绑定目标（如 HTML 元素、组件或指令）触发的**事件**。 模板语句将在[事件绑定](https://www.angular.cn/guide/template-syntax#event-binding)一节看到，它出现在 `=` 号右侧的引号中，就像这样：`(event)="statement"`。

src/app/app.component.html`content_copy<button (click)="deleteHero()">Delete hero</button>`

模板语句**有副作用**。 这是事件处理的关键。因为你要根据用户的输入更新应用状态。

某些JavaScript语法依然不允许：

- new运算符
- 自增和自减运算符
- 操作并赋值
- 位操作符
- 模板表达式运算符

##### 语句上下文

##### 语句指南

#### 绑定语法

##### 新的思维模型

```html
<!-- Bind button disabled state to `isUnchanged` property --> <button [disabled]="isUnchanged">Save</button>
```

一旦开始数据绑定，就不再跟 HTML attribute 打交道了。 这里不是设置 attribute，而是设置 DOM 元素、组件和指令的 property。

##### HTML attribute与DOM property的对比

> ### HTML attribute 与 DOM property 的对比
>
> 要想理解 Angular 绑定如何工作，重点是搞清 HTML attribute 和 DOM property 之间的区别。
>
> **attribute 是由 HTML 定义的。property 是由 DOM (Document Object Model) 定义的。**
>
> - 少量 HTML attribute 和 property 之间有着 1:1 的映射，如 `id`。
> - 有些 HTML attribute 没有对应的 property，如 `colspan`。
> - 有些 DOM property 没有对应的 attribute，如 `textContent`。
> - 大量 HTML attribute 看起来映射到了 property…… 但却不像你想的那样！
>
> 最后一类尤其让人困惑…… 除非你能理解这个普遍原则：
>
> **attribute 初始化 DOM property，然后它们的任务就完成了。property 的值可以改变；attribute 的值不能改变。**
>
> 例如，当浏览器渲染 `<input type="text" value="Bob">` 时，它将创建相应 DOM 节点， 它的 `value` 这个 property 被*初始化为* “Bob”。
>
> 当用户在输入框中输入 “Sally” 时，DOM 元素的 `value` 这个 *property*变成了 “Sally”。 但是该 HTML 的 `value` 这个 *attribute* 保持不变。如果你读取 input 元素的 attribute，就会发现确实没变：`input.getAttribute('value') // 返回 "Bob"`。
>
> HTML 的 `value` 这个 attribute 指定了*初始*值；DOM 的 `value` 这个 property 是*当前*值。
>
> `disabled` 这个 attribute 是另一种特例。按钮的 `disabled` 这个 *property* 是 `false`，因为默认情况下按钮是可用的。 当你添加 `disabled` 这个 *attribute* 时，只要它出现了按钮的 `disabled` 这个 *property* 就初始化为 `true`，于是按钮就被禁用了。
>
> 添加或删除 `disabled` 这个 *attribute* 会禁用或启用这个按钮。但 *attribute* 的值无关紧要，这就是你为什么没法通过 `<button disabled="false">仍被禁用</button>` 这种写法来启用按钮。
>
> 设置按钮的 `disabled` 这个 *property*（如，通过 Angular 绑定）可以禁用或启用这个按钮。 这就是 *property* 的价值。
>
> **就算名字相同，HTML attribute 和 DOM property 也不是同一样东西。**



##### 绑定目标



#### 属性绑定

##### 单向输入

##### 绑定目标

##### 消除副作用

##### 返回恰当的类型

##### 方括号

##### 一次性字符串初始化

当满足下列条件时，*应该*省略括号：

- 目标属性接受字符串值。
- 字符串是个固定值，可以直接合并到模块中。
- 这个初始值永不改变。

##### 属性绑定or插值表达式？

#### attribute、class和style绑定

##### attribute

[attr.colspan]

##### class

[class]="badCurly"

##### style绑定

[style.color]="isSpecial ? 'red' : green"



#### 事件绑定

事件绑定都是单项数据流：从组件到元素。

(click)="onSave()"

##### 目标事件

圆括号内的名称(click)标记出目标事件

##### $event和事件处理语句

$event是DOM事件对象

##### 使用EventEmitter实现自定义事件

```ts
指令创建一个EventEmitter实例，并把它作为属性暴露出来。指令调用EventEmitter.emit(payload)来触发事件，可以传入任何东西作为消息载荷。父指令通过绑定到这个属性来监听事件。
```

```ts
// hero-detail.component.ts
template: `
<div>
  <img src="{{heroImageUrl}}">
  <span [style.text-decoration]="lineThrough">
    {{prefix}} {{hero?.name}}
  </span>
  <button (click)="delete()">Delete</button>
</div>`

// This component makes a request but it can't actually delete a hero.
// 组件定义了deleteRequest属性。当用户点击删除时，调用delete方法，让EventEmitter发出一个Hero对象
deleteRequest = new EventEmitter<Hero>();

delete() {
  this.deleteRequest.emit(this.hero);
}
```

```ts
// app.component.html 这是宿主的父组件，绑定了HeroDetailComponent的deleteRequest(EventEmitter实例)事件。当该事件被触发时，angular调用父组件的deleteHero方法，在$event变量中传入要删除的英雄(来自HeroDetail)
<app-hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero"></app-hero-detail>
```



##### 模板语句有副作用

#### 双向数据绑定([...])



#### 内置指令

#### 内置属性型指令

- NgClass

  [NgClass]="currentClasses"

- NgStyle

- NgModel

#### 内置结构型指令

- 职责是HTML布局，将塑造或重塑DOM结构。这通常是添加、移除和操纵它们所附加到的宿主元素来实现的。

- NgIf

  - 使用display来隐藏子树，则子树仍然留在DOM里。angular仍会检查变更。
  - NgIf为false时，angular从DOM中物理地移除了这个元素子树，销毁了子树中的组件及其状态，释放了计算资源。
  - 防范空指针错误

  ```html
  <div *ngIf="currentHero">Hello, {{currentHero.name}}</div>
  ```

- NgSwitch

- NgForOf

带 `trackBy` 的 `*ngFor`

`ngFor` 指令有时候会性能较差，特别是在大型列表中。 对一个条目的一丁点改动、移除或添加，都会导致级联的 DOM 操作。

例如，重新从服务器查询可以刷新包括所有新英雄在内的英雄列表。

他们中的绝大多数（如果不是所有的话）都是以前显示过的英雄。*你*知道这一点，是因为每个英雄的 `id` 没有变化。 但在 Angular 看来，它只是一个由新的对象引用构成的新列表， 它没有选择，只能清理旧列表、舍弃那些 DOM 元素，并且用新的 DOM 元素来重建一个新列表。

#### 模板引用变量(#var)

模板引用变量用来引用模板中的某个DOM元素，还可以引用Angular组件或指令或WebComponent。

- 模板中引用 模板引用变量

  ```html
  <input #phone placeholder="phone number">
  
  <!-- lots of other elements -->
  
  <!-- phone refers to the input element; pass its `value` to an event handler -->
  <button (click)="callPhone(phone.value)">Call</button>
  ```

- 模板引用变量得到它的值

  ```html
  <!--如果没有导入FormsModule，它就是一个HTMLFormElement实例。这里的heroForm事一个Angular NgForm指令的引用，具备了跟踪表单中每个控件地值和有效性地能力-->
  <form (ngSubmit)="onSubmit(heroForm)" #heroForm="ngForm">
    <div class="form-group">
      <label for="name">Name
        <input class="form-control" name="name" required [(ngModel)]="hero.name">
      </label>
    </div>
      <!--跟踪button控件有效性-->
    <button type="submit" [disabled]="!heroForm.form.valid">Submit</button>
  </form>
  <div [hidden]="!heroForm.form.valid">
    {{submitMessage}}
  </div>
  ```

- 模板引用变量变量地作用范围（scope）是整个模板。

#### 输入和输出属性

- An **Input** property is a *settable* property annotated with an `@Input` decorator. Values flow *into* the property when it is data bound with a [property binding](https://www.angular.cn/guide/template-syntax#property-binding)
- An **Output** property is an *observable* property annotated with an `@Output`decorator. The property almost always returns an Angular [`EventEmitter`](https://www.angular.cn/api/core/EventEmitter). Values flow *out* of the component as events bound with an [event binding](https://www.angular.cn/guide/template-syntax#event-binding).

```html
<app-hero-detail [hero]="currentHero" (deleteRequest)="deleteHero($event)">
</app-hero-detail>

Uncaught Error: Template parse errors:
Can't bind to 'hero' since it isn't a known property of 'app-hero-detail'
```

**Angular 编译器不会绑定到其它组件的属性上 —— 除非这些属性是输入或输出属性。**

输入接收数据值，输出属性暴露事件生产者。



#### 类型转换函数`$any($any<表达式>)`

### 用户输入



#### 绑定到用户输入事件

#### 通过$event对象取得用户输入

#### 从一个模板引用变量中获得用户输入

组件代码从视图中获得了干净的数据值，不需要了解整个$event变量及其结构了

```ts
@Component({
  selector: 'app-key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}

```

#### 按键事件过滤(key.enter)

```ts
// 检查每个$event.keyCode 只有键值是回车键时才采取行动

@Component({
  selector: 'app-key-up3',
  template: `
    <input #box
		(keyup.enter)="onEnter(box.value)"
		(blur)="onEnter(box.value)"
	>
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v3 {
  value = '';
  onEnter(value: string) { this.value = value; }
}
```

#### 失去焦点事件(blur)

### 生命周期钩子

| 钩子                  | 用途                                                         | 接受参数                            | 时机                                                         |
| --------------------- | ------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------ |
| ngOnChanges           | 当angular（重新）设置数据绑定输入属性时响应。                | 当前和上一属性值的SimpleChanges对象 | 1. 首次调用发生在ngOnInit之前 2. 绑定的输入属性的值发生变化时调用 |
| ngOnInit              | 1. 构造函数之后马上执行复杂的初始化逻辑 2. 在angular设置完输入属性后，对该组件进行准备 |                                     | 第一轮ngOnChanges完成之后调用                                |
| ngDoCheck             | 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。Detect and act upon changes that Angular can't or won't detect on its own. |                                     | 在每个 Angular 变更检测周期中调用，`ngOnChanges()` 和 `ngOnInit()` 之后。Called during every change detection run, immediately after `ngOnChanges()` and `ngOnInit()`. |
| ngAfterContentInit    | 把内容投影进组件之后调用                                     |                                     | 第一次 `ngDoCheck()` 之后调用，只调用一次。                  |
| ngAfterContentChecked | 每次完成被投影组件内容的变更检测之后调用。                   |                                     | `ngAfterContentInit()` 和每次 `ngDoCheck()` 之后调用         |
| ngAfterViewInit       | 初始化完组件视图及其子视图之后调用。                         |                                     | 第一次 `ngAfterContentChecked()` 之后调用，只调用一次。      |
| ngAfterViewChecked    | 每次做完组件视图和子视图的变更检测之后调用。                 |                                     | `ngAfterViewInit()` 和每次 `ngAfterContentChecked()` 之后调用 |
| ngOnDestroy           | 当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。 |                                     | 在 Angular 销毁指令/组件之前调用。                           |

#### OnInit

在指令的构造函数完成之前，那些被绑定的输入属性还没有值，不能使用。在ngOnInit执行的时候，这些属性会被正确赋值。

#### OnDestroy

一些清理逻辑必须在angular销毁指令之前运行：释放不会被垃圾收集器自动回收的各类资源。

- 取消对可观察对象和DOM事件的订阅
- 停止定时器
- 注销该指令曾注册到全局服务或应用级服务中的各种回调函数

#### OnChanges

```ts
@Input() hero: Hero;
@Input() power: string;

<on-changes [hero]="hero" [power]="power"></on-changes>
```

- 使用输入框改变hero.name和改变power时，power变化时可以捕捉，但是hero.name的变化不能被捕捉，因为hero属性的值是一个到对象的引用，angular不会关心对象的属性的变化

#### DoCheck

检测angular自身无法捕获的变更并采取行动。

#### AfterView

#### AfterContent

**AfterContent** 钩子和 **AfterView** 相似。关键的不同点是子组件的类型不同。

- **AfterView** 钩子所关心的是 `ViewChildren`，这些子组件的元素标签会出现在该组件的模板*里面*。
- **AfterContent** 钩子所关心的是 `ContentChildren`，这些子组件被 Angular 投影进该组件中。

### 组件之间的交互

#### 父组件到子组件使用输入属性传递数据

#### setter截听

使用一个输入属性的 setter，以拦截父组件中值的变化，并采取行动。

```ts
import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-name-child',
  template: '<h3>"{{name}}"</h3>'
})
export class NameChildComponent {
  private _name = '';
 
  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
 
  get name(): string { return this._name; }
}
```



#### ngOnChanges()截听输入属性值的变化

监视多个、交互式输入属性的时候，本方法比用属性的setter更合适。



#### 父组件监听子组件的事件

#### 父组件与子组件通过本地变量互动

```ts
<app-countdown-timer #timer></app-countdown-timer>

timer是子组件的应用，父组件的模板中就可以访问子组件的所有属性和方法。必须全部在父组件的模板中进行，父组件本身的代码对子组件没有访问权
```

#### 父组件调用@ViewChild()

如果父组件的类需要读取子组件的属性或者调用子组件的方法，就不能使用本地变量。父组件类需要这种访问时，可以把子组件作为ViewChild，注入到父组件里面。

#### 父组件和子组件通过服务通讯

### 组件样式

#### 使用组件样式

#### 范围化的样式

样式模块化：

在 `@Component` 的元数据中指定的样式只会对该组件的模板生效。它们既不会被模板中嵌入的组件继承，也不会被通过内容投影（如 ng-content）嵌进来的组件继承。

#### 特殊的选择器

- :host选择器
  - 选择组件宿主元素中的元素（相对于组件模板内部的元素）
  - :host(.active)把宿主元素作为目标，但是只有当它同时带有 `active` CSS 类的时候才会生效。
- :host-context选择器
  - 基于某些来自组件视图外部的条件应用样式。

#### 把样式加载进组件中

> 注意：这些样式**只对当前组件生效**。 它们**既不会作用于模板中嵌入的任何组件**，也不会作用于投影进来的组件（如 `ng-content` ）。

有几种方式把样式加入组件：

- 设置 `styles` 或 `styleUrls` 元数据
- 内联在模板的 HTML 中
- 通过 CSS 文件导入

上述作用域规则对所有这些加载模式都适用。

#### 控制视图的封装模式

通过在组件的元数据上设置*视图封装模式*，你可以分别控制*每个组件*的封装模式。 可选的封装模式一共有如下几种：

- `ShadowDom` 模式使用浏览器原生的 Shadow DOM 实现（参见 [MDN](https://developer.mozilla.org/) 上的 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)）来为组件的宿主元素附加一个 Shadow DOM。组件的视图被附加到这个 Shadow DOM 中，组件的样式也被包含在这个 Shadow DOM 中。(译注：不进不出，没有样式能进来，组件样式出不去。)
- `Native` 视图包装模式使用浏览器原生 Shadow DOM 的一个废弃实现 —— [参见变化详情](https://hayato.io/2016/shadowdomv1/)。
- `Emulated` 模式（**默认值**）通过预处理（并改名）CSS 代码来模拟 Shadow DOM 的行为，以达到把 CSS 样式局限在组件视图中的目的。 更多信息，见[附录 1](https://angular.cn/guide/component-styles#inspect-generated-css) 。(译注：只进不出，全局样式能进来，组件样式出不去)
- `None` 意味着 Angular 不使用视图封装。 Angular 会把 CSS 添加到全局样式中。而不会应用上前面讨论过的那些作用域规则、隔离和保护等。 从本质上来说，这跟把组件的样式直接放进 HTML 是一样的。(译注：能进能出。)

#### 查看仿真模式下生成的CSS

### Angular自定义元素

自定义元素扩展了 HTML，它允许你定义一个由 JavaScript 代码创建和控制的标签。 浏览器会维护一个自定义元素（也叫 Web Components）的注册表 `CustomElementRegistry`，它把一个可实例化的 JavaScript 类映射到 HTML 标签上。



### 动态组件



### 属性型指令

#### 指令概览

#### 创建一个简单的属性型指令

#### 使用属性型指令

#### 响应用户引发的事件

```ts
@Directive({
    selector: '[appHighlight]'
})
export cless HighlightDirective {
    constructor(private el: ElementRef) { }
 
    @HostListener('mouseenter', ['$event'])
    onMouseEnter(e) {
        this._event = e;
        this.el.nativeElement.style.color = 'yellow';
    }  
}
```

#### 使用@input数据绑定向指令传递值

```html
// 父组件
<p [appHighlight]="color">Highlight me!</p>
```

```ts
// highlight.directive.ts
@Input('appHighlight') highlightColor: string; 
```

#### 测试

#### 绑定到第二个属性



#### 为什么要加@input

无论哪种方式，`@Input` 装饰器都告诉 Angular，该属性是*公共的*，并且能被父组件绑定。 如果没有 `@Input`，Angular 就会拒绝绑定到该属性。

### 结构型指令

#### 什么是结构型指令

你将学到[星号(*)这个简写方法](https://www.angular.cn/guide/structural-directives#asterisk)，而这个字符串是一个[*微语法*](https://www.angular.cn/guide/structural-directives#microsyntax)，而不是通常的[模板表达式](https://www.angular.cn/guide/template-syntax#template-expressions)。 Angular 会解开这个语法糖，变成一个 `<ng-template>` 标记，

#### NgIf案例分析

- NgIf会从DOM中移除它的宿主元素，取消它监听过的DOM事件，从angular变更检测中移除该组件，并销毁它。

#### 星号前缀*

#### ngIf内幕

#### ngFor内幕

每个宿主元素上只能有一个结构型指令。

可以使用ng-container作为容器，并把`*ngIf`放在上面，再包装进`*ngFor`元素。这个元素可以使用ng-container，以免引入一个新的HTML层级。



#### NgSwitch内幕

#### 优先使用星号语法

#### ng-template指令

ng-template是一个angular元素，用来渲染HTML，但是不会直接显示出来。渲染视图之前，会把ng-template及其内容替换为一个注释。



#### 用ng-container把一些兄弟元素归为一组

#### 写一个结构型指令



### 管道

#### 使用管道

#### 内置的管道

#### 对管道进行参数化

#### 链式管道

#### 自定义管道

#### PipeTransform接口

#### 能力倍增计算器

#### 管道与变更检测

#### 纯与非纯管道

## 表单

### 简介

#### 关键差异

|          | 响应式               | 模板驱动         |
| -------- | -------------------- | ---------------- |
| 表单模式 | 显式，在组件类中创建 | 隐式，由组件创建 |
| 数据模式 | 结构化               | 非结构化         |
| 可预测性 |                      |                  |
| 表单验证 |                      |                  |
| 可变性   |                      |                  |
| 可伸缩性 |                      |                  |



#### 共同基础



#### 建立表单模型

#### 表单中的数据流

#### 表单验证

#### 测试

#### 可变性

#### 可伸缩性

#### 最后的想法

#### 下一步

### 响应式表单

### 模板驱动表单

### 表单验证

### 动态表单



## Observable与RxJS

### 可观察对象

可观察对象在应用的发布者和订阅者之间传递消息。

#### 定义观察者

用于接收可观察对象通知的处理器要实现Observer接口，这个对象定义了一些回调函数来处理可观察对象可能会发来的三种通知。

| 通知类型 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| next     | 必要。用来处理每个送达值，在开始执行后可能执行零次或多次     |
| error    | 可选。用来处理错误通知。错误会中断这个可观察对象实例的执行过程 |
| comlete  | 可选。用来处理执行完毕的通知。当执行完毕后，这些值就会继续传给下一个处理器。 |



#### 基本用法和词汇

订阅者subscriber，订阅者函数用于定义如何获取或生成那些需要发布的值或消息

```javascript
const locations = new Observable((observer) => {
   	const {next, error} = observer;
    let watchId;
    
    if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(next, error);
    } else {
        error('Geolocation not available');
    }
    return {
        unsubscribe() { 
            navigator.geolocation.clearWatch(watchId); 
        }
    };
});

// 要执行所创建的可观察对象，并开始从中接收通知，就要调用subscribe方法，并传入一个观察者(一个JavaScript对象，定义了收到这些消息的处理器handler)
const locationsSubscription = locations.subscribe({
    next(position) {
        console.log('Current Position: ', position);
    },
    error(msg) {
        console.log('Error getting location: ', msg);
    }
});

// subscribe会返回一个Subscription对象，该对象会有一个unsubscribe方法，可以调用该方法停止接收通知
setTimeout(()=>{locationsSubscription.unsubscribe();}, 10000);
```

#### 订阅



#### 创建可观察对象

#### 多播

#### 错误处理

### RxJS库

#### 创建可观察对象的函数

```ts
fromPromise

interval(100);

fromEvent(HTMLElement, 'click');

ajac('/api/data');
```



#### 操作符

操作符接受一些配置项，然后返回一个以来源可观察对象为参数的函数，当执行这个返回的函数时，这个操作符会观察来源可观察对象发出的值，转换它们，并返回由转换后的值组成的新的可观察对象。

可以用管道把操作符链接起来，当执行其中的函数时，会顺序执行被组合进去的函数。

Map 将给定地project函数应用于源Observable对象发出的每个值，并将结果值作为Observable发出

switchMap 将每个源值投射成Observable，该Observable会合并到输出observable中，并且只发出最新投射地observable中的值。

filter 只发送源Observable中满足指定函数的项来进行过滤

#### 错误处理

catchError 允许在管道中处理已知错误。

retry 重试失败的可观察对象

#### 可观察对象的命名约定

### Angular中的可观察对象

#### 事件发送器EventEmitter

#### HTTP



#### Async管道

#### 路由器(router)

#### 响应式表单(reactive forms)

### 用法实战

#### 输入提示

```ts
const searchInput = document.getElementById('search');

const typeahead = fromEvent(searchInput, 'input')
	.pipe(
        // 将指定的值发送
        map((e: keyboardEvent) => e.target.value),
        // 最小长度限制
    	filter(text => text.length > 2),
        // 防抖，防止连续按键时每次按键都发起请求
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(() => ajax('/api/endpoint'))
    );

typeahead.subscribe((data) => {
    // 发送数据请求
});
```



#### 指数化退避



### 与其他技术的比较



## 引导启动

## Angular模块

### JS模块 vs NgModule

- angular模块绑定的可声明的类，只供angular编译器使用
- NgModule可以通过服务提供商来用服务扩展整个应用

### NgModule简介

@NgModule装饰器的类

```ts
@NgModule({
    // 该应用所拥有的组件。每个组件只能声明在一个NgModule类中
    declarations: []，
    // 导入BrowserModule以获取浏览器特有服务，如DOM渲染，sanitization, location。当前NgModule所需的其他模块
    imports: [], 
    // 各种服务提供商
    providers: [], 
    // 根组件，angular创建它并插入index.html宿主页面
    bootstrap: [], 
    // 公开其中的部分组件、指令和管道。以便其他模块中的组件模板中可以使用它们
    exports: [],
})
```

`declarations` 数组只能接受可声明对象。可声明对象包括组件、[指令](https://www.angular.cn/guide/attribute-directives)和[管道](https://www.angular.cn/guide/pipes)。 一个模块的所有可声明对象都必须放在 `declarations` 数组中。 可声明对象必须只能属于一个模块，如果同一个类被声明在了多个模块中，编译器就会报错。

这些可声明的类在当前模块中是可见的，但是对其它模块中的组件是不可见的 —— 除非把它们从当前模块导出， 并让对方模块导入本模块。



### 常用模块

### 特性模块





### 特性模块的分类

| 特性模块         | 声明 | 提供商     | exports      | 被谁导入            | Eg                                                           |
| ---------------- | ---- | ---------- | ------------ | ------------------- | ------------------------------------------------------------ |
| 领域             | 有   | 罕见       | 顶级组件     | 特性模块，AppModule | Common/component/component.module声明所有公共组件，导入所有公共组件和第三方组件库，导出所有公共组件和组件库。被（业务模块）导入。导出一个Module |
| 带路由的特性模块 | 有   | 罕见       | 无           | 无                  | 带路由的特性模块不会导出任何东西，因为它们的组件永远不会出现在外部组件的模板中。 |
| 路由模块         | 无   | 是（守卫） | RouterModule | 特性（供路由使用）  |                                                              |
| 服务             | 无   | 有         | 无           | AppModule           | 根模块 `AppModule` 是唯一的可以导入服务模块的模块。          |
| 窗口部件         | 有   | 罕见       | 有           | 特性                |                                                              |



### 入口组件



### 服务提供商

#### 提供服务

```ts
@Injectable({
    providedIn: 'root'
})
export class UserService {}
```

#### 提供商的作用域

#### providedIn与NgModule

#### 使用惰性加载



#### 使用组件限定服务商

#### 在模块or组件中提供服务

#### 关于NgModule



### 单例应用

### 惰性加载的特性模块

### 共享angular模块

### NgModule API

### NgModule常见问题

## 依赖注入

## HttpClient

## 路由与导航

## 动画





