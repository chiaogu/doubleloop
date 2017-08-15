import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from "../../services/config.service";
import { BrickService } from "../../services/brick.service";
import { Observable } from "rxjs/Observable";
import { BrickPressEvent } from "../../components/brick/brick.component";
import { Subject } from "rxjs/Subject";

class Recorder {
    recording: boolean = false;
    events: BrickPressEvent[] = [];

    finish: (events) => void;

    toggle() {
      this.recording = !this.recording;
      if(!this.recording) {
        if(this.finish !== undefined){
          this.finish(this.events.splice(0));
        }
      }
    }

    input(event) {
      if(this.recording) {
        this.events.push(event);
      }
    }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  config$: Observable<Config>;

  bricks$: Observable<any>;

  recorder: Recorder = new Recorder();

  track: BrickPressEvent[] = [];

  constructor(
    private config: ConfigService,
    private brick: BrickService
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

    this.recorder.finish = events => {
      console.log(events);
      this.track = events;
    };
  }

  onBrickPress(event: BrickPressEvent) {
    this.recorder.input(event);
  }

  toggleRecord(){
    this.recorder.toggle();
  }
}
