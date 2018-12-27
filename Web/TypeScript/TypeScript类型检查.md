# TypeScript类型检查

## TypeScript简介

- 是JavaScript的严格超集。任何现有的JavaScript程序都是合法的typescript程序。typescript最终被转译为javascript程序。typescript不会阻止JavaScript的执行，即使存在类型错误。

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

## 类型批注

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

   默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

   然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 

引用类型：

1. 数组 `number[]`或`Array<number>`

2. 元组 `Tuple`

   元组类型允许表示一个已知元素数量和类型的数组。

   ```ts
   let x: [string, number] = ['', 0]; // ok
   x = [0, 'h']; // error [ts] Type 'string' is not assignable to type 'number'.
   ```

3. 枚举 `Enum`

   - 使用枚举类型可以为一组数值(numberic value)赋予友好的名字。
   - 枚举名可以映射到枚举值，枚举值也可以映射枚举名。
   - 枚举值不能是布尔值、模板字符串、`symbol`。可以说只能是静态字符串和数字
   - 不同命名空间(namespace)可以有同名enum，同一命名空间的enum会被merge

   ```ts
   enum Color7 {}
   enum Color7 {Red} // 生效
   ```

4. `function` 不能作为批注

   ```ts
   const arrowfunc: function = () => {}; // [ts] Cannot find name 'function'. [2304]
   ```

5. 对象`object`

   - `Date`、`RegExp`

   Es6的新的数据结构

   - `class`

     ```ts
     // class
     class Person {
     }
     
     const p: Person = new Person(); // ok
     ```

   - `Set`、`WeakSet`

     ```ts
     
     ```

   - `Map`、`WeakMap`

6. `any`

7. `void`

8. `never`



