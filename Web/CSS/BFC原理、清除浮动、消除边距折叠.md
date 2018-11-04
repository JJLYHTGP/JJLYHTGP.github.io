[TOC]

# BFC原理

## 常见定位方案

```
在讲 BFC 之前，我们先来了解一下常见的定位方案，定位方案是控制元素的布局，有三种常见方案:

普通流 (normal flow)
在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

浮动 (float)
在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

绝对定位 (absolute positioning)
在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。
```

## BFC(Block Formatting Context)块级格式化上下文

具有BFC特性的元素可以看做是隔离了的容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。

## 触发BFC

### body根元素

### 浮动元素（float: none之外的值）

### 绝对定位(position:absolute、fixed)

### display为inline-block、table、table-row、table-caption、table-cells、flow-root、flex、inline-flex、grid、inline-grid

### overflow除了visible以外的值（hidden、auto、scroll）

## BFC特性及应用

### 1. 同一个BFC下面会发生边距折叠。

   为了避免边距折叠，可以将其放在不同的BFC容器中

### 2. 清除浮动

   浮动元素脱离普通文档流

### 3. 阻止元素被浮动元素覆盖



# 边距折叠

> 原文：The width of the margin on non-floating block-level elements specifies the minimum distance to the edges of surrounding boxes. Two or more adjoining vertical margins (i.e., with no border, padding or content between them) are collapsed to use the maximum of the margin values. In most cases, after collapsing the vertical margins the result is visually more pleasing and closer to what the designer expects.
>
> 翻译：外边距用来指定非浮动元素与其周围盒子边缘的最小距离。两个或两个以上的相邻的垂直外边距会被折叠并使用它们之间最大的那个外边距值。多数情况下，折叠垂直外边距可以在视觉上显得更美观，也更贴近设计师的预期。

从这段话中，我们能获得一些有用的信息：

- 发生折叠需要是相邻的非浮动元素；
- 折叠发生在垂直外边距上，即margin-top/margin-bottom；
- 折叠后取其中最大的那个margin值作为最终值；

避免边距折叠：触发BFC

# 清除浮动

>  在非IE浏览器下，当容器高度为auto，且容器内有浮动元素，容器的高度不能自动撑高以适应内容的高度，是的内容溢出到容器外面而影响破坏布局的现象。这个现象叫做浮动溢出

```html
<div class="outer">
    <div class="float">float1</div>
    <div class="float">float2</div>
    <div class="float">float3</div>
	<div class="nofloat">nofloat</div> // 被浮动元素覆盖了，但是内容（nofloat）没有被覆盖
</div>
```

```css
.outer{
	border: 1px solid #ccc;
	background: #fc9;
	color: #fff; 
	margin: 0px auto;
	padding: 0px;
}
.float, .nofloat {
	width: 80px;
	height: 80px;
	margin:40px;
}
.float{
	background: red;
	float: left;
}
.nofloat{
	background: green;
}
```

出现以下问题

1. 外层的高度不能被子元素撑开
2. 浮动元素之后的非浮动元素被遮盖

## 增加新的div

```html
<div class="outer">
    <div class="float">float1</div>
    <div class="float">float2</div>
    <div class="float">float3</div>
    <div class="clear"></div>
	<div class="nofloat">nofloat</div>
</div>
```

```css
.clear{
	clear: both;
	height: 10px;
	width: 10px;
	border: solid;
	margin:40px;
}
```

[清除浮动之新增div](https://runjs.cn/detail/askhkslv)

## :after伪元素(浮动元素的父元素)

```html
<div class="wrap">
	<div class="outer">
		<div class="float">float1</div>
		<div class="float float3">float3</div>
	</div>
	<div class="nofloat">nofloat</div>
</div>
```

```css
.outer :after {
    content: '';
    clear: both;
    visibility:hidden; // 允许浏览器渲染它，但是不显示出来
    display: block; // 兼容部分浏览器
}
.outer {
    zoom: 1; // 兼容部分浏览器
}
```

## 触发父元素的BFC，使父元素可以包括浮动元素

1. 给浮动元素的容器也增加上浮动属性
2. 给容器增加overflow: hidden; overflow: auto;
3. display为flex等
4. 绝对定位（fixed、absolute）

# 参考资料

> [十分钟理解BFC原理](https://zhuanlan.zhihu.com/p/25321647)
> [margin系列之外边距折叠](https://blog.doyoe.com/2013/12/04/css/margin%E7%B3%BB%E5%88%97%E4%B9%8B%E5%A4%96%E8%BE%B9%E8%B7%9D%E6%8A%98%E5%8F%A0/)