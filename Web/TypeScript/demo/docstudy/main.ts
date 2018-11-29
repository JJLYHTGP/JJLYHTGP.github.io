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



