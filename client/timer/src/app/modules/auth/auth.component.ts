import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [NzNotificationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public authForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    isNew: [false],
  });

  public credentialsError$ = new BehaviorSubject('');
  private _credentialsError = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  private set credError(val: string) {
    this._credentialsError = val;
    this.credentialsError$.next(val);
  }

  private get credError() {
    return this._credentialsError;
  }

  public goToMainPage(): void {
    this.router.navigate(['']);
  }

  public submitForm(): void {
    if (this.authForm.valid) {
      const name = this.authForm.controls.userName.value;
      const password = this.authForm.controls.password.value;
      const isNew = this.authForm.controls.isNew.value;

      this.authService
        .login({ name, password }, isNew)
        .pipe(
          map(() => {
            this.goToMainPage();
          }),
          catchError((err: HttpErrorResponse) => {
            this.handleRequestError(err);

            return of(null);
          })
        )
        .subscribe();

      return;
    }

    this.markFormAsTouched();
  }

  public clearCredError(): void {
    if (this.credError) {
      this.credError = '';
    }
  }

  private markFormAsTouched(): void {
    Object.values(this.authForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private handleRequestError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 0:
        this.notification.error('Connection error', 'Server is unavailable');
        break;
      case 401:
        this.credError = 'Invalid username or password';
        break;
      case 400:
        this.credError = 'User with such name already exists';
        break;
    }
  }
}
