import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppResolverService } from 'shell-sdk';
import { Subscription } from 'rxjs';
import { DEFAULT_ROUTE } from '../orxe-routes';
@Component({
  selector: 'app-landing',
  template: ''
})
export class LandingComponent implements OnDestroy {

  private _registrySub: Subscription = new Subscription();

  constructor(
    appResolver: AppResolverService,
    ngRouter: Router
  ) {
    this._registrySub = appResolver.onRegistryFetched().subscribe((status) => {
      if (status) {
        ngRouter.navigate([DEFAULT_ROUTE]);
      }
    });
  }

  ngOnDestroy(): void {
    this._registrySub.unsubscribe();
  }
}
