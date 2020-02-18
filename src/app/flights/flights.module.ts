import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight/flight.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FlightComponent
  }
];

@NgModule({
  declarations: [FlightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FlightsModule { }
