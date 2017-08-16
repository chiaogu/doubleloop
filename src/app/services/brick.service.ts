import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from "@angular/http";
import { AudioContext } from 'angular-audio-context';
import { Observable } from "rxjs/Observable";

export interface Brick {
  id: string;
  name: string;
  color: string;
  url: string;
}

@Injectable()
export class BrickService {

  brickCache;
  bufferCache = {};

  constructor(
    private http: Http,
    private audio: AudioContext
  ) { }

  get(id: string[] | string): Observable<any> {
    let stream;
    if (this.brickCache === undefined) {
      this.brickCache = {};
      stream = this.http.get('assets/bricks.json')
        .do(res => {
          this.brickCache = res.json();
        })
        .catch(e => {
          this.brickCache = undefined;
          return undefined;
        })
    } else {
      stream = Observable.of(0);
    }

    if (Array.isArray(id)) {
      return stream.map(_ => {
        let enriched = id.reduce((map, id) => {
          map[id] = this.brickCache[id];
          return map;
        }, {});

        return enriched
      });
    } else {
      return stream.map(_ => this.brickCache[id]);
    }
  }

  getBuffer(id): Observable<AudioBuffer> {
    let stream;
    if (this.bufferCache[id] === undefined) {
      stream = this.get(id)
        .switchMap(brick => this.http.get(brick.url, {
          responseType: ResponseContentType.ArrayBuffer
        }))
        .switchMap(res => new Promise<any>((resolve, reject) => {
          this.audio.decodeAudioData(res.arrayBuffer(), resolve, reject);
        }))
        .catch(e => Observable.empty())
        .do(buffer => {
          this.bufferCache[id] = buffer;
        });
    } else {
      stream = Observable.of(0);
    }

    return stream.map(_ => this.bufferCache[id]);
  }

}
