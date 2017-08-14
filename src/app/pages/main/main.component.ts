import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from "../../services/config.service";
import { BrickService } from "../../services/brick.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  config$: Observable<Config>;

  bricks$: Observable<any>;

  constructor(
    private config: ConfigService,
    private brick: BrickService
  ) { }

  ngOnInit() {
    this.config$ = Observable.from(this.config.get()).shareReplay();

    this.bricks$ = this.config$
      .switchMap(config => {
        let ids = Object.keys(config.bricks).reduce((arr, coord) => {
          arr.push(config.bricks[coord]);
          return arr;
        }, []);

        return Observable.from(Promise.all([
          Promise.resolve(config),
          this.brick.get(ids)
        ]));
      })
      .map(([config, bricks]) => {
        for(let coord of Object.keys(config.bricks)){
          let id = config.bricks[coord];
          config.bricks[coord] = bricks[id];
        }
        return config.bricks;
      });
  }

}
