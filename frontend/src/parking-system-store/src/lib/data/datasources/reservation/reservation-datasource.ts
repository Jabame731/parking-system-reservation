import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;
import UnexpectedError = AppErrors.UnexpectedError;
import NotFoundError = AppErrors.NotFoundError;
import ForbiddenError = AppErrors.ForbiddenError;
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CreateReservation, Document, Reservation, ReservationInterface } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ReservationDatasource implements ReservationInterface {
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

  addParkingReservation(reservation: CreateReservation): Observable<string> {
    return this.http
      .post(`${this.baseUrl}/api/parkingReservation`, reservation, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return res.headers.get('location')?.split('/').pop() as string;
        }),
        catchError((err) => {
          return this.errorReport(err);
        }),
      );
  }

  createPaypalReservation(reservationId: string): Observable<string> {
    return this.http
      .post(
        `${this.baseUrl}/api/paypal/createPaypalReservation`,
        { reservationId },
        {
          withCredentials: true,
        },
      )
      .pipe(
        map((res: Document<string>) => {
          return res.data as string;
        }),
        catchError((err) => this.errorReport(err)),
      );
  }

  approvePaypalReservation(reservationId: string, paypalOrderId: string): Observable<Reservation> {
    return this.http
      .post(
        `${this.baseUrl}/api/paypal/approvePaypalPayment`,
        { reservationId, paypalOrderId },
        {
          withCredentials: true,
        },
      )
      .pipe(
        map((res: Document<Reservation>) => res.data as Reservation),
        catchError((err) => this.errorReport(err)),
      );
  }
}
