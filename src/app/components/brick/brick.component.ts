import { Component, OnInit, Input, OnChanges, EventEmitter, Output, HostListener, OnDestroy, NgZone } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
import { Observable } from "rxjs/Observable";
import { Http, ResponseContentType } from "@angular/http";
import { IAudioBufferSourceNode } from "standardized-audio-context/build/esm/interfaces";
import { BrickService } from "../../services/brick.service";
import { KeyboardService } from "../../services/keyboard.service";
import { BrickPressEvent } from "../../utils/interfaces";

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit, OnDestroy, OnChanges {
  @Input() brick: any;
  @Output() brickPress: EventEmitter<BrickPressEvent> = new EventEmitter();

  buffer: AudioBuffer;
  bufferSource: IAudioBufferSourceNode;

  pressed: boolean = false;

  keyupSub;
  keydownSub;

  constructor(
    private audio: AudioContext,
    private brickService: BrickService,
    private keyboard: KeyboardService,
    private ngZone: NgZone
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
          this.subscribeKeyEvent();
        });
    }
  }

  subscribeKeyEvent() {
    this.keydownSub = this.keyboard.keydown$
      .filter(event => event.code === this.brick.key)
      .subscribe(e => {
        this.onPress();
      });

    this.keyupSub = this.keyboard.keyup$
      .filter(event => event.code === this.brick.key)
      .subscribe(e => {
        this.onRelease();
      });
  };

  ngOnDestroy() {
    if (this.keydownSub) this.keydownSub.unsubscribe();
    if (this.keyupSub) this.keyupSub.unsubscribe();
  }

  @HostListener('touchstart', ['$event'])
  onTouchDown(event) {
    event.preventDefault();
    this.onPress();
  }

  @HostListener('touchcancel', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchmove', ['$event'])
  onTouchUp(event) {
    this.onRelease();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.onPress();
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mousemove', ['$event'])
  onMouseUp(event){
    this.onRelease();
  }

  onPress() {
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

  onRelease() {
    this.pressed = false;
  }
}
