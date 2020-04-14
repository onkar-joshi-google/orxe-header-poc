import { Injectable } from '@angular/core';
import { AppDependency, Status } from '../interfaces';
import { Subject } from 'rxjs';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _globalDeps: AppDependency[] = [];

  private _depLoadSubject = new Subject();
  private _depsLoaded$ = this._depLoadSubject.asObservable();

  constructor(
    private _domService: DomService
  ) { }

  /**
   * Starts loading application dependencies
   * @param globalDeps array of application dependencies
   */
  setGlobalDependencies(globalDeps: AppDependency[]) {
    if (globalDeps) {
      globalDeps.forEach(dep => {
        dep.status = Status.LOADING;
      });
      this._globalDeps = globalDeps;

      if (this._globalDeps.length) {
        this._injectGlobalDeps();
      } else {
        this._depLoadSubject.next(true);
      }
    } else {
      this._depLoadSubject.next(true);
    }
  }

  /**
   * Returns global dependency Observable. Microapps are loaded only after this streams `TRUE`
   */
  onDependenciesLoaded() {
    return this._depsLoaded$;
  }

  /**
   * Inject global dependencies in the HEAD tag
   */
  private _injectGlobalDeps() {
    const headTag = document.getElementsByTagName('head')[0];
    this._globalDeps.forEach(element => {
      const scriptEl = this._getDepElement(element);
      scriptEl.onload = () => this.onDepStateChanged(element);
      headTag.appendChild(scriptEl);
    });

    this._depLoadSubject.next(true);
  }

  /**
   * Callback function, gets called when a dependency is loaded in the browser
   * @param appDependency dependency, loaded in the browser
   */
  onDepStateChanged(appDependency: AppDependency) {
    appDependency.status = Status.LOADED;
    this._updateGlobalDepState();
  }

  /**
   * Update the application wide dependency state
   */
  private _updateGlobalDepState() {
    const isAppLoading = this._globalDeps.find(({ status }) => status === Status.LOADING);
    this._depLoadSubject.next(!isAppLoading);
  }

  /**
   * Creates and returns the tag, for `scripts` or `link`
   * @param appDependency
   */
  private _getDepElement(appDependency: AppDependency) {
    switch (appDependency.type) {
      case 'script':
        return this._domService.createElement(appDependency.type, { type: 'application/javascript', src: appDependency.src });
      case 'link':
        return this._domService.createElement(appDependency.type, { rel: 'stylesheet', href: appDependency.src });
    }
  }
}
