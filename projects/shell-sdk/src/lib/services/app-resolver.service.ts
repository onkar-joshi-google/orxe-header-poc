import { Injectable } from '@angular/core';
import { AppDependency, MicroApp } from '../interfaces';
import { Subject } from 'rxjs';
import { RouterService } from './router.service';
import { Registry } from '@orxe-sdk/registry/lib';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AppResolverService {
  private _microAppSet = new Map<string, MicroApp>();

  private _appResolverSubject = new Subject<MicroApp>();
  private _appResolver$ = this._appResolverSubject.asObservable();

  private _registrySubject = new Subject<boolean>();
  private _registryFetched$ = this._registrySubject.asObservable();


  constructor(
    private _routerService: RouterService,
    private _loader: LoaderService
  ) {
    this.getAllApps();

    Registry.getAppDependencies().subscribe((appDeps: AppDependency[]) => {
      this._loader.setGlobalDeps(appDeps);
    });

    this._loader.onDepsLoaded().subscribe(loaded => {
      if (1) {
        this._routerService.onRouteChanged().subscribe((route) => {
          this.resolveApp(route.tagName);
        });
      }
    });
  }

  /**
   * Once route is active, resolver finds the app from the list and updates the observable
   * @param appName
   */
  resolveApp(appName: string): void {
    if (this._microAppSet.get(appName)) {
      this._appResolverSubject.next(this._microAppSet.get(appName));
    }
  }

  /**
   * Returns Observable that streams active app
   */
  getAppResolved() {
    return this._appResolver$;
  }

  /**
   * Returns Observable to stream status of the registry fetch operation
   */
  onRegistryFetched() {
    return this._registryFetched$;
  }

  /**
   * Fetches all apps from Registry and creates a map for locating them later
   */
  getAllApps(): void {
    Registry.getApps().subscribe((apps: MicroApp[]) => {
      apps.forEach((app) => {
        this._microAppSet.set(app.name, app);
      });

      this._registrySubject.next(true);
    });
  }

}
