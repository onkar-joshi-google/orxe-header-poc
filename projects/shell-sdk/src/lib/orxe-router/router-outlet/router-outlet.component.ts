import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { RouterService } from '../router.service';
import { DomService } from '../../utils/dom.utils';

import { apps } from '../../app-list';

@Component({
  selector: 'orxe-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
/**
 * Generates a outlet element that hosts the microapps in a page
 */
export class RouterOutletComponent implements OnInit, OnDestroy {

  /**
   * Used to assign a name to the outlet instance
   */
  @Input() name = 'default';

  /**
   * Reference container into which microapp is injected
   */
  @ViewChild('content', { static: true }) content: ElementRef;

  /**
   * Subscription for OrxeRouter change events
   */
  private routeChangeSub = null;

  /**
   * Injects required services and sets up observers for route changes to load microapps
   * @param routerService OrxeRouter service monitors route changes for outlets
   * @param domService DomService used to inject scripts and microapp tags
   */
  constructor(private routerService: RouterService, private domService: DomService) {
    this.routeChangeSub = routerService.onRouteChanged().subscribe(route => {
      if (route && this.name === 'default') {
        this.loadMicroApp(route);
      }

      if (this.name !== 'default') {
        const appRoute = this.routerService.getOutletApp(this.name);
        if (appRoute) {
          this.loadMicroApp(appRoute);
        }
      }
    });
  }


  ngOnInit() { }

  /**
   * Injects microapp bundle and tag into the DOM
   * @param route a requested route for which microapp needs to be loaded
   */
  loadMicroApp(route) {
    if (this.content) {
      this.domService.insertElement(this.content, route.tagName);
      const appFound = apps.find((app) => app.appName === route.tagName);
      if (appFound) {
        this.domService.insertScript(appFound.src, this.content);
      }
    }
  }

  /**
   * Clean ups the subscriptions
   */
  ngOnDestroy() {
    this.routeChangeSub.unsubscribe();
  }
}
