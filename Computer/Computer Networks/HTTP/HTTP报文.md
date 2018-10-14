[TOC]

> MDN Web Docs: https://developer.mozilla.org/zh-CN/docs/Web/HTTP
>
> 版本历史： https://blog.csdn.net/qq_33291740/article/details/81448900
>
> 缓存策略：https://www.cnblogs.com/chenqf/p/6386163.html
>
> 安全攻防：

# 报文
## 报文格式
### REQUEST
```
// 典型的请求消息
GET /ark/ark-client/commit/b3949c78b0601173e5fa3a863dc86ed8d9d4ddff/branches HTTP/1.1
Host: git.jd.com
Connection: keep-alive
Accept: text/html, */*; q=0.01
X-CSRF-Token: TejilZpchkqgcP1oTdUsajGLp4+Z2syL+aoqqsKANUm9lV94AX9IzZG8mph2yKuiGl5AAt8C4caK5ofa5kGa+A==
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36
Referer: http://git.jd.com/ark/ark-client/commit/b3949c78b0601173e5fa3a863dc86ed8d9d4ddff
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

Cookie: pinId=hA1RirxkcVinAXSvxShlurV9-x-f3wj7;
```
1. 请求行 - 请求方法 URL 协议版本
2. 请求头部 - 一般包括请求的URI、请求修饰符、客户信息、内容
3. 请求正文

### RESPONSE
```
// 典型的响应消息
HTTP/1.0 200OK
Date:Mon,31 Dec 200104:25:57GMT 
Server:Apache/1.3.14(Unix)
Content-type:text/html 
Last-modified:Tue,17Apr200106:46:28GMT
Etag:"a030f020ac7c01:1e9f" 
Content-length:39725426 
Content-range:bytes554554-40279979/40279980
```
1. 响应行 
2. 响应头部 - 服务器信息 实体元信息等
3. 响应正文

## 请求方法

| method  | desc                                                         | 版本 |                                                              |
| ------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| GET     | 请求指定的页面信息，并返回实体主体                           | 1.0  |                                                              |
| POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 | 1.0  | 请求主体的类型由 [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 指定，一个POST请求通常通过HTML表单发送，此时Content-Type可能为application/x-www-form-urlencoded数据被编码成'&'分隔的键值对；multipart/form-data;text-plain |
| HEAD    | 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头 | 1.0  | https://blog.csdn.net/u014738683/article/details/64442444/ <br>HEAD方法与GET类似，但是HEAD并不返回消息体，只返回消息头。这个方法经常用来测试超链接的有效性、可用性和最近修改。<br>可以用来更新之前缓存的实体（通过ETag等头部） |
| PUT     | 从客户端向服务器传送的数据取代指定的文档的内容。             | 1.1  | https://blog.csdn.net/u012260238/article/details/53997667    |
| DELETE  | 请求服务器删除指定的资源                                     | 1.1  |                                                              |
| CONNECT | HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。     | 1.1  |                                                              |
| OPTIONS | 返回服务器针对特定资源所支持的通信选项，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性 | 1.1  |                                                              |
| TRACE   | 回显服务器收到的请求，主要用于测试或诊断                     | 1.1  |                                                              |

### GET与POST区别

|          | GET                                       | POST                                                         |
| -------- | ----------------------------------------- | ------------------------------------------------------------ |
| 请求体   | 无，携带数据放于URL里，少（不超过2^11）   | 有，可携带较多数据                                           |
| 安全性   | 传输数据在URL里，不能用来传输安全敏感数据 | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。 |
| 数据类型 | ASCII                                     | 无限制                                                       |
| 浏览历史 | 可以保存                                  | no                                                           |
| 缓存     | 可以                                      | no                                                           |



## 首部字段  



### 通用头域

1. Cache-Control

   通过指令来实现缓存机制

2. Connection

   ```
   Keep-Alive 网络连接是持久的，不会关闭 这是HTTP/1.1请求的默认值
   close 表示客户端或服务器想要关闭该网络连接，这是HTTP/1.0请求的默认值
   ```


### 请求头域

1. Accept

   告知客户端可以处理的内容类型，服务端用Content-Type来回答它的选择

2. Accept-Charset

   客户端可以处理的字符集类型

3. Accept-Encoding

   客户端能够理解的内容编码方式--通常是某种压缩算法（gzip、compress等）进行告知。服务端使用Content-Encoding来通知客户端它的选择

4. Accept-Language

   声明客户端可以理解的自然语言 服务端使用Content-Language来通知客户端它的选择

5. Access-Control-Request-Headers

6. Access-Control-Request-Method

7. If-Modified-Since

8. If-Match
在请求方法为GET和HEAD的情况下。服务器尽在请求的资源满足此首部列出的ETag之一时才会返回资源。

9. Range

    请求实体的一个或多个子范围
    The Range 是一个请求首部，告知服务器返回文件的哪一部分。在一个  Range 首部中，可以一次性请求多个部分，服务器会以 multipart 文件的形式将其返回。如果服务器返回的是范围响应，需要使用 206 Partial Content 状态码。假如所请求的范围不合法，那么服务器会返回  416 Range Not Satisfiable 状态码，表示客户端错误。服务器允许忽略  Range  首部，从而返回整个文件，状态码用 200 。

10. If-Range

    ```
    If-Range: <星期>, <日> <月> <年> <时>:<分>:<秒> GMT
    If-Range: <etag>
    ```

    通常用于断点续传的下载过程中使用，用来自从上次中断后，确保下载的资源没有发生改变。

11. Host
   Host头域指定请求资源的域名（对于虚拟主机来说）和端口号，必须表示URL的原始服务器或网关的位置。HTTP/1.1必须包含Host头域，否则返回400 Bad Request
12. Referer
    Referer 首部包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 首部识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。 


### 响应头域

1. Accept-Ranges

   ```
   Accept-Ranges: bytes; none; // 支持以bytes单位进行传输；不支持任何范围请求单位
   ```

   标识自身支持范围请求（partial request）。字段的具体值用于定义范围请求的单位

2. Access-Control-Allow-Credentials

3. Access-Control-Allow-Headers

4. Access-Control-Allow-Methods

   明确客户端所要访问的资源允许使用的方法或列表

5. Access-Control-Allow-Origin

   响应头指定了该响应的资源是否被允许与指定的origin共享

6. Allow

   Allow首部字段用于枚举资源所支持的HTTP方法的集合。若服务器返回状态码405，则该首部字段也需要同事返回给客户端。如果Allow字段的值为空，说明资源不接受使用任何HTTP方法的请求。

7. Content-Range

   显示一个数据片段在整个文件中的位置

8. Content-Security-Policy

   允许站点管理者在指定的页面控制用户代理的资源

   ```
   // 示例: 禁用不安全的内联/动态执行, 只允许通过 https加载这些资源 (images, fonts, scripts, etc.)
   // header
   Content-Security-Policy: default-src https:
   
   // meta tag
   &lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src https:&quot;&gt;
   ```

9. ETag

   资源的特定版本标识符。实体标签唯一地表示所请求的资源，是一段ASCII字符串。通常使用消息地散列最后修改时间戳地哈希值或者简单使用版本号来生成ETag

11. Expires

    设置了响应过期的日期/时间，如果在Cache-Control响应头设置了max-age或s-max-age指令，那么Expires头会被忽略


### 对应

|                     | 请求                                                         | 响应                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 断点续传            | Range 表示请求文件的一个或多个子范围<br>If-Range 用于判断实体是否发生改变<br>Accept-Ranges | Accept-Ranges : bytes 或none // 表示实体支持范围请求<br>Content-Ranges : 显示一个数据片段在整个文件中的位置 |
| 预检请求（OPTIONS） | Access-Control-Request-Headers<br>Access-Control-Request-Methos | Access-Control-Allow-Headers<br>Access-Control-Allow-Methos  |
| XSS                 |                                                              | Content-Security-Policy                                      |
| 缓存策略            | Cache-Control If-Modified-Since                              | Expires 、Last Modified                                      |



## HTTP CODE 

**1xx 可继续发送请求**

**2xx 成功**

**3xx 重定向**

**4xx 客户端错误**

**5xx 服务器端错误**



| code | message            | 描述                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| 201  | Created            | 新的资源被创建                                               |
| 206  | Partial Content    | 服务器已经成功处理了部分 GET 请求。                          |
| 301  | MO                 | 永久重定向                                                   |
| 302  | Found              | 未找到，暂时性转移                                           |
| 400  | Bad Request        | 1、语义有误，当前请求无法被服务器理解(HOST头部没传会导致这种情况)。除非进行修改，否则客户端不应该重复提交这个请求。<br>2、请求参数有误。 |
| 401  | Unauthorized       |                                                              |
| 405  | Method Not Allowed | 某个请求针对的资源不允许该请求方法 <br>此时返回的头部信息必须包含Allow |
| 501  | Not Implemented    | 服务器无法支持所请求的方法                                   |




