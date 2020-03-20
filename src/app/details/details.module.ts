import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { Routes, RouterModule } from '@angular/router';
import { OrxeRouterModule } from 'shell-sdk';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrxeRouterModule
  ]
})
export class DetailsModule { }
