import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  Array = Array;
  @Input() row: number = 0;
  @Input() column: number = 0;
  @Input() bricks: any = {};

  constructor() { }

  ngOnInit() {
  }

  getBrick(x, y) {
    if (this.bricks === undefined || this.bricks === null) {
      return undefined;
    }
    return this.bricks[`${x},${y}`];
  }

}
