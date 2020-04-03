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
  private _routeConfig: OrxeRoute[] = [];

  /**
   * Holds currentUrl, used to load relevant microapps
   */
  private _currentUrl: string;

  /**
   * Monitors microapp route changes
   */
  private _routeChangedSubject = new BehaviorSubject<OrxeRoute>(null);

  /**
   * Observable to emit microapp route changes into outlets
   */
  private _onRouteChanged$ = this._routeChangedSubject.asObservable();

  /**
   * TODO to be removed when global Router instance is available from common shared angular packages
   * Instance of microapp router
   */
  private _microAppRouter = new oxRouter();

  /**
   * Maintains list of subscriptions in the service
   */
  private _subscriptions = new Subscription();

  /**
   * Injects and provides required instances to RouterService
   * @param _ngRouter angular router instance to monitor URL changes
   * @param shellService shell service instance
   * @param ngLocation angular location instance to monitor `path` changes in browser back/forward navigation
   */
  constructor(
    private _ngRouter: Router,
    shellService: ShellService,
    ngLocation: Location
  ) {
    this._routeConfig = shellService.getRouteConfig();

    /**
     * Subscribe to page level URL changes & check if matches with microapp route configuration
     */
    const ngRouterSub = _ngRouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeFound = this._findRoute(event.urlAfterRedirects
          ? this._normalizeUrl(event.urlAfterRedirects)
          : this._normalizeUrl(event.url));

        if (routeFound) {
          this._updateCurrentUrl(routeFound.path);
          this._routeChangedSubject.next(routeFound);
        }
      }
    });
    this._subscriptions.add(ngRouterSub);

    /**
     * Callback function when back/forward navigation happens
     * Loads microapp based on path change
     */
    ngLocation.onUrlChange((url) => {
      const routeFound = this._findRoute(this._normalizeUrl(url));

      if (routeFound) {
        this._updateCurrentUrl(routeFound.path);
        this._routeChangedSubject.next(routeFound);
      }
    });


    /**
     * TODO to be removed when global Router instance is available from common shared angular packages
     * Helps navigating between microapps. Listens for route changes from microapps
     */
    const microappRouterSub = this._microAppRouter.onRouteChanged.subscribe((data) => {
      const url = this._normalizeUrl(data);
      const routeFound = this._findRoute(url);

      if (routeFound) {
        this._updateCurrentUrl(routeFound.path);
        this._routeChangedSubject.next(routeFound);
        ngLocation.go(url, this._normalizeParams(data));
      }
    });

    this._subscriptions.add(microappRouterSub);
  }

  /**
   * Used to load relevant microapps (eg. hotel deals)
   * @param outletName name of the outlet
   */
  getOutletApp(outletName: string): OrxeRoute {
    return this._routeConfig.find(route => {
      return route.outlet === outletName && route.path === this._currentUrl;
    });
  }

  /**
   * Triggers URL change in reaction to router-link element events
   * @param url
   */
  navigateTo(url) {
    this._ngRouter.navigate([url]);
  }

  /**
   * Returns route change observable. Used in outlets to load the microapp
   */
  onRouteChanged(): Observable<OrxeRoute> {
    return this._onRouteChanged$;
  }

  /**
   * Search and return requested microapp for a route
   * @param path
   */
  private _findRoute(path: string) {
    return this._routeConfig.find(route => route.path === path);
  }

  /**
   * TODO to be removed when global Router instance is available from common shared angular packages
   * Extracts actual route from the URL
   * @param url
   */
  private _normalizeUrl(url: string): string {
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
  private _normalizeParams(url: string) {
    if (url) {
      const pos = url.indexOf('?');
      return url.substr(pos, url.length - 1);
    }
  }

  /**
   * Sets currentUrl to browsers URL
   * @param url
   */
  private _updateCurrentUrl(url: string) {
    this._currentUrl = url;
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
