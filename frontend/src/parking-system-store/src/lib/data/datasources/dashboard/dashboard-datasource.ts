import { inject, Injectable } from '@angular/core';
import {
  DashboardAnalytics,
  DashboardAnalyticsInterface,
  DashboardAnalyticsResponse,
  Document,
} from '../../models';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;
import UnexpectedError = AppErrors.UnexpectedError;
import NotFoundError = AppErrors.NotFoundError;
import ForbiddenError = AppErrors.ForbiddenError;
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDatasource implements DashboardAnalyticsInterface {
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

  getDashboardAnalytics(): Observable<DashboardAnalyticsResponse> {
    return this.http
      .get<DashboardAnalyticsResponse>(`${this.baseUrl}/api/analytics`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => res),
        catchError((err) => this.errorReport(err)),
      );
  }
}
