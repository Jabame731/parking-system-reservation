import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;
import UnexpectedError = AppErrors.UnexpectedError;
import NotFoundError = AppErrors.NotFoundError;
import ForbiddenError = AppErrors.ForbiddenError;
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  CreateReservation,
  Document,
  Reservation,
  ReservationInterface,
  ReservationResponse,
} from '../../models';

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

  private fetchReservations(url: string): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(url, { withCredentials: true }).pipe(
      map((res: ReservationResponse) => {
        return res as ReservationResponse;
      }),
      catchError((err) => this.errorReport(err)),
    );
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

  getReservationByUserId(userId: string): Observable<any> {
    return this.fetchReservations(`${this.baseUrl}/api/parkingReservation/${userId}`);
  }

  getAllReservations(): Observable<any> {
    return this.fetchReservations(`${this.baseUrl}/api/parkingReservation`);
  }

  deleteReservation(reservationId: string): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/api/parkingReservation/${reservationId}`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError((error) => {
          return this.errorReport(error);
        }),
      );
  }

  updateReservation(reservationId: string): Observable<boolean> {
    return this.http
      .patch(
        `${this.baseUrl}/api/parkingReservation/${reservationId}`,
        {},
        { withCredentials: true },
      )
      .pipe(
        map(() => true),
        catchError((error) => {
          return this.errorReport(error);
        }),
      );
  }
}
