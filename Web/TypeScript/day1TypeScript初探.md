# day1 TypeScript初探

## 上手

[5分钟上手TypeScript](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html)

- 类型注解：设置object报错？

## 实例学习

[TypeScriptSamples](https://github.com/Microsoft/TypeScriptSamples)

## 手册指南

### 基础类型

TS支持与JS几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

#### 布尔值

```javascript
let isDone: boolean = false;
```

#### 数字

```javascript
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1001; // 二进制
let octalLiteral: nuber = 0o733; // 八进制
```

#### 字符串

```javascript
let name: string = 'tony'; // 普通字符串
let name: string = `my name is ${myname}`;// 模板字符串
```

#### 数组

```typescript
// 元素类型后面接上[]，表示由此元素组成的一个数组
let list: number[] = [1, 2, 3];
// 使用数组泛型，Array<元素类型>
let list: Array<number> = [1, 2, 3];
```

#### 元组 Tuple

元组类型表示一个已知元素数量和类型的数组，各个元素的类型不必相同。如果数组内的元素和定义的数量类型不同，会报错。

```typescript
let x: [string, number] = ['i', 12];

x = [1, 'e']; // Error
```

当访问一个一直索引的元素，正确

```typescript
x[0].substr(); // OK
x[1].substr(); // Error, 'number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代。

```typescript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

#### 枚举

```typescript
// Red Green Blue是名字，值是0,1,2
enum Color {Red, Green, Blue}
let r: Color = Color.Red;

// 可以手动指定成员的值，也可以全部都采用手动赋值
enum Color2 {Red=1, Green, Blue}

// 可以由枚举的值得到它的名字，也可以由名字得到枚举的值
enum Color3 {Red=1, Green=1, Blue=1}
console.log(Color2[1]);
```

```typescript
enum Color {
  Red, Green, Blue
}
{0: "Red", 1: "Green", 2: "Blue", Red: 0, Green: 1, Blue: 2} 


enum Color2 {
  Red = 1, Green, Blue
}
{1: "Red", 2: "Green", 3: "Blue", Red: 1, Green: 2, Blue: 3} 


enum Color3 {
  Red, Green = 2, Blue
}
{0: "Red", 2: "Green", 3: "Blue", Red: 0, Green: 2, Blue: 3} 


enum Color4 {
  Red, Green = '', Blue = ''
}
{0: "Red", Red: 0, Green: "", Blue: ""}

enum Color5 {
  Red, Green = '0', Blue = ''
}
{0: "Red", Red: 0, Green: "0", Blue: ""} 

enum Color6 {Red=1, Green=1, Blue=1}
{1: "Blue", Red: 1, Green: 1, Blue: 1}
```

#### Any

any类型允许你在编译时可选择地包含或移除类型检查。Object类型的变量允许赋任何值，但是不能调用任意的方法，即使真的有这种方法。

```typescript
let noSure: any = 4;
notSure.ifItExists();

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesnot exist on type 'Object'
```

#### Void

```typescript
// 没有任何类型
function warnUser(): void {
    
}
// 声明void类型的变量，只能赋予undefined和null
let user: void = null;
```

#### Null和Undefined

```typescript
null和undefined类型只能赋值给本身
默认情况下null和undefined时所有类型的子类型，如：可以把null和undefined复制给number类型的变量
当指定了--strictNullChecks，undefined和null只能赋值给void和本身。
```

#### Never

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。

下面是一些返回`never`类型的函数：

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

#### Object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

使用`object`类型，就可以更好的表示像`Object.create`这样的API。例如：

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

#### 类型断言

#### let

### 变量声明

#### 变量声明

使用let和const代替var

#### 解构



### 接口

```typescript
// 必须包含一个label属性且值为string
interface LabelledValue {
    color?: string; // 可选属性
    label: string;
} // 代表了一个有一个label属性且类型为string的对象

function printLabel(labelObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'size 10 Obj' };
printLabel(myObj);
```

#### 可选属性

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 `createSquare`里的`color`属性名拼错，就会得到一个错误提示：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```