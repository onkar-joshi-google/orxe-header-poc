import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel/hotel.component';
import { Routes, RouterModule } from '@angular/router';
import { microappRoutes } from './orxe-route';
import { ShellSdkModule, OrxeRouterModule } from 'shell-sdk';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HotelComponent
  }
];

@NgModule({
  declarations: [HotelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShellSdkModule,
    OrxeRouterModule.forMircroapps({ routeConfigs: microappRoutes }),
  ]
})
export class HotelsModule { }
