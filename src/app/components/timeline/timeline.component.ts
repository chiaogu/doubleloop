import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BrickService } from "../../services/brick.service";
import { AudioContext } from 'angular-audio-context';
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
export class TimelineComponent implements OnInit, OnDestroy {

  recorder: Recorder = new Recorder();

  sections: any[][] = [];

  buffers = {};

  play$: Subject<void> = new Subject<void>();

  playSub;

  constructor(
    private brickSetvice: BrickService,
    private audio: AudioContext
  ) { }

  ngOnInit() {
    this.recorder.finish = event => {
      this.onRecordFinish(event);
    };

    this.playSub = this.play$
      .switchMap(() => {
        let events = [];
        for (let i = 0; i < this.sections.length; i++) {
          events.push(...this.sections[i]);
        }

        let stream = Observable.of(0);
        for (let i = 1; i < events.length; i++) {
          let duration = Math.max(0, events[i].time - events[i - 1].time);
          stream = stream.delay(duration).do(_ => {
            let buffer = this.buffers[events[i].id];
            if (buffer !== undefined) {
              let bufferSource = this.audio.createBufferSource();
              bufferSource.buffer = buffer;
              bufferSource.connect(this.audio.destination);
              bufferSource.start(0);
            }
          });
        }
        return stream;
      })
      .subscribe();
  }

  ngOnDestroy() {
    if(this.playSub) this.playSub.unsubscribe();
  }

  toggleRecord() {
    this.recorder.toggle();
  }

  play() {
    this.play$.next();
  }

  input(event) {
    this.recorder.input({
      time: event.time,
      id: event.brick.id
    });
  }

  onRecordFinish(events) {
    let offset = events[0].time.getTime();
    for(let event of events){
      event.time = event.time.getTime() - offset;
    }
    this.sections.push(events);

    for (let event of events) {
      if (this.buffers[event.id] === undefined) {
        this.brickSetvice.getBuffer(event.id).subscribe(buffer => {
          this.buffers[event.id] = buffer;
        });
      }
    }
  }
}
