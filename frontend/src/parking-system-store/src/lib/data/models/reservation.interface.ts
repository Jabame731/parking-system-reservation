import { Observable } from 'rxjs';
import { CreateReservation, Reservation, ReservationResponse } from './reservation.attributes';

export interface ReservationInterface {
  addParkingReservation(reservation: CreateReservation): Observable<string>;
  createPaypalReservation(reservationId: string): Observable<string>;
  approvePaypalReservation(reservationId: string, paypalOrderId: string): Observable<Reservation>;
  getReservationByUserId(userId: string): Observable<ReservationResponse>;
  getAllReservations(): Observable<ReservationResponse>;
  deleteReservation(reservationId: string): Observable<boolean>;
  updateReservation(reservationId: string): Observable<boolean>;
}
