import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService, Config } from "../../services/config.service";
import { BrickService } from "../../services/brick.service";
import { Observable } from "rxjs/Observable";
import { BrickPressEvent } from "../../components/brick/brick.component";
import { TimelineComponent } from "../../components/timeline/timeline.component";
import { FirebaseListObservable } from "angularfire2/database";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(TimelineComponent) timeline: TimelineComponent;

  config$: Observable<Config>;

  bricks$: Observable<any>;

  items$: FirebaseListObservable<any[]>;

  constructor(
    private config: ConfigService,
    private brick: BrickService,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.config$ = this.config.get().shareReplay();

    this.bricks$ = this.config$
      .switchMap(config => {
        let ids = Object.keys(config.bricks).reduce((arr, coord) => {
          arr.push(config.bricks[coord]);
          return arr;
        }, []);

        return Observable.forkJoin(
          Observable.of(config),
          this.brick.get(ids)
        );
      })
      .map(([config, bricks]) => {
        for (let coord of Object.keys(config.bricks)) {
          let id = config.bricks[coord];
          config.bricks[coord] = bricks[id];
        }
        return config.bricks;
      });

    this.items$ = this.db.listSheet();

    this.items$.subscribe(items => {
      console.log('items', items);
    });
  }

  onBrickPress(event: BrickPressEvent) {
    if (this.timeline === undefined) {
      return;
    }
    this.timeline.input(event);
  }
}
