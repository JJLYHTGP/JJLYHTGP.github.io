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
- 