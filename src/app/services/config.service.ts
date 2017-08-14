import { Injectable } from '@angular/core';

export interface Config {
  row: number;
  column: number;
  bricks: any;
}

@Injectable()
export class ConfigService {

  constructor() { }

  get(): Promise<Config> {
    return Promise.resolve({
      row: 4,
      column: 4,
      bricks: {
        '0,0': '0001'
      }
    });
  }

}
