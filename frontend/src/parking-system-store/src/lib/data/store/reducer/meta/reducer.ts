import { ActionReducerMap } from '@ngrx/store';
import {
  authFeatureKey,
  AuthState,
  initialAuthReducer,
  initialParkingReducer,
  initiateReservationReducer,
  parkingFeatureKey,
  ParkingState,
  reservationFeatureKey,
  ReservationState,
} from '../../../store';

//Register the state to reset it on logout
export interface AppState {
  [authFeatureKey]: AuthState;
  [parkingFeatureKey]: ParkingState;
  [reservationFeatureKey]: ReservationState;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: initialAuthReducer,
  [parkingFeatureKey]: initialParkingReducer,
  [reservationFeatureKey]: initiateReservationReducer,
};
