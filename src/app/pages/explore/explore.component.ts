import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  sheets$: FirebaseListObservable<any[]>;
  
  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.sheets$ = this.db.listSheet();
  }

}
