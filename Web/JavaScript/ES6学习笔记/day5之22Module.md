# Module的语法

## 1. 概述

CommonJS的模块是对象，加载时加载整个模块。

ES6模块不是对象，通过export命令显式指定输出的代码。再通过import命令输入。是编译时加载或静态加载。

## 2. 严格模式

严格模式的限制

- 变量必须声明后使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值
- 不能使用前缀0表示八进制
- 不能删除不可删除的属性
- 不能删除变量delete prop 只能删除属性
- eval不会在它外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected static interface）

## 3. export命令

export命令规定模块的对外接口，import命令用于输入其他模块提供的功能。

一个模块是一个独立的文件。该文件内部所有的变量，外部无法获取，如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出改变量。

export可以输出：

- 变量（var、let、const）

  ```javascript
  export var m = 1;
  
  var m = 1;
  export { m };
  export { m as n };
  ```

- 函数或class

export语句输出的接口，与其对应的值是动态绑定的关系，即通过该接口，可以获得模块内部实时的值。这一点与CommonJS不同，CommonJS输出的是值的缓存，不存在动态更新。不能在条件代码块中导出。

## 4. import命令

- import导入的变量名与export的对外接口相同

- 可以用as为导入的变量重命名

- 导入变量都是只读的，不能在加载模块的脚本中改写接口

  ```javascript
  import {a} from './xxx.js'
  
  a = {}; // Syntax Error : 'a' is read-only;
  ```

- import命令具有提升效果(import命令是编译阶段执行的，在代码运行之前)

  ```javascript
  foo();
  
  import { foo } from 'my_module';
  ```

- 如果多次重复执行同一句import语句，那么只会执行一次，不会执行多次

  ```javascript
  import 'lodash';
  import 'lodash';
  
  import { foo } from 'my_module';
  import { bar } from 'my_module';
  
  // 等同于
  import { foo, bar } from 'my_module';
  ```

  上面代码中，虽然`foo`和`bar`在两个语句中加载，但是它们对应的是同一个`my_module`实例。也就是说，`import`语句是 Singleton 模式。

## 5. 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

## 6. export default

|          | export default                                               | export                               |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
|          | 默认输出，import命令可以指定任意名字。export非匿名函数，函数名只在模块内部有效 |                                      |
| import   | import xxx from '...' 不需要大括号                           | import { xxx } from '...' 需要大括号 |
| 变量声明 | 不能接变量声明语句                                           | export var a = 1;                    |
| 实质     | 将后面的值，赋给default变量。可以：export default 1;         | 提供接口。export 1报错               |
| 类       | 可以输出                                                     | 可以输出                             |

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```javascript
import _, { each, forEach } from 'lodash';
```

## 7. export与import的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。

```javascript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

上面代码中，`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

模块的接口改名和整体输出，也可以采用这种写法。

```javascript
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

默认接口的写法如下。

```javascript
export { default } from 'foo';
```

具名接口改为默认接口的写法如下。

```javascript
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

同样地，默认接口也可以改名为具名接口。

```javascript
export { default as es6 } from './someModule';
```

下面三种`import`语句，没有对应的复合写法。

```javascript
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
```

为了做到形式的对称，现在有[提案](https://github.com/leebyron/ecmascript-export-default-from)，提出补上这三种复合写法。

```javascript
export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";
```

## 8. 模块的继承

模块之间也可以继承。

假设有一个`circleplus`模块，继承了`circle`模块。

```javascript
// circleplus.js

// 整体输出
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

上面代码中的`export *`，表示再输出`circle`模块的所有属性和方法。注意，`export *`命令会忽略`circle`模块的`default`方法。然后，上面代码又输出了自定义的`e`变量和默认方法。

这时，也可以将`circle`的属性或方法，改名后再输出。

```javascript
// circleplus.js

export { area as circleArea } from 'circle';
```

上面代码表示，只输出`circle`模块的`area`方法，且将其改名为`circleArea`。

加载上面模块的写法如下。

```javascript
// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

上面代码中的`import exp`表示，将`circleplus`模块的默认方法加载为`exp`方法。

## 9. 跨模块常量

## 10. import()

# Module的加载实现

## 1. 浏览器加载

## 2. ES6模块与CommonJS模块的差异

- CommonJS输出的是值的拷贝，ES6模块输出的是值的引用
- CommonJS模块是运行时加载，ES6模块是编译时输出接口

CommonJS加载的是一个对象，该对象只有在脚本运行完才生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。



CommonJS模块输出的是值的拷贝。一旦输出一个值，模块内部的变化就影响不到这个值。内部的原始类型的变量会被缓存，除非写成一个取值器函数。

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```



JS引擎遇到模块加载命令import时，就会生成一个只读引用。等到脚本真正执行时，再根据引用到被加载的模块里取值。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```



## 3. Node加载

## 4. 循环加载

## 5. ES6模块的转码

