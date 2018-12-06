// 枚举
enum Color {
  Red, Green, Blue
}

enum Color2 {
  Red = 1, Green, Blue
}

enum Color3 {
  Red, Green = 2, Blue
}

enum Color4 {
  Red, Green = '', Blue = ''
}

enum Color5 {
  Red, Green = '0', Blue = ''
}

enum Color6 {Red=1, Green=1, Blue=1}
console.log(Color, Color2, Color3, Color4, Color5, Color6);

// 接口
/*

// 额外的属性检查
interface SquareConfig {
  color: string;
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

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}


let p1: Point = { x: 10, y: 10 };
p1.x = 10; // error

// ReadonlyArray<T>
let a: number[] = [1];
let ro: ReadonlyArray<number> = a;
let ro2: ReadonlyArray<number> = a;
ro[0] = 1; // error: only permit reading
ro.push(1); // error: property 'push' doesnot exist
ro.length = 100 // error: a constant or read-only property
a = ro; // type ReadonlyArray<number> is not assignable to number[], property 'pop' is missing on type ReadonlyArray<number> 
ro2 = ro; // OK

*/

// 类类型
/*
interface ClockConstructor {
  new (hour: number, minute: number): any;
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
*/
/* Class 'Clock' incorrectly implements interface 'ClockConstructor'.
  Type 'Clock' provides no match for the signature 
  'new (hour: number, minute: number): any'. 
*/


abstract class Animal {
  abstract makeSound(): void;
  move(): void {
      console.log('roaming the earch...');
  }
}

abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
      console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

