import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as deepcopy from 'deepcopy';

export interface Config {
  row: number;
  column: number;
  bricks: any;
  keys: any;
}

@Injectable()
export class ConfigService {

  deferConfig = new BehaviorSubject(undefined);

  constructor(
    private http: Http
  ) {
    this.http.get('assets/config.json')
      .subscribe(res => {
        this.deferConfig.next(res.json());
      });
   }

  get(): Observable<Config> {
    return this.deferConfig
      .filter(config => config !== undefined && config !== null)
      .map(config => deepcopy(config))
      .take(1);
  }

}
