[TOC]

# Web安全漏洞
## CSRF （跨站请求伪造）
### 简介

> [CSRF攻击的应对之道](https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/)
>
> [CSRF是什么](https://zhuanlan.zhihu.com/p/22521378?utm_medium=social&utm_source=qq)

Cross-site request forgery，攻击者伪造成用户身份进行操作，服务器识别不了请求的合法性。

### CSRF的攻击方式

CSRF攻击可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击的站点。

1. 在用户的session尚未到期时诱使用户打开恶意URL，从而伪造成用户的身份向服务器发送合法的请求

### CSRF的防御措施

1. 验证HTTP Referer字段

2. 在请求地址增加token并验证

   在用户登录后产生放于session中，然后每次请求时把token从session中拿出与请求的token进行比对

3. 在HTTP头增加自定义属性并验证


## XSS（跨站脚本攻击）

### 简介

跨站脚本攻击是恶意攻击者往Web页面插入恶意脚本，当用户浏览该页时嵌入其中的脚本会被执行，从而达到恶意攻击用户的目的

- 攻击者对含有漏洞的服务器发起XSS攻击
- 诱使用户打开收到攻击的服务器URL
- 恶意脚本执行

### XSS的攻击方式

#### 反射型

经过后端，不经过数据库

发出请求时，XSS出现在URL里，作为输入提交到服务器端，服务器端解析后响应，XSS随响应内容一起返回给浏览器，最后浏览器执行XSS代码。

```
http://www.test.com/message.php?send=Hello,World！

接收者将会接收信息并显示Hello,Word

非正常发送消息：

http://www.test.com/message.php?send=<script>alert(‘foolish!’)</script>！

接收者接收消息显示的时候将会弹出警告窗口
```



#### 存储型

经过后端，经过数据库。

存储型的XSS提交的代码会存储在服务器，下次请求目标页面时不再提交XSS代码

> [XSS跨站脚本攻击(一)----XSS攻击的三种类型](https://blog.csdn.net/u011781521/article/details/53894399/)
>
> [XSS跨站脚本攻击](https://www.cnblogs.com/phpstudy2015-6/p/6767032.html)

### XSS的防御措施

1. 编码

< > / ' " &等字符在后端接收时编码

2. 校验

   表单数据为规定值的类型，例如年龄应该只能为数字字母组合

3. 对于重要的COOKIE设置HTTP ONLY，不允许在js脚本中获取该cookie

4. 过滤或移除特殊的HTML标签，如<script> <iframe> 

5. 过滤JS事件的标签 例如 "onclick=", "onfocus" 等等