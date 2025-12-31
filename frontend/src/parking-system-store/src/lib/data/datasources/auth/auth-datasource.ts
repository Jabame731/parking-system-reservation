import { inject, Injectable } from '@angular/core';
import { AuthInterface, Document, RegisterUserData, UserResponseModel } from '../../models';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import UnexpectedError = AppErrors.UnexpectedError;
import InvalidCredentials = AppErrors.InvalidCredentials;
import UserNotFound = AppErrors.UserNotFound;

@Injectable({
  providedIn: 'root',
})
export class AuthDatasource implements AuthInterface {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private authErrorReport(error: any) {
    const message = error?.error?.error;
    switch (error.status) {
      case 424:
        return throwError(() => new InvalidCredentials(message));
      case 404:
        return throwError(() => new UserNotFound(message));
      default:
        return throwError(() => new UnexpectedError(message));
    }
  }

  login(email: string, password: string): Observable<UserResponseModel> {
    return this.http
      .post<Document<UserResponseModel>>(`${this.baseUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((resp: Document<UserResponseModel>) => resp.data as UserResponseModel),
        catchError((err) => this.authErrorReport(err))
      );
  }

  registerUser(data: RegisterUserData): Observable<{ message: string }> {
    return this.http
      .post<Document<{ message: string }>>(`${this.baseUrl}/api/auth/register`, {
        data,
      })
      .pipe(
        map((resp: Document<{ message: string }>) => resp as { message: string }),
        catchError((err) => this.authErrorReport(err))
      );
  }
}
