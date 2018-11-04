[TOC]

# em、rem

> em作为font-size的单位时，代表父元素的字体大小。em作为其他属性单位时，代表自身字体大小。——MDN

> rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其初始字体大小

> vw ——视口宽度的1/100；vh——视口高度的1/100



# line-height

## 初始值：normal

## 继承属性

## 取值

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

# @font-face

```css
@font-face {
    // 为载入的字体命名
    font-family: <YourDefineFontName>;
    // 加载字体，URL可以是相对路径或绝对路径，format是定义的字体格式
    src: <url> [<format>],[<source> [<format>]], *;
    // 字体粗细
    [font-weight: <weight>];
    // 字体风格
    [font-style: <style>];
}
```

常见兼容性写法：

```css
@font-face {
  font-family: 'defineName';
  src: url('../fonts/singlemalta-webfont.eot');
  src: url('../fonts/singlemalta-webfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/singlemalta-webfont.woff') format('woff'),
       url('../fonts/singlemalta-webfont.ttf') format('truetype'),
       url('../fonts/singlemalta-webfont.svg#defineName') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

> **#iefix有何作用？**
>  IE9 之前的版本没有按照标准解析字体声明，当 src 属性包含多个 url 时，它无法正确的解析而返回 404 错误，而其他浏览器会自动采用自己适用的 url。因此把仅 IE9 之前支持的 EOT 格式放在第一位，然后在 url 后加上 ?，这样 IE9 之前的版本会把问号之后的内容当作 url 的参数。至于 #iefix 的作用，一是起到了注释的作用，二是可以将 url 参数变为锚点，减少发送给服务器的字符。
>  **为何有两个src？**
>  绝大多数情况下，第一个 src 是可以去掉的，除非需要支持 IE9 下的兼容模式。在 IE9 中可以使用 IE7 和 IE8 的模式渲染页面，微软修改了在兼容模式下的 CSS 解析器，导致使用 ? 的方案失效。由于 CSS 解释器是从下往上解析的，所以在上面添加一个不带问号的 src 属性便可以解决此问题。

引用来自[梦幻雪冰博客](https://link.jianshu.com/?t=http://www.lofter.com/postentry?from=search&permalink=373374_60afdbf)。

# 浏览器内字体

## 为什么不建议用单数如13px

1. 比例关系

   偶数字号比较容易和页面中其他字体形成一个比例关系

2. 浏览器缘故

   - 低版本浏览器会把奇数字体强制转化为偶数
   - 平分字体？

3. 系统差别

   - Windows自带的点阵宋体只提供了12、14、16px这三个大小的点阵

## 怎么在谷歌浏览器显示12px以下的字体

```css
.small-font{
    font-size: 12px;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.90);
}
```

# 参考资料

> [CSS3 @font-face属性](https://www.jianshu.com/p/c0301e632a01)