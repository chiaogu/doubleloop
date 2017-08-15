import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

export interface Config {
  row: number;
  column: number;
  bricks: any;
}

@Injectable()
export class ConfigService {

  constructor(
    private http: Http
  ) { }

  get(): Observable<Config> {
    return this.http.get('assets/config.json').map(res => res.json());
  }

}
