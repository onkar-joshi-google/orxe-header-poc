import { NgModule, Optional, SkipSelf, ModuleWithProviders, Inject } from '@angular/core';
import { OrxeRouterModule } from './orxe-router/orxe-router.module';
import { DomService } from './utils/dom.utils';
import { ShellService } from './shell.service';
import { OrxeRouterModuleOptions, MicroAppRouteConfig } from './interfaces';
import { ROUTER_CONFIGS } from './interfaces/router.tokens';

@NgModule({
  imports: [OrxeRouterModule],
  exports: [OrxeRouterModule],
  providers: [DomService, ShellService]
})
export class ShellSdkModule {

  /**
   * ShellSDKModule should be loaded only once at application level.
   * @param parentModule already loaded ShellSDKModule
   * @param routes injected microapp route configuration
   * @param shellService a root level service that provide common functionality
   */
  constructor(
    @Optional() @SkipSelf() parentModule: ShellSdkModule,
    @Inject(ROUTER_CONFIGS) routes: MicroAppRouteConfig[],
    shellService: ShellService
  ) {
    if (parentModule) {
      throw new Error('Shell Module is already loaded. Import it in AppModule only.');
    }

    shellService.initMicroAppRouter(routes);
  }

  /**
   * Define microapp static route configuration. Route changes are observed and based on that microapps are loaded.
   * @param options route configuration with microapps
   */
  static forMicroApps(options: OrxeRouterModuleOptions): ModuleWithProviders<OrxeRouterModule> {
    return {
      ngModule: ShellSdkModule,
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
