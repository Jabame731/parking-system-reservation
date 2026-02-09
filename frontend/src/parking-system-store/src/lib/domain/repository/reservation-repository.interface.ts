import { CreateReservation, Reservation, ReservationResponse } from '../../data/models';
import { Observable } from 'rxjs';

export interface ReservationRepositoryInterface {
  addParkingReservation(reservation: CreateReservation): Observable<string>;
  createPaypalReservation(reservationId: string): Observable<string>;
  approvePaypalReservation(reservationId: string, paypalOrderId: string): Observable<Reservation>;
  getReservationByUserId(userId: string): Observable<ReservationResponse>;
  getAllReservations(): Observable<ReservationResponse>;
  deleteReservation(reservationId: string): Observable<boolean>;
}
