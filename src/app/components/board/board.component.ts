import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrickPressEvent } from "../brick/brick.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() bricks: any = {};

  @Output() brickPress: EventEmitter<BrickPressEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getBrick(x, y) {
    if (this.bricks === undefined || this.bricks === null) {
      return undefined;
    }
    return this.bricks[`${x},${y}`];
  }

  onBrickPress(event: BrickPressEvent) {
    this.brickPress.next(event);
  }
}
