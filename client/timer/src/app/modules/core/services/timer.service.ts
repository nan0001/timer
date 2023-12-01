import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_LINK } from '../constants/server-link.constant';
import { Observable, catchError, of } from 'rxjs';
import {
  TimersResponseInterface,
  TimersSizes,
} from '../models/timer-response.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timersLink = `${SERVER_LINK}timers/`;

  constructor(
    private httpClient: HttpClient,
    private notification: NzNotificationService,
    private authService: AuthService
  ) {}

  public getAllTimers(): Observable<TimersResponseInterface> {
    return (
      this.httpClient.get(
        this.timersLink
      ) as Observable<TimersResponseInterface>
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.handleAccessError();
        }

        return of({
          s: [],
          m: [],
          l: [],
        });
      })
    );
  }

  public getTimersByType(timerSize: TimersSizes): Observable<number[]> {
    return (
      this.httpClient.get(this.timersLink + timerSize) as Observable<number[]>
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.handleAccessError();
        }

        return of([]);
      })
    );
  }

  public addTimerDate(timerSize: TimersSizes): void {
    this.httpClient
      .post(this.timersLink + timerSize, {
        date: Date.now(),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.handleAccessError();
          }

          return of(undefined);
        })
      )
      .subscribe();
  }

  private handleAccessError(): void {
    this.notification.error(
      'Connection error',
      'Access token expired, login again'
    );
    this.authService.logout();
  }
}
