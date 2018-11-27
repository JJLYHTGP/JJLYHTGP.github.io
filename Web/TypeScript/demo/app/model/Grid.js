"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var DomElement_1 = require("./DomElement");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(tagName, side) {
        var _this = _super.call(this, tagName) || this;
        _this.tagName = tagName;
        _this.side = side;
        _this.setBox(side);
        return _this;
    }
    Grid.prototype.setBox = function (side) {
        _super.prototype.setEleStyle.call(this, {
            width: side,
            height: side
        });
    };
    return Grid;
}(DomElement_1["default"]));
exports["default"] = Grid;
