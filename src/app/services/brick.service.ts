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

  constructor(
    private http: Http
  ) { }

  get(ids: string[]): Observable<any> {
    return this.http.get('assets/bricks.json')
      .map(res => {
        let data = res.json();
        let enriched = ids.reduce((map, id) => {
          map[id] = data[id];
          return map;
        }, {});

        return enriched
      });
  }

}
