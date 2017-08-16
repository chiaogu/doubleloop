import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
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

  constructor(
    private http: Http
  ) { }

  get(ids: string[]): Observable<any> {
    let stream;
    if(this.brickCache === undefined){
      stream = this.http.get('assets/bricks.json').do(res => {
        this.brickCache = res.json();
      });
    }else {
      stream = Observable.of(0);
    }

    return stream.map(_ => {
        let enriched = ids.reduce((map, id) => {
          map[id] = this.brickCache[id];
          return map;
        }, {});

        return enriched
      });
  }

  // getBuffer(id): Observable<AudioBuffer> {
    // return Observable.of(this.brick)
    //   .filter(brick => brick !== undefined)
    //   .switchMap(brick => this.http.get(brick.url, {
    //     responseType: ResponseContentType.ArrayBuffer
    //   }))
    //   .switchMap(res => new Promise<any>((resolve, reject) => {
    //     this.audio.decodeAudioData(res.arrayBuffer(), resolve, reject);
    //   }))
    //   .catch(e => Observable.empty());
  // }

}
