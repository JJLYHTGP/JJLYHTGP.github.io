[TOC]

# em、rem、line-height

> em作为font-size的单位时，代表父元素的字体大小。em作为其他属性单位时，代表自身字体大小。——MDN

> rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其初始字体大小

> vw ——视口宽度的1/100；vh——视口高度的1/100



line-height

初始值：normal

是否为继承属性 yes

取值：

​	normal

​	number：数字乘以元素的字体大小

​	长度：rem、em、px、pt、vh等

​	百分比：百分比乘以以元素计算出的字体大小

```html
<div class="p1">
	<div class="s1">1</div>
  	<div class="s2">1</div>
</div>
<div class="p2">
	<div class="s5">1</div>
  	<div class="s6">1</div>
</div>
```

```css
.p1 {font-size: 16px; line-height: 32px;}
.s1 {font-size: 2em;}
// line-height: 32px 具有继承性 font-size: 32px em作为font-size的单位时为父元素的字体大小
.s2 {font-size: 2em; line-height: 2em;} 
// line-height: 64px em不是font-size的值时，为当前元素的字体大小

.p2 {font-size: 16px; line-height: 2;}
// line-height: 32px
.s5 {font-size: 2em;}
// font-size：32px line-height:2 具有继承性 64px
.s6 {font-size: 2em; line-height: 2em;}
// font-size: 32px line-height: 64px 当前元素字体大小*2
```

