export default class Grid {
    board: Array<Array<boolean>> = [];

    constructor(public side: number) {
        this.setBox(side);
    }

    setBox(side: number) {
        for (let i = 0; i < side; i++) {
            const row: Array<boolean> = [];
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
