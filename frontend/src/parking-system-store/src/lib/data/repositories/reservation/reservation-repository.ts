import { inject, Injectable } from '@angular/core';
import { CreateReservation } from '../../models';
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
}
