import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SERVER_LINK } from '../constants/server-link.constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.accessToken && request.url.startsWith(SERVER_LINK)) {
      const newReq = request.clone();
      newReq.headers.append(
        'Authorization',
        `Bearer ${this.authService.accessToken}`
      );

      return next.handle(newReq);
    }
    return next.handle(request);
  }
}
