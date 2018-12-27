# TypeScript编译原理

## JavaScript的编译

### 原理

角色：

- 引擎：负责JavaScript程序的编译和执行过程。是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中。
- 编译器：负责语法分析、代码生成（将AST转换为可执行代码的过程）。
- 作用域：负责收集并维护所有的标识符（变量）

过程：

- 分词(Tokenizing)

将字符串分割为有意义的代码块，这些代码块称为词法单元。

```javascript
// 字符串
var foo = 123;

// 词法单元流
[
    {
        "type": "Keyword",
        "value": "var"
    },
    {
        "type": "Identifier",
        "value": "foo"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "123"
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```

- 解析

将词法单元流转换成AST。[在线解析工具](http://esprima.org/demo/parse.html#)

**AST(Abstract Syntax Tree)抽象语法树**

一个由元素逐级嵌套所组成的代表了程序语法结构的树，称为抽象语法树。

上面的词法单元流解析成下面的AST

```json
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 123,
                        "raw": "123"
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
```

- 代码生成

将AST转化为可执行的代码



### 特点

> **JavaScript (** **JS** ) 是一种具有函数优先的轻量级解释型或即时编译型的编程语言。(MDN)

传统意义上，JavaScript被实现为解释语言（讲代码一句一句直接运行）。但是在最近，它已经可以被**即时编译**执行。源代码一句一句编译，但是翻译过的代码会进行缓存，边运行边翻译。例如谷歌的V8引擎是将JavaScript编译成了机器代码。

| Browser, Headless Browser, or Runtime | JavaScript Engine |
| ------------------------------------- | ----------------- |
| Mozilla                               | Spidermonkey      |
| Chrome                                | V8                |
| Safari                                | JavaScriptCore    |
| IE and Edge                           | Chakra            |
| PhantomJS                             | JavaScriptCore    |
| HTMLUnit                              | Rhino             |
| TrifleJS                              | V8                |
| Node.js ***\****                      | V8                |
| io.js ***\****                        | V8                |

## TypeScript的编译

### TypeScript简介

- 是JavaScript的严格超集。任何现有的JavaScript程序都是合法的typescript程序。typescript最终被转译为javascript程序。

- 编译器：tsc，可以将typescript编译为可以在任何JavaScript引擎（如浏览器）中执行的标准JavaScript。

- 因为在开发大规模JavaScript应用的过程中遇到语言本身的短板，因此开发者决定进行语言的扩展。

  - 类型批注和编译时类型检查

    对基本类型批注为number、boolean、string，而弱或者动态类型的结构是any类型。类型没有被给出时，会进行类型推断。

  ```ts
  function number2string(num: number): string {
      return num + '';
  }
  ```

  ​	类型批注可以被导出到一个单独的声明文件(扩展名.d.ts)。基本移除了函数和方法体而仅保留了所导出类型的批注。

  ```typescript
  export declare class TaskOperationComponent implements OnInit {
      taskClick: EventEmitter<any>;
      title: string;
      buttonText: string;
      ngOnInit(): void;
      onClick(): void;
  }
  ```

  - 类型推断

    没有明确指出类型的，类型推断会帮助提供类型

    ```typescript
    // 初始化变量和成员，设置了默认值和决定函数返回值时，直接推断类型。
    let x = 3;
    
    // 根据上下文推断，检查window.onmousedown函数的类型推断右侧函数表达式的类型，因此推断event的类型是MouseEvent
    window.onmousedown = function(event) {/* ... */}; 
    
    // 最佳通用类型。综合考虑，从几个表达式中推断类型 
    let x = [0, 1, '']; // (string|number)[]
    let y = [new Elephant(), new Snake()]; // Animal[]
    ```

  - 类型擦除

    类型推断的逆操作。

  - 接口

  - 枚举

  - Mixin

  - 泛型编程

    一种允许在**强类型**程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指定这些类型。

    ```typescript
    class GenericNumber<T> {
        add: (x: T, y: T) => T;
    }
    
    let mynum = new GenericNumber<number>();
    let mystr = new GenericNumber<string>();
    ```

  - 命名空间

  - 元组

  - Await

### 编译原理

#### 编译器概览

tsc编译器（[compiler](https://github.com/Microsoft/TypeScript/tree/master/src/compiler)）的关键部分：

- Scanner 扫描器（`scanner.ts`）

  `SourceCode ~~ Scanner ~~> Token流`

- Parser 解析器（`parser.ts`）

  `Token流 ~~ Parser ~~> AST`

- Binder 绑定器（`binder.ts`）

  `AST ~~ Binder ~~> Symobols(符号) `

- Checker 检查器（`checker.ts`）

  `AST + Symbols ~~ Checker ~~> 类型验证`

- Emitter 发射器（`emitter.ts`）

  `AST + 检查器 ~~ Emitter ~~> JavaScript代码`

典型的 JavaScript 转换器只有以下流程：

```text
SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~Emitter~~> JavaScript
```

比起TypeScript缺少的一个关键功能，就是语义系统。关键工作是检查器来做的。

##### 工具集

`utilities.ts`TS编译器使用的核心工具集。[utilities.ts](https://github.com/Microsoft/TypeScript/tree/master/src/compiler/utilities.ts)

```typescript
// 是一个定义为全局单例的变量，提供了以下定义
export let objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => <any>Node,
    // ...
};
```

##### 关键数据结构

包含整个编译器中使用的关键结构和接口。

- `SyntaxKind` AST节点通过`SyntaxKind`枚举进行识别

  ```ts
  // 将近400个值
  export const enum SyntaxKind {
          Unknown,
      	// 符号
          EndOfFileToken,
      	// 标点符号
          OpenBracketToken, // {
      	// 杂项：源文本中对理解代码不太重要的部分，例如：空白，注释。(为了保持轻量)杂项一般不会存储在AST中。
          SingleLineCommentTrivia,
      	// Assignments
          EqualsToken, // =
      	// Identifiers
          Identifier,
          // Reserved words
          BreakKeyword,
          // Signature elements
          Decorator,
      	// Type
          ArrayType,
          // Element
          Block,
     		// ...
  }
  ```

- `TypeChecker` 类型检查器提供此接口

- `CompilerHost` 用于程序（`Program`）和系统之间的交互

- `Node` AST 节点

  Node节点是AST的基本构造块。

  ```ts
  // TextRange标识该节点在源文件中的起止位置
  interface Node extends TextRange {
      kind: SyntaxKind; // 标识AST中的类型
      flags: NodeFlags; // 标志
      decorators?: NodeArray<Decorator>;
      modifiers?: ModifiersArray // 修饰符
      parent: Node; // 当前节点在(AST)中的父节点
  }
  ```

SourceFile是一棵AST的顶级节点，包含在Program中

```ts
export interface SourceFile extends Declaration {
    kind: SyntaxKind.SourceFile;
    // ...
}
```

#### 扫描器

`SourceCode ~~ Scanner ~~> Token流`

```ts
export interface Scanner {
    	// 分词开始位置
        getStartPos(): number;
    	// 获取分词
        getToken(): SyntaxKind;
        // 扫描
        scan(): SyntaxKind;
        // 提供代码段
        setText(text: string | undefined, start?: number, length?: number): void;
    	// 失败回调
        setOnError(onError: ErrorCallback | undefined): void;
}
```
scanner使用示例：
```ts
// ntypescript是个人开发者的作品，将typescript内部的接口暴露出来以供使用。
import * as ts from 'ntypescript';

// 单例扫描器
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /* 忽略杂项 */ true);

// 准备扫描器，使用setText提供代码段，提供失败回调等等
initializeState(
  `
var foo = 123;
`.trim()
);

// 开始扫描，识别token以及token在代码中的位置
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
  let currentToken = ts.formatSyntaxKind(token);
  let tokenStart = scanner.getStartPos();
  token = scanner.scan();
  let tokenEnd = scanner.getStartPos();
  console.log(currentToken, tokenStart, tokenEnd);
}
```

```ts
// 对`var foo = 123;`这一段代码进行扫描
VarKeyword 0 3 // var
Identifier 3 7 // foo
FirstAssignment 7 9 // =
FirstLiteralToken 9 13 // 123
SemicolonToken 13 14 // ;
```

#### 解析器

`Token流 ~~ 解析器 ~~> AST`

在内部，**扫描器**由**解析器**控制将源码转换为AST。解析器由程序间接调动(CompilerHost)。解析器所做的工作：

- 准备好解析器状态
- 准备好扫描器状态
- 解析源代码

使用示例：

```ts
// 深度优先遍历 打印每个节点的syntaxkind 开始位置 截止位置
function printAllChildren(node: ts.Node, depth = 0) {
	// ...
}

var sourceCode = `
var foo = 123;
`.trim();

// 获取一个源文件的sourcefile并打印
var sourceFile = ts.createSourceFile('foo.ts', sourceCode, ts.ScriptTarget.ES5, true);

// print
printAllChildren(sourceFile);
```

该段代码会打印以下内容：

```ts
SourceFile 0 14
---- SyntaxList 0 14
-------- VariableStatement 0 14
------------ VariableDeclarationList 0 13 		// var foo = 123
---------------- VarKeyword 0 3					// var
---------------- SyntaxList 3 13				
-------------------- VariableDeclaration 3 13	// foo = 123
------------------------ Identifier 3 7			// foo
------------------------ FirstAssignment 7 9	// =
------------------------ FirstLiteralToken 9 13 // 123
------------ SemicolonToken 13 14
---- EndOfFileToken 14 14
```

##### 解析器函数

###### `parseXXX`函数 token转换为AST节点

主要调用的函数：

1. `createNode`函数：创建节点。设置节点的SyntaxKind和初始位置。
2. `parseExpected`函数（并非一定会调用）：返回布尔值。检查解析器状态中的当前token是否与指定的`SyntaxKind`消息。匹配则返回true或者再检查nexttoken，不匹配则报告错误信息。
3. `finishnode`函数：设置节点的end位置，添加一些有用的信息。

```ts
// 根据token调用相应的parseXXX函数
function parseStatement(): Statement {
            switch (token()) {
                case SyntaxKind.VarKeyword:
                    return parseVariableStatement(<VariableStatement>createNodeWithJSDoc(SyntaxKind.VariableDeclaration));
                // case ...
            }
    // ...
}

// 设置node的kind，补充节点的declarationList，parse semicolon, finish node
function parseVariableStatement(node: VariableStatement): VariableStatement {
            node.kind = SyntaxKind.VariableStatement;
            node.declarationList = parseVariableDeclarationList(false);
            parseSemicolon();
            return finishNode(node);
        }

// create node, 补充node信息， finish node
function parseVariableDeclarationList(inForStatementInitializer: boolean): VariableDeclarationList {
    const node = createNode(SyntaxKind.VariableDeclarationList);

    switch (token()) {
        case SyntaxKind.VarKeyword:
            break;
        case SyntaxKind.LetKeyword:
            node.flags |= NodeFlags.Let;
            break;
        case SyntaxKind.ConstKeyword:
            node.flags |= NodeFlags.Const;
            break;
        default:
            Debug.fail();
    }

    nextToken();

    // .... 添加node其他信息

    return finishNode(node);
}
```

#### 绑定器

为了协助检查器执行的**类型检查**，绑定器将源码的各部分连接成相关的类型系统，供检查器使用。绑定器的主要职责是**创建符号（Symbols）**。绑定器被检查器在内部调用。

```ts
export const enum SymbolFlags {
        None                    = 0,
        FunctionScopedVariable  = 1 << 0,   // Variable (var) or parameter
        BlockScopedVariable     = 1 << 1,   // A block-scoped variable (let or const)
        Property                = 1 << 2,   // Property or enum member
        EnumMember              = 1 << 3,   // Enum member
        Function                = 1 << 4,   // Function
        Class                   = 1 << 5,   // Class
        Interface               = 1 << 6,   // Interface
        ConstEnum               = 1 << 7,   // Const enum
        RegularEnum             = 1 << 8,   // Enum
        ValueModule             = 1 << 9,   // Instantiated module
        NamespaceModule         = 1 << 10,  // Uninstantiated module
        TypeLiteral             = 1 << 11,  // Type Literal or mapped type
        ObjectLiteral           = 1 << 12,  // Object Literal
        Method                  = 1 << 13,  // Method
        Constructor             = 1 << 14,  // Constructor
        GetAccessor             = 1 << 15,  // Get accessor
        SetAccessor             = 1 << 16,  // Set accessor
        Signature               = 1 << 17,  // Call, construct, or index signature
        TypeParameter           = 1 << 18,  // Type parameter
        TypeAlias               = 1 << 19,  // Type alias
        ExportValue             = 1 << 20,  // Exported value marker (see comment in declareModuleMember in binder)
        Alias                   = 1 << 21,  // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
        Prototype               = 1 << 22,  // Prototype property (no source representation)
        ExportStar              = 1 << 23,  // Export * declaration
        Optional                = 1 << 24,  // Optional property
        Transient               = 1 << 25,  // Transient symbol (created during type check)
        Assignment              = 1 << 26,  // Assignment treated as declaration (eg `this.prop = 1`)
        ModuleExports           = 1 << 27,  // Symbol for CommonJS `module` of `module.exports`

        /* @internal */
        // ...
}
```



```ts
function Symbol(this: Symbol, flags: SymbolFlags, name: __String) {
    this.flags = flags;
    this.escapedName = name;
    this.declarations = undefined!;
    this.valueDeclaration = undefined!;
    this.id = undefined;
    this.mergeId = undefined;
    this.parent = undefined;
}
```

从字符串或其他映射到`Symbol`的`SymbolTable`

```ts
set(key: __String, value: Symbol): this;
delete(key: __String): boolean;
clear(): void;
```



##### 绑定器函数

`bindSourceFile`和`mergeSymbolTable`是两个关键的绑定器函数。

###### `bindSourceFile`函数

```ts
function bindSourceFile(file: SourceFile, opts: CompileOptions) {
    
}
```

检查`file.locals`是否定义，如果没有则交给`bind`函数处理。`locals`的类型是`SymbolTable`。

###### `bind`函数

`bind`函数可以处理任一节点（包括`SourceFile`）。所做的工作：

1. 分配node.parent
2. 调用bindWorker
3. 调用bindChildren函数：将绑定器的状态，如parent存入函数本地变量，然后在每个节点调用bind函数，再将状态转存回绑定器中。

###### `bindWorker`函数

该函数根据`node.kind: SyntaxKind`进行切换，并将工作委托给合适`bindXXX`函数。

###### `bindXXX`函数

##### 绑定器声明
###### 符号与声明
###### 声明

##### 绑定器容器
##### 绑定器符号表
###### 符号表填充


#### 检查器

#### 发射器

程序调用发射器。

## 参考资料

> 《你不知道的JavaScript——上卷》
>
> [TypeScript Deep Dive](https://github.com/basarat/typescript-book/)
>
> [JavaScript——维基百科](https://zh.wikipedia.org/wiki/JavaScript)
>
> [JavaScript|MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

