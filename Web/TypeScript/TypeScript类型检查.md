# TypeScript类型系统

## TypeScript简介

- 是JavaScript的严格超集。任何现有的JavaScript程序都是合法的typescript程序。typescript最终被转译为javascript程序。typescript不会阻止JavaScript的执行，即使存在类型错误。

- 编译器：tsc，可以将typescript编译为可以在任何JavaScript引擎（如浏览器）中执行的标准JavaScript。

- 典型的 JavaScript 转换器只有以下流程：

  ```text
  SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~Emitter~~> JavaScript
  ```

  比起TypeScript缺少的一个关键功能，就是语义系统。关键工作是检查器来做的。

  ```ts
  SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~ Binder ~~> Symobols(符号) ~~ Checker ~~> 类型验证~~Emitter ~~> JavaScript
  ```

- 因为在开发大规模JavaScript应用的过程中遇到语言本身的短板，因此开发者决定进行语言的扩展。


## 类型

### Basic Types

[Basic Types . TypeScript](http://www.typescriptlang.org/docs/handbook/basic-types.html)

基本类型：

1. 布尔值 `boolean`

2. 数字 `number`

3. 字符串 `string`

4. `symbol`

5. `null`

6. `undefined`

   ```ts
   // Not much else we can assign to these variables!
   let u: undefined = undefined;
   let n: null = null;
   ```

   > 默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。
   >
   > 然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 

引用类型：

1. 数组 `number[]`或`Array<number>`以及`ReadonlyArray<number>`

2. 元组 `Tuple`

   元组类型允许表示一个已知元素数量和类型的数组。

   ```ts
   let x: [string, number] = ['', 0]; // ok
   x = [0, 'h']; // error [ts] Type 'string' is not assignable to type 'number'.
   ```

3. 枚举 `Enum`

   - 使用枚举类型可以为一组数值(numberic value)赋予友好的名字。

   - 枚举名可以映射到枚举值，枚举值也可以映射枚举名。

   - 可以组合标志。

     ```ts
     enum AnimalFlags {
       None        = 0,
       HasClaws    = 1 << 0,
       CanFly      = 1 << 1,
     
       EndangeredFlyingClawedFishEating = HasClaws | CanFly 
     }
     ```

   - 枚举值不能是布尔值、模板字符串、`symbol`。枚举值可以是常量：

     1. 没有初始化时，枚举值有默认值
     2. 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：

     - 一个枚举表达式字面量（主要是静态字符串或数字）
     - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
     - 带括号的常量枚举表达式
     - 一元运算符 `+`, `-`, `~`其中之一应用在了常量枚举表达式
     - 常量枚举表达式做为二元运算符 `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`,`|`, `^`的操作对象。 若常数枚举表达式求值后为 `NaN`或 `Infinity`，则会在编译阶段报错。

   - 枚举成员可以是计算出来的值

     ```ts
     enum G {
         m = ''.length
     }
     ```

   - 不同命名空间(namespace)可以有同名枚举类型，同一命名空间的枚举类型会被merge

   ```ts
   enum Color7 {}
   enum Color7 {Red} // 生效
   ```

   **常量枚举**

   为了避免代码生成的开销和歪的非直接的对枚举成员的访问，可以使用常量枚举

   `'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.`

   ```ts
   const enum nums {a,b,c}
   const arr = [nums.a, nums.b, nums.c];
   ```

   将会被编译成

   ```ts
   const arr = [0, 1, 2];
   ```

   不会为常量枚举类型编译成任何JavaScript（运行时没有nums变量）。

   编译选项`--preserveConstEnums`能让编译器仍然把常量枚举类型编译成JavaScript。

4. 不能批注的类型

   - `Proxy`不能作为批注

   ```ts
   const proxy: Proxy = new Proxy({}, {}); // Cannot find name 'Proxy'. [2304]
   ```

5. 对象`object`

   - `Date`、`RegExp`

   - `Function`

     ```ts
     const arrowfunc: Function = () => {}; 
     ```

   Es6的新的数据结构

   - `class`

     ```ts
     // class
     class Person {
     }
     
     const p: Person = new Person(); // ok
     ```

   - `Set`、`WeakSet`、`Map`、`WeakMap`

     > 泛型编程：一种允许在**强类型**程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指定这些类型。

     ```ts
     // Set
     const myset: Set = new Set([1, 2, 3]); 
     // Error Generic type 'Set<T>' requires 1 type argument(s)
     
     const set: Set<number> = new Set([1, 2, 3]); // ok
     
     // WeakSet
     const weakSet: WeakSet<object> = new WeakSet([{}]);
     console.log(weakSet);
     
     // Map
     const map: Map<number, number> = new Map();
     
     // WeakMap
     const weakmap: WeakMap<object, number> = new WeakMap();
     ```

   - `Promise`

     ```ts
     const promise: Promise<any> = new Promise(function(resolve) {
         setTimeout(function(){
             resolve();
         }, 0);
     });
     ```

   - `ArrayBuffer`

   -  ...

6. `any`

   在编程阶段还不清楚类型的变量，可以用`any`来标记类型。类型检查器就会直接让它们通过编译阶段的检查。

7. `void`

   常用来标记函数的返回值。

   ```ts
   function warnUser(): void {
       console.log("函数没有返回值");
   }
   ```

8. `never`

表示永不存在的值的类型。总是会抛出异常或者不会有返回值的函数的类型。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

9. ...

### 类型断言

typescript允许你覆盖它的推断，这种机制称为类型断言。想要绕过类型检查可能得坑，除了批注为any，还可以使用断言。

```ts
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
```

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

### 接口

接口是typescript用来声明变量的结构的方式。如下面的例子就描述了一个结构：

- 必须包含一个label属性且类型为`string`。
- `name`属性不是必需的。

```ts
interface LabelledValue {
    label: string;
    name?: string;
}
```





