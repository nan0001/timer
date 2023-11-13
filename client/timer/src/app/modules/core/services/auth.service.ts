import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<null | string>('someuser');

  public logout(): void {
    this.user$.next(null);
  }
}
