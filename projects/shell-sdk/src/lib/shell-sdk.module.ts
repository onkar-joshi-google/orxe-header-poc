import { NgModule, Optional, SkipSelf, ModuleWithProviders, Inject } from '@angular/core';
import { OrxeRouterModule } from './orxe-router/orxe-router.module';
import { ShellService, RouterService, DomService, AppResolverService } from './services';
import { OrxeModuleOptions, MicroAppRouteConfig, AppConfig, ROUTER_CONFIGS, APP_CONFIG } from './interfaces';

@NgModule({
  imports: [
    OrxeRouterModule
  ],
  exports: [
    OrxeRouterModule
  ],
  providers: [
    RouterService,
    AppResolverService,
    DomService,
    ShellService
  ]
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
    @Inject(APP_CONFIG) appConfig: AppConfig,
    shellService: ShellService
  ) {
    if (parentModule) {
      throw new Error('Shell Module is already loaded. Import it in AppModule only.');
    }

    /**
     * Throw error if baseURL is not provided by the main application.
     */
    if (!appConfig.baseUrl) {
      throw new Error('AppConfig is invalid. baseURL is not provided.');
    }

    /**
     * Set microapp configuration in ShellService.
     * RouterModule gets the configuration from ShellService
     */
    if (routes.length) {
      shellService.setup(routes, appConfig);
    }

  }

  /**
   * Define microapp static route configuration. Route changes are observed and based on that microapps are loaded.
   * @param options route configuration with microapps
   */
  static forMicroApps(options: OrxeModuleOptions): ModuleWithProviders<OrxeRouterModule> {
    return {
      ngModule: ShellSdkModule,
      providers: [
        {
          provide: ROUTER_CONFIGS,
          useValue: options && options.routeConfigs ? options.routeConfigs : [],
          multi: false
        },
        {
          provide: APP_CONFIG,
          useValue: options && options.appConfig ? options.appConfig : null,
          multi: false
        }
      ]
    };
  }
}
