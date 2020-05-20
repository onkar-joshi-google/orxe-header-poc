import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

import { ShellSdkModule } from 'shell-sdk';
import { microAppRoutes } from './orxe-routes';
import { CoreModule } from '@orxe-core/core.module';
import { environment } from '@env/environment';
import { SharedModule } from '@orxe-shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ShellSdkModule.forMicroApps({ routeConfigs: microAppRoutes, appConfig: { baseUrl: environment.baseUrl } })
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
