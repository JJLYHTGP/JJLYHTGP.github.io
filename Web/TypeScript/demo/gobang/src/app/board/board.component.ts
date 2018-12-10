import { Component, OnInit } from '@angular/core';
import Board from '../models/Board';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    board: Board;
    aGrids = [];
    side = 15;
    constructor() { }

    ngOnInit() {
        this.board = new Board(this.side);
        this.aGrids = this.board.getGrids();
    }

}
