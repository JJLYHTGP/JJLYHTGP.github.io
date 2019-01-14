namespace typecheck {
// boolean
const isSingle: boolean = true;

// number
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// string
let name1: string = 'tony'; // 普通字符串
let name2: string = `my name is ${name1}`;// 模板字符串

// symbol
const prop: symbol = Symbol();

// null

// undefined


// Array
const arr: number[] = [0];

// Tuple
let tupleArr: [string, number] = ['', 0]; // ok
// tupleArr = [0, 'h']; // error [ts] Type 'string' is not assignable to type 'number'. [2322]

// Enum
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
    Red, Green = '1', Blue = ''
}

enum Color6 { Red = 1, Green = 1, Blue = 1 }


const colors: object[] = [Color, Color2, Color3, Color4, Color5, Color6];
console.log(typeof Color, colors); // object
console.log(Color6[1]);

/*
main.js
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));

{
    0: "Red",
    1: "Green"
    2: "Blue"
    Blue: 2
    Green: 1
    Red: 0
}
*/
enum Color7 {}
enum Color7 {Red} // 生效
// console.log(Color7); 
/**
var Color7;
(function (Color7) {
})(Color7 || (Color7 = {}));
(function (Color7) {
    Color7[Color7["Red"] = 0] = "Red";
})(Color7 || (Color7 = {}));
 */


enum fileAccess {
    nan = NaN,

}

// const enum
const enum nums {a,b,c}
const arr1 = [nums.a, nums.b, nums.c];




enum AnimalFlags {
    None        = 0,
    HasClaws    = 1 << 0,
    CanFly      = 1 << 1,

    EndangeredFlyingClawedFishEating = HasClaws | CanFly
}


// Object
const obj2: object = {};
const obj3: object = {age:1};
const obj1: Object = '';
const obj4: {} = '';



// Date
const today: Date = new Date();

// RegExp
const reg: RegExp = /0/;

// function
const arrowfunc: Function = () => {};

// class
class Person {
}

const p: Person = new Person();

// Set
// const myset: Set = new Set([1, 2, 3]);
const set: Set<number> = new Set([1, 2, 3]);

// WeakSet
const weakSet: WeakSet<object> = new WeakSet([{}]);

// Map
const map: Map<number, number> = new Map();

// WeakMap
const weakmap: WeakMap<object, number> = new WeakMap();
console.log(map, weakmap, set, weakSet);

// Proxy
// const proxy: Proxy = new Proxy({}, {});

// Promise
const promise: Promise<any> = new Promise(function(resolve) {
    setTimeout(function(){
        resolve();
    }, 0);
});

promise.then(() => {console.log('resolved')});

// ArrayBuffer
const buf: ArrayBuffer = new ArrayBuffer(32);

// ...

// void
function warnUser(): void {
    console.log("函数没有返回值");
}

// 类型断言
const foo1 = {a:1};
// foo1.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
// foo1.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'

interface Foo {
    bar: number;
    bas: string;
    [prop: string]: any;
}

const foo2 = {} as Foo;
foo2.bar = 123;
foo2.bas = 'hello';













}

namespace enumcheck {
    enum Color7 { Blue }
    console.log(Color7);
}

