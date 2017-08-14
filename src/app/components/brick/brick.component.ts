import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit {
  @Input() brick;
  
  constructor() { }

  ngOnInit() {
  }

}
