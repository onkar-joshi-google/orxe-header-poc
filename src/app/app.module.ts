import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShellSdkModule, OrxeRouterModule, OrxeRoute } from 'shell-sdk';

const microappRoutes: OrxeRoute[] = [
  {
    path: '/',
    tagName: 'app-header'
  },
  {
    path: 'hotel',
    tagName: 'app-hotel'
  },
  {
    path: 'flight',
    tagName: 'app-flight'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
