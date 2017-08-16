import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AudioContextModule } from 'angular-audio-context';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { MainComponent } from "./pages/main/main.component";
import { BrickComponent } from "./components/brick/brick.component";
import { BoardComponent } from './components/board/board.component';

import { BrickService } from './services/brick.service';
import { ConfigService } from './services/config.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/shareReplay';
import 'hammerjs';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SectionComponent } from './components/section/section.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    AudioContextModule,
    DndModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    BrickComponent,
    MainComponent,
    BoardComponent,
    TimelineComponent,
    SectionComponent
  ],
  providers: [
    BrickService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
