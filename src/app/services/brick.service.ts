import { Injectable } from '@angular/core';

export interface Brick {
  id: string;
  name: string;
  color: string;
  url: string;
}

const data = {
  '0001': {
    id: '0001',
    name: 'acoustic-snare',
    color: '#ff0000',
    url: 'assets/sounds/acoustic-snare.mp3'
  }
}

@Injectable()
export class BrickService {

  constructor() { }

  get(ids: string[]): Promise<any> {
    return Promise.resolve(ids.reduce((map, id) => {
      map[id] = data[id];
      return map;
    }, {}));
  }

}
