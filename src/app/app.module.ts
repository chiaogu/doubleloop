import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AudioContextModule } from 'angular-audio-context';
import { DndModule } from 'ng2-dnd';
import { AngularFireModule } from 'angularfire2';

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
import { environment } from "../environments/environment";
import { DatabaseService } from "./services/database.service";
import { AngularFireDatabaseModule } from "angularfire2/database";

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
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
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
    ConfigService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
