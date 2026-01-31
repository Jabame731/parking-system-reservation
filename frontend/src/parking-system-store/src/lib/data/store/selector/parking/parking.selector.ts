import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromParking from '../../reducer/parking/parking.reducer';

export const selectParkingState = createFeatureSelector<fromParking.ParkingState>(
  fromParking.parkingFeatureKey,
);

export const getParkingData = createSelector(
  selectParkingState,
  (state: fromParking.ParkingState) => state && state.data,
);

export const isParkingLoading = createSelector(
  selectParkingState,
  (state: fromParking.ParkingState) => state.loading,
);

export const isParkingLoaded = createSelector(
  selectParkingState,
  (state: fromParking.ParkingState) => state.loaded,
);

export const parkingError = createSelector(
  selectParkingState,
  (state: fromParking.ParkingState) => state?.error,
);
