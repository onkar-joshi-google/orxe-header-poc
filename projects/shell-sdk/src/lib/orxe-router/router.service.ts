import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Router as oxRouter } from 'orxe3-router/dist/lib/router';
import { ShellService } from '../shell.service';
import { OrxeRoute } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RouterService implements OnDestroy {

  /**
   * App level routes configuration
   */
  private routeConfig: OrxeRoute[] = [];

  /**
   * Holds currentUrl, used to load relevant microapps
   */
  private currentUrl: string;

  /**
   * Monitors microapp route changes
   */
  private routeChangedSubject = new BehaviorSubject<OrxeRoute>(null);

  /**
   * Observable to emit microapp route changes into outlets
   */
  private onRouteChanged$ = this.routeChangedSubject.asObservable();

  /**
   * TODO to be removed when global Router instance is available from common shared angular packages
   * Instance of microapp router
   */
  private microAppRouter = new oxRouter();

  /**
   * Maintains list of subscriptions in the service
   */
  private subscriptions = new Subscription();

  /**
   * Injects and provides required instances to RouterService
   * @param ngRouter angular router instance to monitor URL changes
   * @param shellService shell service instance
   * @param ngLocation angular location instance to monitor `path` changes in browser back/forward navigation
   */
  constructor(
    private ngRouter: Router,
    shellService: ShellService,
    ngLocation: Location
  ) {
    this.routeConfig = shellService.getRouteConfig();

    /**
     * Subscribe to page level URL changes & check if matches with microapp route configuration
     */
    const ngRouterSub = ngRouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeFound = this.findRoute(event.urlAfterRedirects
          ? this.normalizeUrl(event.urlAfterRedirects)
          : this.normalizeUrl(event.url));

        if (routeFound) {
          this.updateCurrentUrl(routeFound.path);
          this.routeChangedSubject.next(routeFound);
        }
      }
    });
    this.subscriptions.add(ngRouterSub);

    /**
     * Callback function when back/forward navigation happens
     * Loads microapp based on path change
     */
    ngLocation.onUrlChange((url) => {
      const routeFound = this.findRoute(this.normalizeUrl(url));

      if (routeFound) {
        this.updateCurrentUrl(routeFound.path);
        this.routeChangedSubject.next(routeFound);
      }
    });


    /**
     * TODO to be removed when global Router instance is available from common shared angular packages
     * Helps navigating between microapps. Listens for route changes from microapps
     */
    const microappRouterSub = this.microAppRouter.onRouteChanged.subscribe((data) => {
      const url = this.normalizeUrl(data);
      const routeFound = this.findRoute(url);

      if (routeFound) {
        this.updateCurrentUrl(routeFound.path);
        this.routeChangedSubject.next(routeFound);
        ngLocation.go(url, this.normalizeParams(data));
      }
    });

    this.subscriptions.add(microappRouterSub);
  }

  /**
   * Used to load relevant microapps (eg. hotel deals)
   * @param outletName name of the outlet
   */
  getOutletApp(outletName: string): OrxeRoute {
    return this.routeConfig.find(route => {
      return route.outlet === outletName && route.path === this.currentUrl;
    });
  }

  /**
   * Triggers URL change in reaction to router-link element events
   * @param url
   */
  navigateTo(url) {
    this.ngRouter.navigate([url]);
  }

  /**
   * Returns route change observable. Used in outlets to load the microapp
   */
  onRouteChanged(): Observable<OrxeRoute> {
    return this.onRouteChanged$;
  }

  /**
   * Search and return requested microapp for a route
   * @param path
   */
  private findRoute(path: string) {
    return this.routeConfig.find(route => route.path === path);
  }

  /**
   * TODO to be removed when global Router instance is available from common shared angular packages
   * Extracts actual route from the URL
   * @param url
   */
  private normalizeUrl(url: string): string {
    if (url) {
      const pos = url.indexOf('?');
      if (pos > -1) {
        return url.substr(0, pos);
      } else {
        return url;
      }
    }
  }

  /**
   * TODO to be removed when global Router instance is available from common shared angular packages
   * Extracts route params
   * @param url
   */
  private normalizeParams(url: string) {
    if (url) {
      const pos = url.indexOf('?');
      return url.substr(pos, url.length - 1);
    }
  }

  /**
   * Sets currentUrl to browsers URL
   * @param url
   */
  private updateCurrentUrl(url: string) {
    this.currentUrl = url;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
