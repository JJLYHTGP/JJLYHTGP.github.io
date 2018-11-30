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

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 10 };
p1.x = 10; // error

let a: number[] = [1];
let ro: ReadonlyArray<number> = a;
let ro2: ReadonlyArray<number> = a;
ro[0] = 1; // error: only permit reading
ro.push(1); // error: property 'push' doesnot exist
ro.length = 100 // error: a constant or read-only property
a = ro; // type ReadonlyArray<number> is not assignable to number[], property 'pop' is missing on type ReadonlyArray<number> 
ro2 = ro; // OK
