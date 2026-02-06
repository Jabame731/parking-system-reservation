import { Observable } from 'rxjs';
import { CreateReservation, Reservation } from './reservation.attributes';

export interface ReservationInterface {
  addParkingReservation(reservation: CreateReservation): Observable<string>;
  createPaypalReservation(reservationId: string): Observable<string>;
  approvePaypalReservation(reservationId: string, paypalOrderId: string): Observable<Reservation>;
}
