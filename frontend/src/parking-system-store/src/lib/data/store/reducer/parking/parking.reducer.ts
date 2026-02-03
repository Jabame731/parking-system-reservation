import { createReducer, on } from '@ngrx/store';
import { Parking } from '../../../models';
import * as fromParking from '../../actions/parking/parking.actions';
import * as fromReservation from '../../actions/reservation/reservation.actions';

export const parkingFeatureKey = 'parking';

export interface ParkingState {
  data?: Parking[];
  loading: boolean;
  loaded: boolean;
  reservationAddLoading?: boolean;
  reservationAddSuccess?: boolean;
  error: null | string;
}

export const initialParkingState: ParkingState = {
  data: undefined,
  loaded: false,
  loading: false,
  error: null,
};

export const initialParkingReducer = createReducer(
  initialParkingState,
  on(fromParking.getParkingSlotAttempted, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: null,
    };
  }),
  on(fromParking.getParkingSlotSucceeded, (state, { data }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: data,
      error: null,
    };
  }),
  on(fromParking.getParkingSlotFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: error,
    };
  }),
  on(fromReservation.addParkingReservationSucceeded, (state, { reservation, response }) => {
    return {
      ...state,
      reservationAddLoading: false,
      reservationAddSuccess: true,
      data: state.data?.map((slot) => {
        if (slot.id === reservation.slotId) {
          return {
            ...slot,
            slotStatus: 'RESERVED',
          };
        }

        return slot;
      }),
    };
  }),
);
