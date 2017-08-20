import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from "@angular/http";
import { AudioContext } from 'angular-audio-context';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface Brick {
  id: string;
  name: string;
  color: string;
  url: string;
}

@Injectable()
export class BrickService {

  deferBricks = new BehaviorSubject(undefined);
  bufferCache = {};

  constructor(
    private http: Http,
    private audio: AudioContext
  ) {
    this.http.get('assets/bricks.json')
      .subscribe(res => {
        this.deferBricks.next(res.json());
      });
  }

  get(id: string[] | string): Observable<any> {
    let stream = this.deferBricks
      .filter(bricks => bricks !== undefined && bricks !== null)
      .take(1);

    if (Array.isArray(id)) {
      return stream.map(bricks => {
        let enriched = id.reduce((map, id) => {
          map[id] = bricks[id];
          return map;
        }, {});

        return enriched
      });
    } else {
      return stream.map(bricks => bricks[id]);
    }
  }

  getBuffer(id): Observable<AudioBuffer> {
    let stream;
    if (this.bufferCache[id] === undefined) {
      stream = this.get(id)
        .switchMap(brick => this.http.get(brick.url, {
          responseType: ResponseContentType.ArrayBuffer
        }))
        .map(res => res.arrayBuffer())
        .filter(buffer => buffer !== undefined)
        .switchMap(buffer => new Promise<any>((resolve, reject) => {
          this.audio.decodeAudioData(buffer, resolve, reject);
        }))
        .catch(e => this.getBuffer(id))
        .do(buffer => {
          this.bufferCache[id] = buffer;
        });
    } else {
      stream = Observable.of(0);
    }

    return stream.map(_ => this.bufferCache[id]);
  }

}
