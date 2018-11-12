[TOC]

# class的基本用法

## 1. 简介

class可以堪称是一个生成实例对象的语法糖，这种写法让对象原型的写法更加清晰，更像面向对象编程的语法。

```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

typeof Point // "function"
Point === Point.prototype.constructor // true
Point.toString === Point.prototype.toString // true
```

- 类的数据类型就是函数，类.constructor本身指向构造函数。类的所有方法都定义在类的prototype属性上。

- 类内部定义的所有的方法，都是不可枚举的

## 2. 严格模式

类和模块的内部，默认就是严格模式。

## 3. constructor方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。默认返回实例对象，即this，可以指定返回另外一个对象。

类必须使用new调用，否则报错。普通构造函数则可以不用new

## 4. 类的实例对象

改写实例的原型对象，其他所有实例都会受到影响，因此不推荐使用。

## 5. class表达式

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`MyClass`而不是`Me`，`Me`只在 Class 的内部代码可用，指代当前类。

```javascript
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

上面代码表示，`Me`只在 Class 内部有定义。

如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式。

```javascript
const MyClass = class { /* ... */ };
```

采用 Class 表达式，可以写出立即执行的 Class。

```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

上面代码中，`person`是一个立即执行的类的实例。

## 6. 不存在变量提升

ES6不会把类的声明进行提升。这种规定的原因与继承有关，必须保证子类在父类之后定义。

## 7. 私有方法和私有属性

1. 方法前加下划线

2. 私有方法移出模块，只在模块内部调用

   另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

   ```javascript
   class Widget {
     foo (baz) {
       bar.call(this, baz);
     }
   
     // ...
   }
   
   function bar(baz) {
     return this.snaf = baz;
   }
   ```

   上面代码中，`foo`是公有方法，内部调用了`bar.call(this, baz)`。这使得`bar`实际上成为了当前模块的私有方法。

3. Symbol

   还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。

   ```javascript
   const bar = Symbol('bar');
   const snaf = Symbol('snaf');
   
   export default class myClass{
   
     // 公有方法
     foo(baz) {
       this[bar](baz);
     }
   
     // 私有方法
     [bar](baz) {
       return this[snaf] = baz;
     }
   
     // ...
   };
   ```

   上面代码中，`bar`和`snaf`都是`Symbol`值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

## 8. this的指向

类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境，因为找不到`print`方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。

```javascript
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

还有一种解决方法是使用`Proxy`，获取方法的时候，自动绑定`this`。

```javascript
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

## 9. name属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。

```javascript
class Point {}
Point.name // "Point"
```

`name`属性总是返回紧跟在`class`关键字后面的类名。

## 10. class的取值函数和存值函数

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

## 11. class的Generator方法

如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

上面代码中，`Foo`类的`Symbol.iterator`方法前有一个星号，表示该方法是一个 Generator 函数。`Symbol.iterator`方法返回一个`Foo`类的默认遍历器，`for...of`循环会自动调用这个遍历器。

## 12. class的静态方法

- 前面加static，不能通过实例调用，只能通过类调用。Foo.bar();
- 静态方法内部this指向类而不是实例
- 静态方法可以和非静态方法重名
- 父类的静态方法，子类可以继承
- 静态方法可以从super对象上调用

## 13. class的静态属性和实例属性

静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

## 14. new.target属性

- new.target用在构造函数里，返回new作用的构造函数。如果构造函数不是通过new命令调用的，会返回undefined
- class的new.target是当前类
- 子类继承父类，new.target返回子类。以此可以写出不能独立使用，必须继承后才能使用的类、

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

上面代码确保构造函数只能通过`new`命令调用。

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

上面代码中，`Shape`类不能被实例化，只能用于继承。

注意，在函数外部，使用`new.target`会报错。

## class构造函数与普通构造函数

|                           | class                                                        | 普通构造函数                                   |
| ------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| typeof obj === 'function' | yes                                                          | yes                                            |
| 方法                      | 默认定义到原型对象上。类的内部的方法都是不可枚举的。         | 默认定义到自身，方法可枚举。                   |
| 调用                      | 必须使用new来生成实例对象                                    | 可以使用new；也可以不使用new，当作普通函数调用 |
| 实例                      | 所有实例共享原型对象                                         | 所有实例共享原型对象                           |
| 属性                      | 实例属性除非显示定义在其本身（即定义在this对象上），否则都定义在原型上 |                                                |
| 变量提升                  | 否                                                           | 是                                             |
| new.target                | 类外面不能使用                                               | 函数外面不能使用                               |



# class的继承
## 1. 简介

class可以通过extends关键字实现继承，这比ES5登入通过修改原型链实现继承要方便的多，

```javascript
class Point {
    
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的构造函数
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString();
    }
}
```

super表示父类的构造函数，用来新建父类的this对象。子类必须在构造函数方法中调用super方法。这是因为子类自己的this对象，必需线通过父类的构造函数完成塑造，得到和父类同样的实例属性和方法。

子类构造函数中，调用super之后才能使用this关键字。这是因为子类实例的构建，基于父类实例。只有super方法才能调用父类实例。

父类的静态方法也可以被子类继承

## 2. Object.getPrototypeOf

```javascript
Object.getPrototypeOf(Child) === Parent;
```

可以用这个方法判断，一个类是否继承了另一个类

## 3. super关键字

super关键字可以当作函数使用，也可以当作对象使用。

### super作为函数代表父类的构造函数

- 子类的构造函数必须调用super。表示Parent.prototype.constructor.call(this);
- super()只能在子类构造函数使用

### super作为对象指向父类的原型对象

- super.p相当于Parent.prototype.p()

- super作为对象只能访问原型方法，定义在父类实例的属性或方法，super无法调用

  ```javascript
  class A {
    constructor() {
      this.p = 2;
    }
  }
  
  class B extends A {
    get m() {
      return super.p;
    }
  }
  
  let b = new B();
  b.m // undefined
  ```

  上面代码中，`p`是父类`A`实例的属性，`super.p`就引用不到它。

  如果属性定义在父类的原型对象上，`super`就可以取到。

  ```javascript
  class A {}
  A.prototype.x = 2;
  
  class B extends A {
    constructor() {
      super();
      console.log(super.x) // 2
    }
  }
  
  let b = new B();
  ```

  上面代码中，属性`x`是定义在`A.prototype`上面的，所以`super.x`可以取到它的值。

- 子类通过super调用父类的方法时，this指向当前的子类实例

- 通过super赋值，赋值子类实例的属性。

  ```javascript
  class A {
    constructor() {
      this.x = 1;
    }
  }
  
  class B extends A {
    constructor() {
      super();
      this.x = 2;
      super.x = 3;
      console.log(super.x); // undefined
      console.log(this.x); // 3
    }
  }
  
  let b = new B();
  ```

  上面代码中，`super.x`赋值为`3`，这时等同于对`this.x`赋值为`3`。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回`undefined`。

- super作为对象，用在静态方法之中时，super指向父类，在普通方法中，super指向父类的原型对象

- 在子类的静态方法里调用父类方法时，方法内部的this指向当前子类，而不是子类实例。

- 由于对象总是继承其他对象的，所以可以在任意一个实例对象中，使用super关键字

## 4. 类的prototype属性和`__proto__`属性

- 子类的`__proto__`属性，表示够咱函数的继承，总是指向父类

- 子类的`prototype.__proto__`属性，表示方法的继承，总是指向父类的prototype属性

  ```javascript
  class A {
  }
  
  class B {
  }
  
  // B的实例继承A的实例
  Object.setProtorypeOf(B.prototype, A.prototype)；
  // 相当于 B.prototype.__proto__ = A.prototype;
  
  // B继承A的静态属性
  Object.setPrototypeOf(B, A);
  // 相当于B.__proto__ = A;
  
  const b = new B();
  ```

  作为一个对象，子类的原型(`__proto__`)是父类，作为一个构造函数，子类的原型（`prototype`属性）是父类的原型对象的实例

  extends关键字后面可以跟多种类型的值

  ```javascript
  class B extends A {
  }
  ```

  A只要是一个有prototype属性的函数，就能被B继承。

  第一种，子类继承`Object`类。

  ```javascript
  class A extends Object {
  }
  
  A.__proto__ === Object // true
  A.prototype.__proto__ === Object.prototype // true
  ```

  这种情况下，`A`其实就是构造函数`Object`的复制，`A`的实例就是`Object`的实例。

  第二种情况，不存在任何继承。

  ```javascript
  class A {
  }
  
  A.__proto__ === Function.prototype // true
  A.prototype.__proto__ === Object.prototype // true
  ```

  这种情况下，`A`作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。但是，`A`调用后返回一个空对象（即`Object`实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。

  子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

  ```javascript
  var p1 = new Point(2, 3);
  var p2 = new ColorPoint(2, 3, 'red');
  
  p2.__proto__ === p1.__proto__ // false
  p2.__proto__.__proto__ === p1.__proto__ // true
  ```

  上面代码中，`ColorPoint`继承了`Point`，导致前者原型的原型是后者的原型。

  因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为。

  ```javascript
  p2.__proto__.__proto__.printName = function () {
    console.log('Ha');
  };
  
  p1.printName() // "Ha"
  ```

  上面代码在`ColorPoint`的实例`p2`上向`Point`类添加方法，结果影响到了`Point`的实例`p1`。


## 5. 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

ES5无法继承原生构造函数，因为Array.apply()会忽略第一个参数

## 6. Mixin模式的实现



## ES5继承和class继承

|                       | class继承                                                    | ES5继承                                                      |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| this构造方式          | 先将父类实例对象的属性和方法，加到this上面（所以必须掉哟个super方法），然后再用子类的构造函数修改this | 先创造子类的实例对象this，再将父类的方法添加到this。Parent.apply(this) |
| `__proto__`           | 表示构造函数的继承，指向父类                                 | 指向构造函数的prototype属性（父类的实例,constructor指向自身） |
| `prototype.__proto__` | prototype的`__proto__`属性，表示方法的继承，总是指向父类的prototype属性 |                                                              |
|                       |                                                              |                                                              |
|                       |                                                              |                                                              |
|                       |                                                              |                                                              |
|                       |                                                              |                                                              |
|                       |                                                              |                                                              |

