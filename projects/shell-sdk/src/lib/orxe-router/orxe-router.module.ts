import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { RouterService } from './router.service';
import { RouterLinkComponent } from './router-link/router-link.component';
import { DomService } from '../utils/dom.utils';

@NgModule({
  declarations: [
    RouterOutletComponent,
    RouterLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RouterOutletComponent, RouterLinkComponent],
  providers: [RouterService, DomService]
})
export class OrxeRouterModule { }
