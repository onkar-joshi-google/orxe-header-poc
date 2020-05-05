import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CultureModule } from '@orxe-culture/angular';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CultureModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
