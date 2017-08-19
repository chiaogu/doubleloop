import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { DatabaseService } from "../../services/database.service";
import { Observable } from "rxjs/Observable";
import { MdDialog } from "@angular/material";
import { SheetDialogComponent } from "../../components/sheet-dialog/sheet-dialog.component";
import { Router, NavigationEnd, Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  sheets$: Observable<any[]>;
  routeSub;

  constructor(
    private db: DatabaseService,
    private dialog: MdDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sheets$ = this.db.listSheet();

    this.routeSub = this.route.queryParams
      .filter(params => params.id !== undefined)
      .switchMap(params => this.db.getSheet(params.id))
      .switchMap(sheet => this.dialog.open(SheetDialogComponent, {data: { sheet }}).afterClosed())
      .subscribe(_ => {
        this.router.navigate(['/explore']);
      });
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
