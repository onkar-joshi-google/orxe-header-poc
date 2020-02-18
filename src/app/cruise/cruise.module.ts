import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CruiseComponent } from './cruise/cruise.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CruiseComponent
  }
];

@NgModule({
  declarations: [CruiseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CruiseModule { }
