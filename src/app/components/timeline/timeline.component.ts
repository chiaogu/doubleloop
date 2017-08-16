import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

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

      if (this.finish !== undefined) {
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
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  recorder: Recorder = new Recorder();

  sections: any[][] = [];

  constructor() { }

  ngOnInit() {
    this.recorder.finish = events => {
      console.log(events);
      this.sections.push(events);
    };
  }

  toggleRecord() {
    this.recorder.toggle();
  }

  play() {
    console.log('---start---');

    let stream = Observable.of(0);
    let buf = [];

    let joined = [];
    for (let i = 0; i < this.sections.length; i++) {
      joined.push(...this.sections[i]);
    }

    for (let i = 1; i < joined.length; i++) {
      let duration = joined[i].time.getTime() - joined[i - 1].time.getTime();
      console.log('duration', duration);
      stream = stream
        .delay(duration)
        .do(_ => {
          let time = new Date();
          console.log(joined[i].id, time.getTime());
          buf.push({
            note: joined[i].id,
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

  input(event) {
    this.recorder.input({
      time: event.time,
      id: event.brick.id
    });
  }
}
