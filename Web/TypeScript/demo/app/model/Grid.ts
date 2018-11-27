import DomElement from './DomElement';

class Grid extends DomElement {
    constructor(public tagName, public side) {
        super(tagName);
        this.setBox(side);
    }

    setBox(side) {
        super.setEleStyle({
            width: side,
            height: side
        });
    }

}

export default Grid;
