import { Component, OnInit, Input, OnChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
import { Observable } from "rxjs/Observable";
import { Http, ResponseContentType } from "@angular/http";
import { IAudioBufferSourceNode } from "standardized-audio-context/build/esm/interfaces";
import { BrickService, Brick } from "../../services/brick.service";

export interface BrickPressEvent {
  brick: Brick,
  time: Date
}

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit, OnChanges {
  @Input() brick: any;
  @Output() brickPress: EventEmitter<BrickPressEvent> = new EventEmitter();

  buffer: AudioBuffer;
  bufferSource: IAudioBufferSourceNode;

  pressed: boolean = false;

  constructor(
    private audio: AudioContext,
    private brickService: BrickService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.brick !== undefined) {
      Observable.of(this.brick)
        .filter(brick => brick !== undefined)
        .switchMap(brick => this.brickService.getBuffer(brick.id))
        .subscribe(buffer => {
          this.buffer = buffer;
        });
    }
  }

  @HostListener('mousedown', ['$event'])
  onPress(event) {
    if (this.buffer === undefined) {
      console.log('loading');
      return;
    }
    this.pressed = true;

    if (this.bufferSource !== undefined) {
      this.bufferSource.stop();
    }
    this.bufferSource = this.audio.createBufferSource();
    this.bufferSource.buffer = this.buffer;
    this.bufferSource.connect(this.audio.destination);
    this.bufferSource.start(0);

    this.brickPress.next({
      brick: this.brick,
      time: new Date()
    });
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mousemove', ['$event'])
  onRelease(event) {
    this.pressed = false;
  }
}
