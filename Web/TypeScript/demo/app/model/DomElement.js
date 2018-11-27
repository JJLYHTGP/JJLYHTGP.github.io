"use strict";
exports.__esModule = true;
var DomElement = /** @class */ (function () {
    function DomElement(tagName) {
        this.tagName = tagName;
        this.element = document.createElement(tagName);
    }
    DomElement.prototype.setEleClass = function () {
        var _this = this;
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        classNames.forEach(function (className) { return _this.element.classList.add(className); });
    };
    DomElement.prototype.appendChild = function (child) {
        this.element.appendChild(child);
    };
    DomElement.prototype.setEleStyle = function (style) {
        for (var _i = 0, style_1 = style; _i < style_1.length; _i++) {
            var key = style_1[_i];
            this.element.style[key] = style[key];
        }
    };
    DomElement.prototype.getElement = function () {
        return this.element;
    };
    return DomElement;
}());
exports["default"] = DomElement;
