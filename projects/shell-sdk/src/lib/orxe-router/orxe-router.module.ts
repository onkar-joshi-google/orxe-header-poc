import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { RouterLinkComponent } from './router-link/router-link.component';

@NgModule({
  declarations: [
    RouterOutletComponent,
    RouterLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RouterOutletComponent,
    RouterLinkComponent
  ]
})
export class OrxeRouterModule { }
