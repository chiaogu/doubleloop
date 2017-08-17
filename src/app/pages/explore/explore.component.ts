import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { DatabaseService } from "../../services/database.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  sheets$: Observable<any[]>;
  
  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.sheets$ = this.db.listSheet();
  }

}
