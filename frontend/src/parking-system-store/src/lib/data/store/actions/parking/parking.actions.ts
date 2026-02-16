import { createAction, props } from '@ngrx/store';
import { Callbacks, CreateParking, Parking, ParkingResponseData } from '../../../models';

export const getParkingSlotAttempted = createAction('[Parking] Get Parking Slots Attempted');

export const getParkingSlotFailed = createAction(
  '[Parking] Get Parking Slots Failed',
  props<{ error: string }>(),
);

export const getParkingSlotSucceeded = createAction(
  '[Parking] Get Parking Slots Succeeded',
  props<{ data: ParkingResponseData }>(),
);

export const addParkingSlotAttempted = createAction(
  '[Parking] Add Parking Slot Attempted',
  props<{
    data: CreateParking;
    callBacks: Callbacks;
  }>(),
);

export const addParkingSlotSucceeded = createAction(
  '[Parking] Add Parking Slot Succeeded',
  props<{
    id: string;
    data: CreateParking;
  }>(),
);

export const addParkingSlotFailed = createAction(
  '[Parking] Add Parking Slots Failed',
  props<{ error: string }>(),
);

export const deleteParkingSlotAttempted = createAction(
  '[Parking] Delete Parking Slot Attempted',
  props<{
    id: string;
  }>(),
);

export const deleteParkingSlotSucceeded = createAction(
  '[Parking] Delete Parking Slot Succeeded',
  props<{
    id: string;
  }>(),
);

export const deleteParkingSlotFailed = createAction(
  '[Parking] Delete Parking Slots Failed',
  props<{ error: string }>(),
);

export const getParkingSlotsFromSSE = createAction(
  '[Parking] Get Parking From SSE Successfully',
  props<{ data: ParkingResponseData }>(),
);
