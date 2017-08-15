import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from "../../services/config.service";
import { BrickService } from "../../services/brick.service";
import { Observable } from "rxjs/Observable";
import { BrickPressEvent } from "../../components/brick/brick.component";
import { Subject } from "rxjs/Subject";

class Recorder {
  recording: boolean = false;
  events: any[] = [];

  finish: (events: any[]) => void;

  toggle() {
    this.recording = !this.recording;
    if (!this.recording) {
      this.events.push({
        time: new Date(),
        note: 'END'
      });
      let track = this.events.splice(0);

      if (this.finish !== undefined) {
        this.finish(track);
      }
    } else {
      this.events.push({
        time: new Date(),
        note: 'START'
      });
    }
  }

  input(event) {
    if (this.recording) {
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

  track: any[] = [];

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
    this.recorder.input({
      time: event.time,
      note: event.brick.id
    });
  }

  toggleRecord() {
    this.recorder.toggle();
  }

  play() {
    console.log('---start---');

    let stream = Observable.of(0);
    let buf = [];

    for (let i = 1; i < this.track.length; i++) {
      let duration = this.track[i].time.getTime() - this.track[i - 1].time.getTime();
      console.log('duration', duration);
      stream = stream
        .delay(duration)
        .do(_ => {
          let time = new Date();
          console.log(this.track[i].note, time.getTime());
          buf.push({
            note: this.track[i].note,
            time
          });
        });
    }

    stream.subscribe(e => {
      for (let i = 1; i < buf.length; i++) {
        console.log(buf[i].time.getTime() - buf[i - 1].time.getTime());
      }
    });
  }
}
