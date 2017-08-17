import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  @Input() sheet;
  
  constructor() { }

  ngOnInit() {
  }

}
