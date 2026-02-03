import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationRepository } from '../../../repositories';
import * as fromReservation from '../../actions/reservation/reservation.actions';
import { catchError, map, switchMap } from 'rxjs';

@Injectable()
export class ReservationEffects {
  private action$ = inject(Actions);
  private reservationRepository = inject(ReservationRepository);

  initiateAddReservationAttempted$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromReservation.addParkingReservationAttempted),
      switchMap((action) => {
        const { reservation, callBacks } = action;
        return this.reservationRepository.addParkingReservation(reservation).pipe(
          map((response: string) => {
            callBacks.onSuccess();
            return fromReservation.addParkingReservationSucceeded({ response, reservation });
          }),
          catchError((error) => {
            const cleanMessage = error.message.replace('Error: ', '');
            callBacks.onFailure?.({ errorMsg: cleanMessage });
            return [fromReservation.addParkingReservationFailed({ error })];
          }),
        );
      }),
    );
  });
}
