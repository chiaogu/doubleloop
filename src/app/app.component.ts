import { Component, HostListener } from '@angular/core';
import { KeyboardService } from "./services/keyboard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private keyboard: KeyboardService
  ) {}

}
