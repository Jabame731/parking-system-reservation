import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../data/store';
import { Callbacks, CreateReservation } from '../../data/models';

@Injectable({
  providedIn: 'root',
})
export class ReservationUsecase {
  private store = inject(Store<fromStore.ReservationState>);

  addReservation(data: CreateReservation, callBacks: Callbacks) {
    console.log(' usecase data', data);

    this.store.dispatch(
      fromStore.addParkingReservationAttempted({
        reservation: data,
        callBacks,
      }),
    );
  }
}
