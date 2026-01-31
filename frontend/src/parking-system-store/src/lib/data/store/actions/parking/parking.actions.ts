import { createAction, props } from '@ngrx/store';
import { Parking } from '../../../models';

export const getParkingSlotAttempted = createAction('[Parking] Get Parking Slots Attempted');

export const getParkingSlotFailed = createAction(
  '[Parking] Get Parking Slots Failed',
  props<{ error: string }>(),
);

export const getParkingSlotSucceeded = createAction(
  '[Parking] Get Parking Slots Succeeded',
  props<{ data: Parking[] }>(),
);
