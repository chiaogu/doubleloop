import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AudioContextModule } from 'angular-audio-context';
import { DndModule } from 'ng2-dnd';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MdDialogModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from "./pages/main/main.component";
import { BrickComponent } from "./components/brick/brick.component";
import { BoardComponent } from './components/board/board.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SectionComponent } from './components/section/section.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SaveSheetDialogComponent } from './components/save-sheet-dialog/save-sheet-dialog.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SheetDialogComponent } from './components/sheet-dialog/sheet-dialog.component';

import { BrickService } from './services/brick.service';
import { ConfigService } from './services/config.service';
import { DatabaseService } from "./services/database.service";

import { environment } from "../environments/environment";
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
import { SaveSheetSuccessDialogComponent } from './components/save-sheet-success-dialog/save-sheet-success-dialog.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'explore',
    component: ExploreComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    AudioContextModule,
    DndModule.forRoot(),
    MdProgressSpinnerModule,
    BrowserAnimationsModule,
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
    SectionComponent,
    ExploreComponent,
    NavigationComponent,
    SaveSheetDialogComponent,
    SheetComponent,
    SheetDialogComponent,
    SaveSheetSuccessDialogComponent
  ],
  entryComponents: [
    SheetDialogComponent,
    SaveSheetDialogComponent,
    SaveSheetSuccessDialogComponent
  ],
  providers: [
    BrickService,
    ConfigService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
