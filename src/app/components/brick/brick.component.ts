import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
import { Observable } from "rxjs/Observable";
import { Http, ResponseContentType } from "@angular/http";
import { IAudioBufferSourceNode } from "standardized-audio-context/build/esm/interfaces";
import { Brick } from "../../services/brick.service";

export interface BrickClickEvent {
  brick: Brick,
  time: Date
}

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit, OnChanges {
  @Input() brick;
  @Input() press = new EventEmitter();

  buffer: AudioBuffer;
  bufferSource: IAudioBufferSourceNode;

  constructor(
    private audio: AudioContext,
    private http: Http
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.brick !== undefined) {
      Observable.of(this.brick)
        .filter(brick => brick !== undefined)
        .switchMap(brick => this.http.get(brick.url, { 
          responseType: ResponseContentType.ArrayBuffer 
        }))
        .switchMap(res => new Promise<any>((resolve, reject) => {
          this.audio.decodeAudioData(res.arrayBuffer(), resolve, reject);
        }))
        .catch(e => Observable.empty())
        .filter(buffer => buffer !== undefined)
        .subscribe(buffer => {
          this.buffer = buffer;
        })
    }
  }


  click() {
    if (this.buffer === undefined) {
      console.log('loading');
      return;
    }

    if(this.bufferSource !== undefined){
      this.bufferSource.stop();
    }
    this.bufferSource = this.audio.createBufferSource();
    this.bufferSource.buffer = this.buffer;
    this.bufferSource.connect(this.audio.destination);
    this.bufferSource.start(0);
  }

}
