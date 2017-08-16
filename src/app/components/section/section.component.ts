import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BrickService } from "../../services/brick.service";

const RATIO = 0.1;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, OnChanges {
  @Input() section;

  width = 0;

  noteWidth = 1000 * RATIO;

  constructor(
    private brickService: BrickService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.section !== undefined) {
        let last = this.section[this.section.length - 1];
        this.width = (last.time - this.section[0].time) * RATIO;

        for(let note of this.section){
          if(note.id === 'START' || note.id === 'END'){
            continue;
          }

          note.left = note.time * RATIO + 'px';

          this.brickService.get(note.id).subscribe(brick => {
            note.brick = brick;
          });
        }
    }
  }

}
