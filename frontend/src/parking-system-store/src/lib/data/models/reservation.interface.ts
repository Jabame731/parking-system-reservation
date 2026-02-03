import { Observable } from 'rxjs';
import { CreateReservation } from './reservation.attributes';

export interface ReservationInterface {
  addParkingReservation(reservation: CreateReservation): Observable<string>;
}
