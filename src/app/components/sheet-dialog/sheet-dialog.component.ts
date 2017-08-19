import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA } from "@angular/material";
import * as moment from 'moment';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-sheet-dialog',
  templateUrl: './sheet-dialog.component.html',
  styleUrls: ['./sheet-dialog.component.scss']
})
export class SheetDialogComponent implements OnInit {
  @ViewChild(TimelineComponent) timeline: TimelineComponent;
  moment = moment;
  sheet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: { sheet: any },
  ) {
    this.sheet = data.sheet;
  }

  ngOnInit() {
  }

  play(){
    if(this.timeline === undefined) {
      return this.timeline;
    }
    this.timeline.play();
  }
}
