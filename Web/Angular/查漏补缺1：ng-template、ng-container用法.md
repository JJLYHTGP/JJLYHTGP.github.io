[TOC]

# ng-template用法

## HTML5中的`<template>`元素

HTML内容模板是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但是随后可以在运行时使用JavaScript实例化。可以视为内容片段，存在文档中供后续使用。解析器会处理`<template>`元素的内容，但是这只是为了确保内容有效；元素的内容不会被呈现。



## Angular中的`<ng-template>`元素

`ng-template`元素是一个Angular元素，永远不会被直接显示出来。在渲染视图前，Angular会将其内容替换为一个注释。主要通过`TemplateRef`和`ViewContainerRef`实现。



### `*ngIf`（结构型指令）如何运用`ng-template`元素

> `*`是一个语法糖，不是通常的模板表达式。Angular会将其变成一个`ng-template`标记，包裹着宿主元素及其子元素。 ([结构型指令-星号前缀 ——Angular文档](https://www.angular.cn/guide/structural-directives#the-asterisk--prefix))

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

把`*ngIf`属性翻译成一个`ng-template`元素并用它来包裹宿主元素，`ngIf`移到`ng-template`元素上，变成属性绑定。div的其他部分，包括class属性，已到了背部元素上。

```html
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```

[`NgIf` 的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts)

[`NgFor` 的源码](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_for_of.ts)

### `ng-container`

`<ng-container>`：是一个分组元素，可用于对节点进行分组，它将被渲染为 HTML中的 `comment` 元素，它可用于避免添加额外的元素来使用结构指令。不会污染样式或元素布局，因为Angular不会将其放进DOM中。

### ngTemplateOutlet ngTemplateOutletContext

> [ngTemplateOutlet——Angular API](https://angular.cn/api/common/NgTemplateOutlet#description)

ngTemplateOutlet指令基于已有的TemplateRef（内嵌模板），插入一个EmbeddedViewRef（内嵌视图）。在应用 NgTemplateOutlet 指令时，我们可以通过 `[ngTemplateOutletContext]` 属性来设置 `EmbeddedViewRef` 的上下文对象。绑定的上下文应该是一个对象，此外可通过 `let` 语法来声明绑定上下文对象属性名。

> 若 let 语法未绑定任何属性名，则上下文对象中 `$implicit` 属性，对应的值将作为默认值。

```html
<tr *ngFor="let row of datasource">
    <td>
        <div class="crowd-group-name" title="{{ row.groupName }}">
          <ng-container *ngIf="!optionTpl">
            {{ row.groupName }}
          </ng-container>
          <ng-container *ngIf="optionTpl">
            <ng-template
                [ngTemplateOutlet]="optionTpl"
                [ngTemplateOutletContext]="{ row: row }">
            </ng-container>
            <!--也可以这样写-->
             <!-- <ng-container *ngTemplateOutlet="optionTpl;context: {$implicit: row}"></ng-container> -->
          </ng-container>
      </div>
    </td>
 </tr>

<!-- 内置模板 -->
<ng-template type="number" let-row="row" #optionTpl>
    {{ row['name'] | number }}
</ng-template>
```





# 参考资料

>[`<template>`：内容元素模板](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)
>
>[写一个结构型指令](https://angular.cn/guide/structural-directives#write-a-structural-directive)