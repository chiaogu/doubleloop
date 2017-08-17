import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-sheet-dialog',
  templateUrl: './sheet-dialog.component.html',
  styleUrls: ['./sheet-dialog.component.scss']
})
export class SheetDialogComponent implements OnInit {
  sheet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: { sheet: any },
  ) { 
    this.sheet = data.sheet;
  }

  ngOnInit() {
  }

}
