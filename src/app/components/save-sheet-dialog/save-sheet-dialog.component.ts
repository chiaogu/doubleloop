import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-save-sheet-dialog',
  templateUrl: './save-sheet-dialog.component.html',
  styleUrls: ['./save-sheet-dialog.component.scss']
})
export class SaveSheetDialogComponent implements OnInit {
  name: string = '';

  saving = false;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: { sections: any },
    private db: DatabaseService,
    private dialogRef: MdDialogRef<SaveSheetDialogComponent>
  ) { }

  ngOnInit() {

  }

  save() {
    this.saving = true;
    this.db.saveSheet({
      data: this.data.sections,
      name: this.name,
      time: new Date().getTime()
    })
      .then(_ => {
        this.saving = false;
        this.dialogRef.close();
      })
      .catch(e => {
        this.saving = false;
      });
  }

}
