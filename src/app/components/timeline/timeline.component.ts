import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BrickService } from "../../services/brick.service";
import { AudioContext } from 'angular-audio-context';
import { Subject } from "rxjs/Subject";
import { DatabaseService } from "../../services/database.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { RATIO } from '../../const';
import { AnimFramePlayer } from "../../utils/animationFramePlayer";
import { IPlayer } from "../../utils/interfaces";

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

  player: IPlayer;

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
    this.player.stop();
  }

  ngOnChanges(changes) {
    if (changes.sheet !== undefined) {
      this.onSheetChange();
    }
  }

  toggle() {
    this.dragging = false;
    
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
    this.dragging = false;
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
