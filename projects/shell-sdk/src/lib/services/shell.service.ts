import { Injectable } from '@angular/core';
import { MicroAppRouteConfig, OrxeRoute, AppConfig } from '../interfaces';
import { AppState } from '@orxe-sdk/app-state';
import { AppResolverService } from './app-resolver.service';
import { Registry } from '@orxe-sdk/registry';
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
    AppState.init({
      prefix: 'orxe',
      allowNull: false
    });
    AppState.set('sessionId', sessionId);

    Registry.init(this._appConfig.endpoint + ApiEndpoints.REGISTRY);

    this._appResolver.getAllApps();
  }

  getRouteConfig(): OrxeRoute[] {
    return this._appRoutes;
  }

}
