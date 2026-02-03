import { createReducer, on } from '@ngrx/store';
import { Reservation } from '../../../models';
import * as fromReservation from '../../actions/reservation/reservation.actions';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  data: Reservation[];
  loading: boolean;
  loaded: boolean;
  error: null | string;
  loadAddAttempted: boolean;
  loadAddSucceeded: boolean;
}

export const initialReservationState: ReservationState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
  loadAddAttempted: false,
  loadAddSucceeded: false,
};

export const initiateReservationReducer = createReducer(
  initialReservationState,
  on(fromReservation.addParkingReservationAttempted, (state) => {
    return {
      ...state,
      loadAddAttempted: true,
      loadAddSucceeded: false,
      error: null,
    };
  }),
  on(fromReservation.addParkingReservationSucceeded, (state) => {
    return {
      ...state,
      loadAddAttempted: false,
      loadAddSucceeded: true,
      error: null,
    };
  }),
  on(fromReservation.addParkingReservationFailed, (state, { error }) => {
    return {
      ...state,
      loadAddAttempted: false,
      loadAddSucceeded: false,
      error: error || 'Failed to add reservation',
    };
  }),
);
