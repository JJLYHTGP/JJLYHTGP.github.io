var typecheck;
(function (typecheck) {
    // boolean
    var isSingle = true;
    // number
    var decLiteral = 6;
    var hexLiteral = 0xf00d;
    var binaryLiteral = 10;
    var octalLiteral = 484;
    // string
    var name1 = 'tony'; // 普通字符串
    var name2 = "my name is " + name1; // 模板字符串
    // symbol
    var prop = Symbol();
    // null
    // undefined
    // Array
    var arr = [0];
    // Tuple
    var tupleArr = ['', 0]; // ok
    tupleArr = [0, 'h']; // error [ts] Type 'string' is not assignable to type 'number'. [2322]
    // Enum
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    var Color2;
    (function (Color2) {
        Color2[Color2["Red"] = 1] = "Red";
        Color2[Color2["Green"] = 2] = "Green";
        Color2[Color2["Blue"] = 3] = "Blue";
    })(Color2 || (Color2 = {}));
    var Color3;
    (function (Color3) {
        Color3[Color3["Red"] = 0] = "Red";
        Color3[Color3["Green"] = 2] = "Green";
        Color3[Color3["Blue"] = 3] = "Blue";
    })(Color3 || (Color3 = {}));
    var Color4;
    (function (Color4) {
        Color4[Color4["Red"] = 0] = "Red";
        Color4["Green"] = "";
        Color4["Blue"] = "";
    })(Color4 || (Color4 = {}));
    var Color5;
    (function (Color5) {
        Color5[Color5["Red"] = 0] = "Red";
        Color5["Green"] = "1";
        Color5["Blue"] = "";
    })(Color5 || (Color5 = {}));
    var Color6;
    (function (Color6) {
        Color6[Color6["Red"] = 1] = "Red";
        Color6[Color6["Green"] = 1] = "Green";
        Color6[Color6["Blue"] = 1] = "Blue";
    })(Color6 || (Color6 = {}));
    var colors = [Color, Color2, Color3, Color4, Color5, Color6];
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
    var Color7;
    (function (Color7) {
    })(Color7 || (Color7 = {}));
    (function (Color7) {
        Color7[Color7["Red"] = 0] = "Red";
    })(Color7 || (Color7 = {})); // 生效
    var AnimalFlags;
    (function (AnimalFlags) {
        AnimalFlags[AnimalFlags["None"] = 0] = "None";
        AnimalFlags[AnimalFlags["HasClaws"] = 1] = "HasClaws";
        AnimalFlags[AnimalFlags["CanFly"] = 2] = "CanFly";
        AnimalFlags[AnimalFlags["EndangeredFlyingClawedFishEating"] = 3] = "EndangeredFlyingClawedFishEating";
    })(AnimalFlags || (AnimalFlags = {}));
    // Object
    var obj = {};
    // Date
    var today = new Date();
    // RegExp
    var reg = /0/;
    // function
    var arrowfunc = function () { };
    // class
    var Person = /** @class */ (function () {
        function Person() {
        }
        return Person;
    }());
    var p = new Person();
    // Set
    var myset = new Set([1, 2, 3]);
    var set = new Set([1, 2, 3]);
    // WeakSet
    var weakSet = new WeakSet([{}]);
    // Map
    var map = new Map();
    // WeakMap
    var weakmap = new WeakMap();
    console.log(map, weakmap, set, weakSet);
    // Proxy
    var proxy = new Proxy({}, {});
    // Promise
    var promise = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 0);
    });
    promise.then(function () { console.log('resolved'); });
    // ArrayBuffer
    var buf = new ArrayBuffer(32);
    // ...
    // void
    function warnUser() {
        console.log("函数没有返回值");
    }
    // 类型断言
    var foo1 = { a: 1 };
    foo1.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
    foo1.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
    var foo2 = {};
    foo2.bar = 123;
    foo2.bas = 'hello';
})(typecheck || (typecheck = {}));
var enumcheck;
(function (enumcheck) {
    var Color7;
    (function (Color7) {
        Color7[Color7["Blue"] = 0] = "Blue";
    })(Color7 || (Color7 = {}));
    console.log(Color7);
})(enumcheck || (enumcheck = {}));
