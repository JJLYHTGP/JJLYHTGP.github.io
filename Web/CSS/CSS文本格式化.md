- white-space(有继承性) 
1. normal<br>
合并空白符  遇到换行符转为空白符 必要时（溢出盒子边界）换行
2. nowrap<br>
合并空白符  遇到换行符转为空白符
不会换行（溢出盒子边界）
3. pre<br>
不合并空白符  遇到换行符换行 溢出盒子边界也不换行
4. pre-wrap<br>
不合并空白符  遇到换行符换行 溢出盒子边界也换行
5. pre-line<br>
合并空白符 遇到换行符换行
溢出盒子边界也换行
6. inherit<br>
从父元素继承white-space属性的值


- over-flow
<table>
<tr><td style="width:80px">值 </td>	<td>描述</td></tr>
<tr><td>visible</td>	<td>	默认值。内容不会被修剪，会呈现在元素框之外。</td></tr>
<tr><td>hidden</td>	<td>	内容会被修剪，并且其余内容是不可见的。</td></tr>
<tr><td>scroll</td>	<td>	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。（显示滚动条）</td></tr>
<tr><td>auto</td>	<td>	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。（溢出时会显示滚动条）</td></tr>
<tr><td>inherit</td>	<td>	规定应该从父元素继承 overflow 属性的值。</td></tr>
</table>

- text-overflow 
无继承性 只有规定了overflow是可以被裁剪的，该属性才生效。<br/>
text-overflow:clip|ellipsis|string;  /*  剪切掉(默认)|用省略号代替|用字符串代替 溢出内容 */