import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
