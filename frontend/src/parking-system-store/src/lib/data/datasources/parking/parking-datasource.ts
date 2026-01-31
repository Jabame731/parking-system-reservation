import { inject, Injectable } from '@angular/core';
import { CreateParking, Document, Parking, ParkingInterface } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { AppErrors } from '../../errors';
import NotAuthorized = AppErrors.NotAuthorized;
import UnexpectedError = AppErrors.UnexpectedError;
import NotFoundError = AppErrors.NotFoundError;
import ForbiddenError = AppErrors.ForbiddenError;
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingDatasource implements ParkingInterface {
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

  addParkingSlot(parking: CreateParking): Observable<Partial<Parking>> {
    return this.http
      .post<Document<Parking>>(`${this.baseUrl}/api/parkingSlots`, parking, {
        withCredentials: true,
      })
      .pipe(
        map((resp: Document<Parking>) => resp.data as Parking),
        catchError((err) => this.errorReport(err)),
      );
  }

  getParkingSlots(): Observable<Parking[]> {
    return this.http.get(`${this.baseUrl}/api/parkingSlots`).pipe(
      map((resp: Document<Parking[]>) => resp.data as Parking[]),
      catchError((err) => this.errorReport(err)),
    );
  }

  getParkingSlotById(slotId: string): Observable<Parking> {
    return this.http.get<Document<Parking>>(`${this.baseUrl}/api/parkingSlots/${slotId}`).pipe(
      map((resp: Document<Parking>) => resp.data as Parking),
      catchError((err) => this.errorReport(err)),
    );
  }

  editParkingSlot(parking: Partial<Parking>): Observable<string> {
    return this.http
      .put(`${this.baseUrl}/api/parkingSlots/updateSlot`, parking, {
        withCredentials: true,
      })
      .pipe(
        map((resp: Document<string>) => resp.data as string),
        catchError((err) => this.errorReport(err)),
      );
  }

  deleteParkingSlot(slotId: string): Observable<string> {
    return this.http
      .delete(`${this.baseUrl}/api/parkingSlots/${slotId}`, {
        withCredentials: true,
      })
      .pipe(
        map((resp: Document<string>) => resp.data as string),
        catchError((err) => this.errorReport(err)),
      );
  }
}
