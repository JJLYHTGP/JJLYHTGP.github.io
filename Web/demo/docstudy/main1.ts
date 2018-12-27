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
tupleArr = [0, 'h']; // error [ts] Type 'string' is not assignable to type 'number'. [2322]

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
console.log(Color7); 
/**
var Color7;
(function (Color7) {
})(Color7 || (Color7 = {}));
(function (Color7) {
    Color7[Color7["Red"] = 0] = "Red";
})(Color7 || (Color7 = {}));
 */

// Object
const obj: object = {};

// Date
const today: Date = new Date();

// RegExp
const reg: RegExp = /0/;

// function
const arrowfunc: function = () => {};

// class
class Person {
}

const p: Person = new Person();


}

namespace enumcheck {
    enum Color7 { Blue }
    console.log(Color7);
}

