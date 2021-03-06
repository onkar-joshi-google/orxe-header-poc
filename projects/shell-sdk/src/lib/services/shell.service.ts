import { Injectable } from '@angular/core';
import { MicroAppRouteConfig, OrxeRoute, AppConfig } from '../interfaces';
import { AppState } from '@orxe-sdk/app-state';
import { AppResolverService } from './app-resolver.service';
import { Registry } from '@orxe-sdk/registry';
import { Logger } from '@orxe-sdk/logging';

import { RouterService } from './router.service';
import { ApiEndpoints } from '../core.constants';
@Injectable({
  providedIn: 'root'
})
export class ShellService {
  private _appRoutes: OrxeRoute[] = [];
  private _appConfig: AppConfig;

  constructor(
    private _appResolver: AppResolverService,
    private _routerService: RouterService
  ) {
  }

  /**
   * Initializes the routes configuration and observed through angular router navigation events
   * @param routes microapp route configuration
   */
  setup(routes: MicroAppRouteConfig[], appConfig: AppConfig): void {
    routes.forEach(parent => {
      parent.children.forEach(child => {
        const path = (parent.path + '/' + child.path);
        child.path = path;
        this._appRoutes.push(child);
      });
    });

    this._appConfig = appConfig;

    this._routerService.setMicroappConfig(this._appRoutes);
  }

  initCoreSDK(sessionId: string) {
    // initialize the AppState SDK
    AppState.init({
      prefix: 'orxe',
      allowNull: false
    });
    // set sesionId in AppState, this is used by other SDKs internally
    AppState.set('sessionId', sessionId);

    // initialize the Registry SDK with endpoint
    Registry.init(this._appConfig.baseUrl + ApiEndpoints.REGISTRY);

    // initialize the Logging SDK with endpoint
    Logger.init(this._appConfig.baseUrl + ApiEndpoints.LOGGING);

    this._appResolver.getAllApps();
  }

  getRouteConfig(): OrxeRoute[] {
    return this._appRoutes;
  }

}
