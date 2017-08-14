import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from "./pages/main/main.component";
import { BrickComponent } from "./components/brick/brick.component";
import { BoardComponent } from './components/board/board.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
