[TOC]

# JS读写文件梳理

## 总结

| API            | 文档                                                         | 优点                                                         | 缺点                                                         |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| FileReader     | https://w3c.github.io/FileAPI/#reading-data-section          | 异步读取，不阻塞浏览器主线程执行JS和UI渲染Web Worker和Main Thread中都能使用图片、文本、excel等文件都能支持 |                                                              |
| FileReaderSync | https://w3c.github.io/FileAPI/#dfn-FileReaderSync            | 同步读取，使用简便                                           | 仅能在Web Worker中使用                                       |
| Sheet.js       | https://github.com/SheetJS/sheetjs测试地址：https://oss.sheetjs.com/sheetjs/ | 功能强大：支持在Node.js环境下直接从本地读取文件；支持从table标签读取表格；支持用ajax请求下载文件；支持解析FileReader API解析文件的结果；等等读写形式丰富：数据和csv/html/json之间可互相转化；用write stream写入文件（Node.js）下 | 功能是“parser”和“writer”，主要是配合FileReader的解析结果分析文件主要支持的是excel、文本、HTML Table Element |
| FileSaver.js   | https://github.com/eligrey/FileSaver.js/                     | 在浏览器侧即可写入（利用Blob的构造函数）并保存文件。主要支持的是text、URL、canvas同步写入。 |                                                              |



## File API

https://w3c.github.io/FileAPI/#blob

*这个规范提供了有关文件的信息，并且允许Web中的JS访问其内容。*

*FileList接口，表示从基础系统中单独选择的文件的数组。 可以通过调用用于选择的用户界面，即，当输入元素处于文件上载状态[HTML]时。*

*Blob接口，表示不可变的原始二进制数据，并允许将Blob对象中的字节范围作为单独的Blob访问。*

*File接口，包括有关文件的只读信息属性，例如文件名和文件的最后修改日期（在磁盘上）。*

*FileReader接口，提供读取文件或Blob的方法，以及事件模型以获取这些读取的结果。*

*用于与二进制数据（例如文件）一起使用的URL Scheme，以便可以在Web应用程序中引用它们。*

*File接口表示通常从底层文件系统中获取的文件数据，而Blob接口（“ Binary Large Object”（最初在Google Gears中引入Web API的名称）表示不可变的原始数据。File或Blob读取应在主线程上异步发生，并在线程Web应用程序中使用可选的同步API（File or Blob reads should happen asynchronously on the main thread, with an optional synchronous API used within threaded web applications. ）。用于读取文件的异步API可以防止浏览器主线程上的阻塞和UI“冻结”。该规范基于事件模型定义了一个异步API，用于读取和访问文件或Blob的数据。 FileReader对象提供**异步读取**方法，以通过事件处理程序的内容属性和事件触发来访问该文件的数据。使用事件和事件处理程序可以使单独的代码块具有监视读取进度的能力（这对于远程驱动器或已安装的驱动器特别有用，其中文件访问性能可能与本地驱动器有所不同）以及读取期间可能出现的错误情况文件。*

### Blob Interface

### File Interface

File对象时具有name属性的Blob对象；可以通过构造函数在Web App中创建，或者对来自OS文件系统的文件中的字节序列的引用。当File对象引用磁盘上的文件时，浏览器必须返回改文件的类型。

### FileReader

```
interface FileReader: EventTarget {
    constructor();
    // async read methods
    void readAsArrayBuffer(Blob blob);
    void readAsBinaryString(Blob blob);
    void readAsText(Blob blob, optional DOMString encoding);
    void readAsDataURL(Blob blob);
    void abort();
    // states  
    const unsigned short EMPTY = 0;
    const unsigned short LOADING = 1;
    const unsigned short DONE = 2;
    readonly attribute unsigned short readyState;
    // File or Blob data  
    readonly attribute (DOMString or ArrayBuffer)? result;   
    readonly attribute DOMException? error;   
    // event handler content attributes  
    attribute EventHandler onloadstart;
    attribute EventHandler onprogress;
    attribute EventHandler onload;
    attribute EventHandler onabort;
    attribute EventHandler onerror;
    attribute EventHandler onloadend;
};
```

#### Event Handler Content Attributes

The following are the [event handler content attributes](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-content-attributes) (and their corresponding [event handler event types](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-event-type)) that user agents must support on `FileReader` as DOM attributes:

| [event handler content attribute](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-content-attributes) | [event handler event type](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-event-type) | 何时触发                |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :---------------------- |
| `onloadstart`                                                | `loadstart`                                                  | 开始读取                |
| `onprogress`                                                 | `progress`                                                   | 读取过程中              |
| `onabort`                                                    | `abort`                                                      | 调用abort()方法终止读取 |
| `onerror`                                                    | `error`                                                      | 读取失败                |
| `onload`                                                     | `load`                                                       | 读取成功                |
| `onloadend`                                                  | `loadend`                                                    | 读取完成（成功或失败）  |

#### FileReader States

The `FileReader` object can be in one of 3 states. The `readyState` attribute tells you in which state the object is:

EMPTY (0) FileReader的默认状态。FileReader对象已经构造，没有调用任何读取方法。

LOADING (1) File或者Blob正在读取中。读取过程中无任何错误。

DONE (2) 文件或Blob已经被读入内存，或者发生文件读取错误，或者使用abort()终止了读取。

### FileReaderSync API

Web Workers允许使用同步File或Blob读取API，因为对线程的此类读取不会阻塞主线程。 本节定义了一个同步API，可以在Workers [[Web Workers]]中使用。

Workers可以使用异步API（FileReader对象）和同步API（FileReaderSync对象）。

## 参考资料

- Blob - Web API 接口参考 | MDN https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
- File API https://w3c.github.io/FileAPI/#blob
- SheetJS/sheetjs: SheetJS Community Edition -- Spreadsheet Data Toolkit
  https://github.com/SheetJS/sheetjs#writing-options