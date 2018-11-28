export default class Grid {
    board;

    constructor(public side: number) {
        this.board = [];
        this.setBox(side);
    }

    setBox(side: number) {
        for (let i = 0; i < side; i++) {
            const row = [];
            this.board.push(row);
            for (let j = 0; j < side; j++) {
                row.push(false);
            }
        }
    }

    getGrids() {
        return this.board;
    }
}
