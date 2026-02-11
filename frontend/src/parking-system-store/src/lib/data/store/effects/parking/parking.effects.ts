import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromParking from '../../actions/parking/parking.actions';
import { ParkingRepository } from '../../../repositories';
import { catchError, map, of, switchMap } from 'rxjs';
import { ParkingResponseData } from '../../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ParkingEffects {
  private actions$ = inject(Actions);
  private parkingRepository = inject(ParkingRepository);
  private snackbar = inject(MatSnackBar);

  initiateGetParkingAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromParking.getParkingSlotAttempted),
      switchMap(() => {
        return this.parkingRepository.getParkingSlots().pipe(
          map((data: ParkingResponseData) => fromParking.getParkingSlotSucceeded({ data })),
          catchError((error) => {
            return of(fromParking.getParkingSlotFailed({ error }));
          }),
        );
      }),
    );
  });

  addParkingSlotAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromParking.addParkingSlotAttempted),
      switchMap((action) => {
        const { data, callBacks } = action;

        return this.parkingRepository.addParkingSlot(data).pipe(
          map((id) => {
            callBacks.onSuccess();
            this.snackbar.open('Parking slot added successfully', 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return fromParking.addParkingSlotSucceeded({ id, data });
          }),
          catchError((err) => {
            const cleanMessage = err.message.replace('Error: ', '');
            callBacks.onFailure?.({ errorMsg: cleanMessage });
            return [fromParking.addParkingSlotFailed({ error: err })];
          }),
        );
      }),
    );
  });

  deleteParkingSlotAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromParking.deleteParkingSlotAttempted),
      switchMap((action) => {
        return this.parkingRepository.deleteParkingSlot(action.id).pipe(
          map((id) => {
            this.snackbar.open('Parking slot deleted successfully', 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return fromParking.deleteParkingSlotSucceeded({ id: action.id });
          }),
          catchError((err) => {
            const cleanMessage = err.message.replace('Error: ', '');
            return [fromParking.deleteParkingSlotFailed({ error: cleanMessage })];
          }),
        );
      }),
    );
  });
}
