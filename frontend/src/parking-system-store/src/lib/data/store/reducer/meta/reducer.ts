import { ActionReducerMap } from '@ngrx/store';
import {
  authFeatureKey,
  AuthState,
  initialAuthReducer,
  initialParkingReducer,
  initiateReservationReducer,
  intiateUserReducer,
  parkingFeatureKey,
  ParkingState,
  reservationFeatureKey,
  ReservationState,
  userFeatureKey,
  UserState,
} from '../../../store';

//Register the state to reset it on logout
export interface AppState {
  [authFeatureKey]: AuthState;
  [parkingFeatureKey]: ParkingState;
  [reservationFeatureKey]: ReservationState;
  [userFeatureKey]: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: initialAuthReducer,
  [parkingFeatureKey]: initialParkingReducer,
  [reservationFeatureKey]: initiateReservationReducer,
  [userFeatureKey]: intiateUserReducer,
};
