import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../data/store';
import { Callbacks, CreateReservation } from '../../data/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationUsecase {
  private store = inject(Store<fromStore.ReservationState>);

  addReservation(data: CreateReservation, callBacks: Callbacks) {
    this.store.dispatch(
      fromStore.addParkingReservationAttempted({
        reservation: data,
        callBacks,
      }),
    );
  }

  createPaypalReservation(reservationId: string) {
    return this.store.dispatch(fromStore.createPaypalReservationAttempted({ reservationId }));
  }
  approvePaypalReservation(reservationId: string, paypalOrderId: string) {
    this.store.dispatch(
      fromStore.approvePaypalReservationAttempted({ reservationId, paypalOrderId }),
    );
  }
}
