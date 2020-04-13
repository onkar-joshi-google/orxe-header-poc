import { Injectable } from '@angular/core';
import { Http } from '@orxe-sdk/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';


const HEADEARS = {
  'Content-Type': 'application/json',
  'Accept-Language': 'en-US,en;q=0.8',
};


@Injectable()
export class HttpService {
  private readonly _http: Http;
  private readonly _baseUrl = environment.baseUrl;

  constructor() {
    this._http = new Http();
  }

  post(url: string, body: any ): Observable<any> {
    return this._http.post(this._baseUrl + url, body, {headers: HEADEARS});
  }
}
