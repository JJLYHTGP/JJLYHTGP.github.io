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

#### 验证HTTP Referer字段

> 禁⽌将 HTTP 标题头中的任何未加密信息作为安全决策依据 

弊端：

- 部分低版本浏览器可以篡改token。
- 用户认为referer头部暴露其隐私，部分请求无referer字段

#### 在请求地址增加token并验证

在用户登录后产生放于session中，然后每次请求时把token从session中拿出与请求的token进行比对。get请求放在URL，post请求放在请求体

#### 在HTTP头增加自定义属性并验证

XMLHttpRequest请求通常用于ajax方法中对于页面局部的异步刷新，并非所有请求都适合这个类来发起。


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

### 实例

以下例子来自[Vue.js中的XSS攻击](https://github.com/lynnic26/LynnNote/issues/1)

用v-html实现一个XSS攻击[v-html](https://vuejs.org/v2/guide/syntax.html#Raw-HTML)

```html
<div id="app" >
    Welcome :
     <span v-html="attack">
     </span>
</div >
```

无效：浏览器加载时禁用了脚本

```vue
new Vue({
     el: '#app',
     data: {
     	attack: '<script > alert(document.cookie)</script >',
     }
});
```

成功注入：

```vue
new Vue({
     el: '#app',
     data: {
     	attack: '<a onmouseover=alert(document.cookie)>点我</a>',
     }
});
```

img的src不是一个有效的URL,onerror回调执行

```
new Vue({
     el: '#app',
     data: {
     attack: '<img src="notValidUrl" onerror=alert(document.cookie)>',
     }
});
```

- 尽量使用插值{{}}，把要渲染的内容转化为字符串

- 如果要使用v-html，确保安全

  

### XSS的防御措施

1. 编码

< > / ' " &等字符在后端接收时编码

```javascript
npm install validator-js
// 使用validator校验输入信息
const validator = require('validator');
const number1 = '10.5';
const number2 = '10,5';
validator.isDecimal(number1); // true
validator.isDecimal(number2); // false
// 使⽤⽩名单校验
const allowedChars = '0123456789.';
const decimal1 = '10.5';
const decimal2 = '10,5';
validator.isWhitelisted(decimal1, allowedChars); // true
validator.isWhitelisted(decimal2, allowedChars); // false

// ⻓度校验
const addressInput = '123 Main St Anytown, USA';
validator.isLength(string, {min: 3, max: 255}); // true
// trim
const sanitize = require('validator');
sanitize.trim(' asdasd ');
// html转义
const sanitizer = require('validator');
const sampleSourceCode = '<script>alert("Hello World");</script>';
const sanitizedSampleSourceCode = sanitizer.escape(sampleSourceCode);
console.log(sanitizedSampleSourceCode);
// &lt;script&gt;alert(&quot;Hello World&quot;);&lt;&#x2F;script&gt;
// 也可以使⽤xss-filters
const xssFilters = require('xss-filters');
const unsafeFirstname = req.query.firstname;
xssFilters.inHTMLData(unsafeFirstname);
```



2. 校验

   表单数据为规定值的类型，例如年龄应该只能为数字字母组合

3. 对于重要的COOKIE设置HTTP ONLY，不允许在js脚本中获取该cookie

4. 过滤或移除特殊的HTML标签，如<script> <iframe> 

5. 过滤JS事件的标签 例如 "onclick=", "onfocus" 等等



```
tips:
Web应用中，用户输入及关联的数据如果没有检查则将导致安全风险。客户端校验之外，服务端对最终输入数据也要校验。对于不可信的数据，输出到客户端前必须进行HTML编码
```





## SQL注入攻击

SQL注⼊(SQL Injection)，应⽤程序在向后台数据库传递SQL(Structured Query Language，结构化查询语 ⾔)时，攻击者将SQL命令插⼊到Web表单提交或输⼊域名或⻚⾯请求的查询字符串，最终达到欺骗服务器执 ⾏恶意的SQL命令 

> 1、通常所有的 SQL 语句应使⽤预编译操作，禁⽌拼接 SQL 语句。 
>
> 2、在明确变量数据类型时，进⾏变量数量类型检查，确保是预定变量类型。 
>
> 3、使⽤预编译模式访问数据库。 
>
> 4、应⽤程序连接数据库服务器的数据库帐号，在满⾜业务需求的前提下，必须使⽤最低级别权限的数据库帐号 
>
> 5、禁⽌在代码中存储如数据库连接字符串、⼝令和密钥之类的敏感数据，这样容易导致泄密。

错误示例：

```javascript
const express = require('express');
const db = require('./db');
const router = express.Router();
router.get('/email', (req, res) => {
 db.query('SELECT email FROM users WHERE id = ' + req.query.id); .then((record)
 => {
 // do stuff res.send(record[0]); })
});
```

正确示例：

```javascript
// 安全访问 Mysql 的代码示例
const express = require('express');
const db = require('./db');
const router = express.Router();
router.get('/email', (req, res) => {
 db.query('SELECT email FROM users WHERE id = $1', req.query.id).then((record)
=> {
 // do stuff
 res.send(record[0]);
 })
});
// 访问 postgresql 的代码示例
// evilUserData parameter is an input given by a user
// For the example it could be someting like that: or 1=1
const sql = 'SELECT * FROM users WHERE id = $1';
client.query(sql, evilUserData, (error, results, fields) => {
 if (error) {
 throw error;
 }
 // ...
});

// 安全访问 Mongodb 的代码示例
const dbQuery = {
 $where: 'this.UserID = new Number(' + req.query.id + ')'
};
db.Users.find(dbQuery);
```

使用配置文件存储数据库连接信息。

```json
{
 "db": {
 "user": "f00",
 "pass": "f00?bar#ItsP0ssible", "host": "localhost",
 "port": "3306"
 }
}
```

## 文件上传漏洞

该漏洞允许⽤户上传任意⽂件可能会让攻击者注⼊危险内容或恶意代码，并在服务器上运⾏。 

原理：由于⽂件上传功能实现代码没有严格限制⽤户上传的⽂件后缀以及⽂件类型，导致允许攻击者向某个⽂件上传漏洞 个可通过 Web 访问的⽬录上传任意PHP⽂件，并能够将这些⽂件传递给 PHP 解释器，就可以在远程服务器 上执⾏任意PHP脚本。 

文件上傳規範

```
1、禁⽌将⽂件(含临时缓存⽂件)存储在 Web 应⽤程序⽬录
2、必须根据实际业务需求使⽤⽩名单策略限制上传⽂件后缀名，例如业务仅需上传图⽚时，只允许⽤户上传诸如
 jpg、png、gif 等图⽚类型⽂件。
3、禁⽌上传 html、htm、swf 等可被浏览器解析的⽂件。
4、禁⽌将⽤户可控的内容上传⾄xxxx域名，避免⽤户上传的恶意⽂件，导致该xxxx域名被反病毒⼚商拉⿊，导致
业务不可⽤。
```

​	下載規範：

```
预先定义路径，禁⽌⽤户更改⽂件下载⽬录
对下载路径进⾏中含有"./"、"../"、".\"、"..\"等符号时，直接拒绝该请求
对下载⽂件后缀名进⾏⽩名单限制
```

