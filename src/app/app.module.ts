import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from "./pages/main/main.component";
import { BrickComponent } from "./components/brick/brick.component";
import { BoardComponent } from './components/board/board.component';

import { BrickService } from './services/brick.service';
import { ConfigService } from './services/config.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/shareReplay';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BrickComponent,
    MainComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BrickService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
