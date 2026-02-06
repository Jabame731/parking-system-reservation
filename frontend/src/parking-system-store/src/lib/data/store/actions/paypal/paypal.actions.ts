import { createAction, props } from '@ngrx/store';
import { Reservation } from '@parking-system-store/public-api';

export const createPaypalReservationAttempted = createAction(
  '[Paypal] Add Paypal Reservation Attempted',
  props<{ reservationId: string }>(),
);

export const createPaypalReservationFailed = createAction(
  '[Paypal] Add Paypal Reservation Failed',
  props<{ error: string }>(),
);

export const createPaypalReservationSucceeded = createAction(
  '[Paypal] Add Paypal Reservation Succeeded',
  props<{ response: string }>(),
);

export const approvePaypalReservationAttempted = createAction(
  '[Paypal] Approve Paypal Reservation Attempted',
  props<{ reservationId: string; paypalOrderId: string }>(),
);

export const approvePaypalReservationFailed = createAction(
  '[Paypal] Approve Paypal Reservation Failed',
  props<{ error: string }>(),
);

export const approvePaypalReservationSucceeded = createAction(
  '[Paypal] Approve Paypal Reservation Succeeded',
  props<{ response: Reservation }>(),
);
