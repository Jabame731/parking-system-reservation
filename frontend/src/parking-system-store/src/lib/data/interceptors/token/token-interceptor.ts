import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUsecase } from '../../../usecases';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  private authUsecase = inject(AuthUsecase);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.withCredentials) {
      return this.authUsecase.getAccessToken().pipe(
        switchMap((token: string | undefined) => {
          if (token) {
            return this.addToken(req, next, token).pipe(
              catchError((error) => {
                const statusText =
                  error.error && error.error.message ? error.error.message : error.statusText;

                //TODO REFRESH TOKEN

                return throwError(() => error || new Error('Unknown Error'));
              }),
            );
          }
          return this.handleError();
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return this.handleError(err);
          } else if (err instanceof NotAuthorized) {
            return this.handleError();
          }
          return throwError(() => err);
        }),
      );
    }
    return next.handle(req);
  }

  private addToken = (httpRequest: HttpRequest<any>, next: HttpHandler, token: string) => {
    return next.handle(
      httpRequest.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }),
    );
  };

  private handleError(error?: HttpErrorResponse): Observable<never> {
    const redirectTo = window.location.pathname;
    this.redirectToPath('/auth', redirectTo);
    return throwError(() => error || new Error('Need to login'));
  }

  private redirectToPath(path: string, onLogin?: string): void {
    this.router.navigate([path], { queryParams: { onLogin } });
  }
}
