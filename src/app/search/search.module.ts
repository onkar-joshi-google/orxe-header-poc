import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { Routes, RouterModule } from '@angular/router';
import { OrxeRouterModule } from 'shell-sdk';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrxeRouterModule
  ]
})
export class SearchModule { }
