import Board from './model/Board';


// function getRectangle(rectangle: Rectangle) {
//     const { unit, width, height } = rectangle;
//     const hRectangle = new DomElement('div');
//     for (let i = 0; i < width; i++) {
//         const row = new DomElement('div');
//         row.setEleClass('display-flex');
//         for (let j = 0; j < height; j++) {
//             const grid = new Grid('div', `${unit}px`);
//             grid.setEleClass('grid');
//             row.appendChild(grid.getElement());
//         }
//         hRectangle.appendChild(row.getElement());
//     }
//     // setEleClass(hRectangle, 'display-flex');
//     return hRectangle.getElement();
// }

const board = new Board(45, 15, 15);
const boardEle = board.getBoardElement();
document.body.appendChild(boardEle);