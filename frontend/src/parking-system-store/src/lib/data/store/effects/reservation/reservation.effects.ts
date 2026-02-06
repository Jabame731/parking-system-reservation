import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationRepository } from '../../../repositories';
import * as fromReservation from '../../actions/reservation/reservation.actions';
import * as fromPaypal from '../../actions/paypal/paypal.actions';
import { catchError, map, switchMap } from 'rxjs';
import { Reservation } from '../../../models';

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
          map((id) => {
            callBacks.onSuccess();
            return fromReservation.addParkingReservationSucceeded({
              reservationId: id,
              reservation,
            });
          }),
          catchError((error) => {
            const cleanMessage = error.message.replace('Error: ', '');
            callBacks.onFailure?.({ errorMsg: cleanMessage });
            return [fromReservation.addParkingReservationFailed({ error: cleanMessage })];
          }),
        );
      }),
    );
  });

  //createPaypalReservation
  initiateCreatePaypalReservationAttempted$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromPaypal.createPaypalReservationAttempted),
      switchMap((action) => {
        const { reservationId } = action;

        return this.reservationRepository.createPaypalReservation(reservationId).pipe(
          map((res: string) => {
            return fromPaypal.createPaypalReservationSucceeded({ response: res });
          }),
          catchError((err) => {
            const cleanMessage = err.message.replace('Error: ', '');
            return [fromPaypal.createPaypalReservationFailed({ error: cleanMessage })];
          }),
        );
      }),
    );
  });

  //approvePaypalReservation
  initiateApprovePaypalReservationAttempted$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromPaypal.approvePaypalReservationAttempted),
      switchMap((action) => {
        const { reservationId, paypalOrderId } = action;

        return this.reservationRepository
          .approvePaypalReservation(reservationId, paypalOrderId)
          .pipe(
            map((res: Reservation) => {
              return fromPaypal.approvePaypalReservationSucceeded({ response: res });
            }),
            catchError((err) => {
              const cleanMessage = err.message.replace('Error: ', '');
              return [fromPaypal.approvePaypalReservationFailed({ error: cleanMessage })];
            }),
          );
      }),
    );
  });
}
