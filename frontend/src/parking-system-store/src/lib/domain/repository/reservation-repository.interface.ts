import { CreateReservation } from '../../data/models';
import { Observable } from 'rxjs';

export interface ReservationRepositoryInterface {
  addParkingReservation(reservation: CreateReservation): Observable<string>;
}
