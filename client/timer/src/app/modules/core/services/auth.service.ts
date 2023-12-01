import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TokenInterface } from '../models/auth.model';
import { SERVER_LINK } from '../constants/server-link.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessToken = localStorage.getItem('token') || '';
  public username = localStorage.getItem('username') || '';
  public user$ = new BehaviorSubject<null | string>(this.username);
  private authLink = `${SERVER_LINK}auth/`;

  constructor(private httpClient: HttpClient) {}

  public logout(): void {
    this.user$.next(null);
    this.accessToken = '';
    this.username = '';
  }

  public login(
    user: { name: string; password: string },
    isNewUser = false
  ): Observable<string> {
    return this.httpClient
      .post(`${this.authLink}${isNewUser ? 'signup' : 'login'}`, {
        username: user.name,
        password: user.password,
      })
      .pipe(
        map(tokenObj => {
          this.username = user.name;
          this.user$.next(this.username);
          this.accessToken = (tokenObj as TokenInterface).access_token;

          return this.accessToken;
        })
      );
  }

  public saveCredsInLocalStorage(): void {
    if (this.username && this.accessToken) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('token', this.accessToken);
    }
  }
}
