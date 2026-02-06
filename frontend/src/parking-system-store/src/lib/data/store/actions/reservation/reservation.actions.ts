import { createAction, props } from '@ngrx/store';
import { Callbacks, CreateReservation } from '../../../models';

export const addParkingReservationAttempted = createAction(
  '[Reservation] Add Parking Reservation Attempted',
  props<{ reservation: CreateReservation; callBacks: Callbacks }>(),
);

export const addParkingReservationFailed = createAction(
  '[Reservation] Add Parking Reservation Failed',
  props<{ error: string }>(),
);

export const addParkingReservationSucceeded = createAction(
  '[Reservation] Add Parking Reservation Succeeded',
  props<{ reservationId: string; reservation: CreateReservation }>(),
);
