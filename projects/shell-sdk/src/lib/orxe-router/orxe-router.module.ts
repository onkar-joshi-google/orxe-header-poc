import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { OrxeRoute } from '../interfaces';
import { ROUTER_CONFIGS } from '../interfaces/router.tokens';
import { RouterService } from './router.service';
import { RouterLinkComponent } from './router-link/router-link.component';

@NgModule({
  declarations: [
    RouterOutletComponent,
    RouterLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RouterOutletComponent, RouterLinkComponent],
  providers: [RouterService]
})
export class OrxeRouterModule {
  static forMircroapps(options: OrxeRouterModuleOptions): ModuleWithProviders {
    return {
      ngModule: OrxeRouterModule,
      providers: [
        {
          provide: ROUTER_CONFIGS,
          useValue: options && options.routeConfigs ? options.routeConfigs : [],
          multi: false
        }
      ]
    };
  }
}

export interface OrxeRouterModuleOptions {
  routeConfigs?: OrxeRoute[];
};
