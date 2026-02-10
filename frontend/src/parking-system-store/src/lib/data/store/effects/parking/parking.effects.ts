import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromParking from '../../actions/parking/parking.actions';
import { ParkingRepository } from '../../../repositories';
import { catchError, map, of, switchMap } from 'rxjs';
import { Parking, ParkingResponseData } from '../../../models';

@Injectable()
export class ParkingEffects {
  private actions$ = inject(Actions);
  private parkingRepository = inject(ParkingRepository);

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
}
