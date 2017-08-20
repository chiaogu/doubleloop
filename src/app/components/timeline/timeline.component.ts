import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BrickService } from "../../services/brick.service";
import { AudioContext } from 'angular-audio-context';
import { Subject } from "rxjs/Subject";
import { DatabaseService } from "../../services/database.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { RATIO } from '../../const';


class AnimFramePlayer {
  cursor: number = 0;
  notes: any[] = [];
  playing: boolean = false;

  preTime: number;
  progress: number = 0;

  buffers: any;
  audio: AudioContext;

  onStateChange: (event) => void;

  constructor(audio: AudioContext, buffers: any) {
    this.audio = audio;
    this.buffers = buffers;
  }

  setNotes(notes: any[]) {
    this.notes = notes;
  }

  play() {
    this.preTime = new Date().getTime();
    this.playing = true;
    this.tick();

    this.output('play');
  }

  pause() {
    this.playing = false;

    this.output('pause');
  }

  stop() {
    this.playing = false;
    this.progress = 0;
    this.cursor = 0;

    this.output('stop');
  }

  toggle() {
    this.playing = !this.playing;
    if (this.playing) {
      this.play();
    } else {
      this.pause();
    }
  }

  output(event) {
    if (this.onStateChange) {
      this.onStateChange(event);
    }
  }

  tick() {
    let now = new Date().getTime();
    let duration = now - this.preTime;
    this.progress += duration;
    this.preTime = now;

    let next = this.notes[this.cursor].time;
    if (this.progress >= next) {
      let buffer = this.buffers[this.notes[this.cursor].id];
      if (buffer !== undefined) {
        let bufferSource = this.audio.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.connect(this.audio.destination);
        bufferSource.start(0);
      }

      this.cursor++;
    }

    if (this.cursor >= this.notes.length) {
      this.stop();
    }

    if (this.playing) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('scroller') scroller;
  @Output() stateChange = new EventEmitter();
  @Input() readOnly = false;
  @Input() sheet;
  RATIO = RATIO;

  buffers = {};
  listRecycled = [];
  dragging = false;

  player: AnimFramePlayer;

  scrollLeft: number = 0;
  scrollListener = event => {
    this.scrollLeft = this.scroller.nativeElement.scrollLeft;
  };

  constructor(
    private brickSetvice: BrickService,
    private audio: AudioContext
  ) {
    this.player = new AnimFramePlayer(audio, this.buffers);
    this.player.onStateChange = event => {
      this.stateChange.next(event);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scroller.nativeElement.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    this.scroller.nativeElement.removeEventListener('scroll', this.scrollListener);
  }

  ngOnChanges(changes) {
    if (changes.sheet !== undefined) {
      this.onSheetChange();
    }
  }

  toggle() {
    let data = this.sheet.data;
    let notes = [];
    let offset = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        let note = Object.assign({}, data[i][j]);
        note.time += offset;
        notes.push(note);
        if (j === data[i].length - 1) {
          offset = note.time;
        }
      }
    }

    this.player.setNotes(notes);
    this.player.toggle();
  }

  stop() {
    this.player.stop();
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
        if (note.id === 'START' || note.id === 'END') {
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
