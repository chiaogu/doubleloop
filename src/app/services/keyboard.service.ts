import { Injectable, NgZone } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class KeyboardService {
  keydown$: Subject<KeyboardEvent> = new Subject();
  keyup$: Subject<KeyboardEvent> = new Subject();

  constructor(
    private ngZone: NgZone
  ) {
    window.addEventListener("keydown", event => {
      this.keydown$.next(event);
    });
    window.addEventListener("keyup", event => {
      this.keyup$.next(event);
    });
  }

}
