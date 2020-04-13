import { Injectable } from '@angular/core';
import { Http, HttpHeaders } from '@orxe-sdk/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private readonly _http: Http;
  private readonly _baseUrl = environment.baseUrl;

  constructor() {
    this._http = new Http();
  }

  /**
   * Makes POST request to given url with privded body
   * @param url endpoint url of the resource
   * @param body request body
   * @param reqHeaders request headers
   */
  post(url: string, body: any, reqHeaders?: HttpHeaders): Observable<any> {
    return this._http.post(this._baseUrl + url, body, {headers: reqHeaders });
  }
}
