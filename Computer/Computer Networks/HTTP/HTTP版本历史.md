[TOC]
# HTTP协议

## 无状态、非持续连接/持续连接

- 无状态协议：“每次的请求都是独立的，它的执行情况和结果与前面的请求和之后的请求是无直接关系的，它不会受前面的请求应答情况直接影响，也不会直接影响后面的请求应答情况”

- 非持续连接（每个请求、响应是由一个单独的TCP连接发送）与持续连接 （所有请求、响应由相同的TCP连接发送）

## HTTP1.0
### 缓存管理
主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准
### 不支持断点续传
### 默认不是长连接

## HTTP1.1
### 长连接
默认长连接（connection: Keep-Alive）
### 缓存处理
引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略
### 带宽优化 断点续传
HTTP 1.1支持只发送header信息(不带任何body信息)，如果服务器认为客户端有权限请求服务器，则返回100，否则返回401。客户端如果接受到100，才开始把请求body发送到服务器。

这样当服务器返回401的时候，客户端就可以不用发送请求body了，节约了带宽。
### 错误通知 
新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
### 网络连接  
默认开启Connection: keep-alive。采用长连接和流水线请求
### HOST域
   在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。

## HTTP2.0
### 多路复用
HTTP/2 复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了”队头堵塞”（见TCP/IP详解卷一）。
每个 Frame Header 都有一个 Stream ID 就是被用于实现该特性。每次请求/响应使用不同的 Stream ID。就像同一个 TCP 链接上的数据包通过 IP: PORT 来区分出数据包去往哪里一样。
多路复用（MultiPlexing），即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。
![多路复用](http://mmbiz.qpic.cn/mmbiz_png/zPh0erYjkib05Ymia5tdgxvqnHlUvxzHsoucCV2ptokHicbcABGVKkJXxQnF20gs8L1sQvK3IdYyjqRqgHqX3s8vA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)
### 流优先级
HTTP2允许浏览器指定资源的优先级。

### HEADER压缩传输
HTTP1.X不支持HEADER的压缩，2.0采用了专为首部压缩的算法HPACK

### 二进制格式（Binary Format）
![二进制格式](http://mmbiz.qpic.cn/mmbiz_png/zPh0erYjkib05Ymia5tdgxvqnHlUvxzHsoKqKJ5wY40gJ6ssxYLvHHD0uCE9QREg9e0MT0Il06UR7iacvlE4iaYLWA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)
HTTP 2.0最大的特点： 不会改动HTTP 的语义，HTTP 方法、状态码、URI 及首部字段，等等这些核心概念上一如往常，却能致力于突破上一代标准的性能限制，改进传输性能，实现低延迟和高吞吐量。而之所以叫2.0，是在于新增的二进制分帧层。
    既然又要保证HTTP的各种动词，方法，首部都不受影响，那就需要在应用层(HTTP2.0)和传输层(TCP or UDP)之间增加一个二进制分帧层。
    在二进制分帧层上， HTTP 2.0 会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码 ，其中HTTP1.x的首部信息会被封装到Headers帧，而我们的request body则封装到Data帧里面。

### 数据流
数据流发送到一半的时候，客户端和服务器都可以发送信号（RST_STREAM帧），取消这个数据流。1.1版取消数据流的唯一方法，就是关闭TCP连接。这就是说，HTTP/2 可以取消某一次请求，同时保证TCP连接还打开着，可以被其他请求使用。

### 服务器推送
当我们对支持HTTP2.0的web server请求数据的时候，服务器会顺便把一些客户端需要的资源一起推送到客户端，免得客户端再次创建连接发送请求到服务器端获取。这种方式非常合适加载静态资源。

服务端能够更快的把资源推送给客户端。例如服务端可以主动把 JS 和 CSS 文件推送给客户端，而不需要客户端解析 HTML 再发送这些请求。当客户端需要的时候，它已经在客户端了。

那么存在一个问题，如果客户端设置了缓存怎么办。
1. 客户端可以通过设置SETTINGS_ENABLE_PUSH为0值通知服务器端禁用推送
2. 发现缓存后，客户端和服务器都可以发送信号（RST_STREAM帧），取消这个数据流。
3. cache-digest(提案)


## HTTPS
   HTTPS（Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。
1. https协议需要到ca申请证书，一般免费证书很少，需要交费。
2. http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。


> [HTTP1.0、HTTP1.1 和 HTTP2.0 的区别 ](https://www.sohu.com/a/167430102_733133)
> [HTTP 2.0特性](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551351&idx=2&sn=a56ff090060f97e11e856aef2622a717&chksm=8025a1b6b75228a0080fa971222b3cb7c3179ba5474028b8fa4656619073c4c14d76cf83cd86&scene=0#wechat_redirect)
> [HTTP2.0](http://www.alloyteam.com/2015/03/http2-0-di-qi-miao-ri-chang/)