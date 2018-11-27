"use strict";
exports.__esModule = true;
var DomElement_1 = require("./DomElement");
var Grid_1 = require("./Grid");
var Board = /** @class */ (function () {
    function Board(unit, width, height) {
        this.unit = unit;
        this.width = width;
        this.height = height;
        this.boardEle = new DomElement_1["default"]('div');
        this.initBoard();
    }
    Board.prototype.initBoard = function () {
        for (var i = 0; i < this.width; i++) {
            var row = new DomElement_1["default"]('div');
            row.setEleClass('display-flex');
            for (var j = 0; j < this.height; j++) {
                var grid = new Grid_1["default"]('div', this.unit + "px");
                grid.setEleClass('grid');
                row.appendChild(grid.getElement());
            }
            this.getBoardElement().appendChild(row.getElement());
        }
    };
    Board.prototype.getBoardElement = function () {
        return this.boardEle.getElement();
    };
    return Board;
}());
exports["default"] = Board;
