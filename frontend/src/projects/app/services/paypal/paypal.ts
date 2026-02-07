import { inject, Injectable } from '@angular/core';
import { ReservationUsecase } from '@parking-system-store/lib/usecases';
import { ReservationRepository } from '@parking-system-store/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private reservationUsecase = inject(ReservationUsecase);
  private reservationRepo = inject(ReservationRepository);

  createPaypalReservation(reservationId: string): Observable<string> {
    return this.reservationRepo.createPaypalReservation(reservationId);
  }
  approvePaypalReservation(reservationId: string, paypalOrderId: string) {
    this.reservationUsecase.approvePaypalReservation(reservationId, paypalOrderId);
  }
}
