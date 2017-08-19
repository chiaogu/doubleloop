import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { FacebookService } from "../../services/facebook.service";

@Component({
  selector: 'app-save-sheet-success-dialog',
  templateUrl: './save-sheet-success-dialog.component.html',
  styleUrls: ['./save-sheet-success-dialog.component.scss']
})
export class SaveSheetSuccessDialogComponent implements OnInit {
  url: string;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private facebook: FacebookService
  ) {
    const host = window.location.host;
    const protocol = window.location.protocol;

    this.url = `${protocol}//${host}/explore?id=${data}`;
  }

  ngOnInit() {
  }

  share() {
    this.facebook.share(this.url).then(res => {
      console.log('response', res);
    });
  }

}
