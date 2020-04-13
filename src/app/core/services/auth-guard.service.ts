import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpHeaders } from '@orxe-sdk/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShellService } from 'shell-sdk';
import { HttpService } from './http.service';

import {SESSION_REQUEST} from '../dummy-session-request.data';


@Injectable()
export class AuthGuardService implements CanActivate {
  private readonly _createSessionUrl = '/api/orxe/user/session/create';
  private readonly _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
  });

  constructor(
    private _http: HttpService,
    private _shellService: ShellService
  ) { }

  /**
   * Creates a temporary sessionId needed by other SDKs to work.
   * TODO to be removed from production and development when Site Launcher is ready
   */
  canActivate(): Observable<boolean> {
    console.log('Creating temporary session for development');

    return this._http.post(this._createSessionUrl, SESSION_REQUEST, this._headers).pipe(
      map(data => {
        if (data && data.hasOwnProperty('Token')) {

          // initialize the CoreSDKs.
          // TODO to be changed when SessionId is received from query string parameter.
          this._shellService.initCoreSDK(data.Token);
          return true;
        } else {
          console.error('Failed to create temporary session');
          return false;
        }
      })
    );
  }

}
