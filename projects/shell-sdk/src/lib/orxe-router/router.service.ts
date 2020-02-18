import { Injectable, Optional, Inject } from '@angular/core';
import { ROUTER_CONFIGS } from '../interfaces/router.tokens';
import { OrxeRoute } from '../interfaces';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private routeConfig: OrxeRoute[] = [];
  private routeChangedSubject = new BehaviorSubject<OrxeRoute>(null);
  private onRouteChanged$ = this.routeChangedSubject.asObservable();

  private currentUrl: string;

  constructor(
    @Optional() @Inject(ROUTER_CONFIGS) private routes: OrxeRoute[],
    private router: Router,
    private location: Location
  ) {
    this.routeConfig = routes;

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeFound = this.findRoute(event.url);

        if (routeFound) {
          console.log('Found matching path in Route[]');
          this.currentUrl = event.url;
          this.routeChangedSubject.next(routeFound);
        }
      }
    });
  }

  addRouteConfig(config: OrxeRoute[]) {
    this.routeConfig = config;
  }

  navigateTo(url: string) {
    this.location.go(this.currentUrl + url);
  }

  onRouteChanged(): Observable<OrxeRoute> {
    return this.onRouteChanged$;
  }

  getCurrentUrl(): string {
    return this.currentUrl;
  }

  private findRoute(path: string): OrxeRoute {
    return this.routeConfig.find(config => config.path === path);
  }
}
