import { inject, Injectable } from '@angular/core';
import { CreateReservation, Reservation, ReservationResponse } from '../../models';
import { ReservationDatasource } from '../../datasources';
import { Observable } from 'rxjs';
import { ReservationRepositoryInterface } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class ReservationRepository implements ReservationRepositoryInterface {
  private reservationDatasource = inject(ReservationDatasource);

  addParkingReservation(reservation: CreateReservation): Observable<string> {
    return this.reservationDatasource.addParkingReservation(reservation);
  }

  createPaypalReservation(reservationId: string): Observable<string> {
    return this.reservationDatasource.createPaypalReservation(reservationId);
  }

  approvePaypalReservation(reservationId: string, paypalOrderId: string): Observable<Reservation> {
    return this.reservationDatasource.approvePaypalReservation(reservationId, paypalOrderId);
  }

  getAllReservations(): Observable<ReservationResponse> {
    return this.reservationDatasource.getAllReservations();
  }

  getReservationByUserId(userId: string): Observable<ReservationResponse> {
    return this.reservationDatasource.getReservationByUserId(userId);
  }

  deleteReservation(reservationId: string): Observable<boolean> {
    console.log('repository');

    return this.reservationDatasource.deleteReservation(reservationId);
  }

  updateReservation(reservationId: string): Observable<boolean> {
    return this.reservationDatasource.updateReservation(reservationId);
  }
}
