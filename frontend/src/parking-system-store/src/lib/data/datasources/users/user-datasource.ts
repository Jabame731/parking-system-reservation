import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Document, EditUserData, User, UserInterface } from '../../models';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;
import UnexpectedError = AppErrors.UnexpectedError;
import NotFoundError = AppErrors.NotFoundError;
import ForbiddenError = AppErrors.ForbiddenError;

@Injectable({
  providedIn: 'root',
})
export class UserDatasource implements UserInterface {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private errorReport(error: any) {
    const message = error?.error?.error;

    switch (error.status) {
      case 401:
        return throwError(() => new NotAuthorized(message));
      case 403:
        return throwError(() => new ForbiddenError(message));
      case 404:
        return throwError(() => new NotFoundError(message));
      default:
        return throwError(() => new UnexpectedError(message));
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get(`${this.baseUrl}/api/user`, {
        withCredentials: true,
      })
      .pipe(
        map((res: Document<User[]>) => {
          return res.data as User[];
        }),
        catchError((err) => {
          return this.errorReport(err);
        }),
      );
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/api/user/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError((err) => {
          return this.errorReport(err);
        }),
      );
  }

  editUser(data: EditUserData): Observable<boolean> {
    return this.http
      .patch(
        `${this.baseUrl}/api/user`,
        { data },
        {
          withCredentials: true,
        },
      )
      .pipe(
        map(() => true),
        catchError((err) => {
          return this.errorReport(err);
        }),
      );
  }
}
