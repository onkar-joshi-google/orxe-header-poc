import { Injectable } from '@angular/core';
import { MicroAppRouteConfig, OrxeRoute } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  private appRoutes: OrxeRoute[] = [];

  constructor() {
  }

  /**
   * Initializes the routes configuration and observed through angular router navigation events
   * @param routes microapp route configuration
   */
  initMicroAppRouter(routes: MicroAppRouteConfig[]): void {
    routes.forEach(parent => {
      parent.children.forEach(child => {
        const path = (parent.path + '/' + child.path);
        child.path = path;
        this.appRoutes.push(child);
      });
    });
  }

  getRouteConfig(): OrxeRoute[] {
    return this.appRoutes;
  }

}
