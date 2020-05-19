import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { CultureModule } from '@orxe-culture/angular';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    CultureModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
