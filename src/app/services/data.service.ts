import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import {
  AppError,
  BadInput,
  LostConnection,
  NotFoundError
} from './errors';
import {
  ErrorNotificationService
} from './error-notification.service';


/**
 * This service is intended to be the single method that coordinates RESTful API calls.
 * This allows for a single place for handling the various types of errors that can come
 * from the HttpClient
 *
 * If we wished to extend this, it would have put, patch, and upload as well.
 */

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient,
    private _errNotification: ErrorNotificationService
  ) { }

  public get(url: string) {
    return this.http.get(url).pipe(catchError(err=>{this.handleError(err); return of('error');}));
  }

  public post(url: string, data?: any): Observable<any> {
    const headerData = new HttpHeaders();
    headerData.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headerData.append('Access-Control-Allow-Credentials', 'true');
    this._errNotification.clearNotification();
    return this.http.post(url, data, {
      headers: headerData
    }).pipe(catchError(err=>{this.handleError(err); return of('error');}));
  }


  private handleError(error: Response) {
    let throwable: AppError | void;
    switch (error.status) {
      case 0:
        throwable = new LostConnection(error);
        this._errNotification
          .notify(throwable.getError(), ErrorNotificationService.SEVERITY_HIGH);
        break;
      case 400:
        throwable = new BadInput(error.json());
        this._errNotification
          .notify(throwable.getError());
        break;
      case 404:
        throwable = new NotFoundError();
        this._errNotification
          .notify(throwable.getError());
        break;
      default:
        throwable = new AppError(error);
        this._errNotification
          .notify(throwable.getError(), ErrorNotificationService.SEVERITY_MEDIUM);
        break;
    }
  }

}

