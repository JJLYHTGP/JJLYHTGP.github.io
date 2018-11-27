import DomElement from './DomElement';
import Grid from './Grid';

interface GridBoard {
    unit: number;
    width: number;
    height: number;
}

export default class Board {
    boardEle: DomElement;

    constructor(public unit, public width, public height) {
        this.boardEle = new DomElement('div');
        this.initBoard();
    }

    initBoard() {
        for (let i = 0; i < this.width; i++) {
            const row = new DomElement('div');
            row.setEleClass('display-flex');
            for (let j = 0; j < this.height; j++) {
                const grid = new Grid('div', `${this.unit}px`);
                grid.setEleClass('grid');
                row.appendChild(grid.getElement());
            }
            this.getBoardElement().appendChild(row.getElement());
        }
    }

    getBoardElement() {
        return this.boardEle.getElement();
    }
}
