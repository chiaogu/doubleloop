import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BrickService } from "../../services/brick.service";
import { AudioContext } from 'angular-audio-context';
import { Subject } from "rxjs/Subject";
import { DatabaseService } from "../../services/database.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy, OnChanges {
  @Input() readOnly = false;
  @Input() sheet;

  buffers = {};
  listRecycled = [];
  dragging = false;

  play$: Subject<void> = new Subject<void>();

  playSub;

  constructor(
    private brickSetvice: BrickService,
    private audio: AudioContext
  ) { }

  ngOnInit() {
    this.playSub = this.play$
      .filter(_ => this.sheet !== undefined && this.sheet.data !== undefined)
      .map(_ => this.sheet.data)
      .switchMap(sections => {
        let events = [];
        for (let i = 0; i < sections.length; i++) {
          events.push(...sections[i]);
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

  ngOnChanges(changes) {
    if (changes.sheet !== undefined) {
      this.onSheetChange();
    }
  }

  ngOnDestroy() {
    if (this.playSub) this.playSub.unsubscribe();
  }

  play() {
    this.play$.next();
  }

  buffer(id) {
    if (this.buffers[id] === undefined) {
      this.brickSetvice.getBuffer(id).subscribe(buffer => {
        this.buffers[id] = buffer;
      });
    }
  }

  onSheetChange() {
    if (this.sheet === undefined || this.sheet.data === undefined) {
      return;
    }

    let data = this.sheet.data;
    for (let section of data) {
      for (let note of section) {
        if(note.id === 'START' || note.id === 'END'){
          continue;
        }
        this.buffer(note.id);
      }
    }
  }

  onDragStart() {
    this.dragging = true;
  }

  onDragEnd() {
    this.dragging = false;
  }
}
