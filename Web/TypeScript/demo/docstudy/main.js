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
    Color5["Green"] = "0";
    Color5["Blue"] = "";
})(Color5 || (Color5 = {}));
function log() {
    var aEnums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        aEnums[_i] = arguments[_i];
    }
    aEnums.forEach(function (eEnum) {
        for (var a in eEnum) {
            console.log(a + " " + eEnum[a]);
        }
    });
}
var Color6;
(function (Color6) {
    Color6[Color6["Red"] = 1] = "Red";
    Color6[Color6["Green"] = 1] = "Green";
    Color6[Color6["Blue"] = 1] = "Blue";
})(Color6 || (Color6 = {}));
console.log(Color, Color2, Color3, Color4, Color5, Color6);
//# sourceMappingURL=main.js.map