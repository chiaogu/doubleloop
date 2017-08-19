import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService, Config } from "../../services/config.service";
import { BrickService } from "../../services/brick.service";
import { Observable } from "rxjs/Observable";
import { BrickPressEvent } from "../../components/brick/brick.component";
import { TimelineComponent } from "../../components/timeline/timeline.component";
import { FirebaseListObservable } from "angularfire2/database";
import { DatabaseService } from "../../services/database.service";
import { MdDialog } from '@angular/material';
import { SaveSheetDialogComponent } from "../../components/save-sheet-dialog/save-sheet-dialog.component";

class Recorder {
  recording: boolean = false;
  events: any[] = [];

  finish: (events: any[]) => void;

  toggle() {
    this.recording = !this.recording;
    if (!this.recording) {
      this.events.push({
        time: new Date(),
        id: 'END'
      });
      let track = this.events.splice(0);

      if (track.length > 2 && this.finish !== undefined) {
        this.finish(track);
      }
    } else {
      this.events.push({
        time: new Date(),
        id: 'START'
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
  @ViewChild(TimelineComponent) timeline: TimelineComponent;

  config$: Observable<Config>;

  bricks$: Observable<any>;

  recorder: Recorder = new Recorder();

  sheet = {
    data: []
  };

  playing = false;

  constructor(
    private config: ConfigService,
    private brick: BrickService,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    this.config$ = this.config.get();

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


    this.recorder.finish = event => {
      this.onRecordFinish(event);
    };
  }

  toggleRecord() {
    this.recorder.toggle();
  }

  toggle() {
    if (this.timeline === undefined) {
      return;
    }
    this.timeline.toggle();
  }

  stop() {
    this.timeline.stop();
  }

  save() {
    if(this.sheet.data.length === 0){
      return;
    }
    let sections = [];
    for (let section of this.sheet.data) {
      let notes = [];
      for (let { time, id } of section) {
        notes.push({ time, id });
      }
      sections.push(notes);
    }

    this.dialog.open(SaveSheetDialogComponent, { data: { sections } });
  }

  onBrickPress(event: BrickPressEvent) {
    this.recorder.input({
      time: event.time,
      id: event.brick.id
    });
  }

  onRecordFinish(events) {
    let offset = events[0].time.getTime();
    for (let event of events) {
      event.time = event.time.getTime() - offset;
    }
    let data = this.sheet.data.slice(0);
    data.push(events);
    this.sheet = { data };
  }

  onTimelineStateChange(event) {
    if(event === 'play'){
      this.playing = true;
    }else{
      this.playing = false;
    }
  }
}
