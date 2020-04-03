import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { Routes, RouterModule } from '@angular/router';
import { OrxeRouterModule } from 'shell-sdk';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ResultsComponent
  }
];

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrxeRouterModule
  ]
})
export class ResultsModule { }
