import * as fromAuth from '../../reducer';
import { UserResponseModel } from '../../../models';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);

export const getAuthProfile = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state && state.data
);

export const isLoading = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.loading
);

export const authError = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state?.error
);

export const getAuthenticated = createSelector(selectAuthState, (state) => state.isAuthenticated);

//register slice
export const isRegisterLoading = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.registerLoading
);

export const isRegisterSucceeded = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.registerSucceeced
);

export const getSuccessRegisterMessage = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.registerSuccessMessage
);

export const getRegisterErrorMessage = createSelector(
  selectAuthState,
  (state: fromAuth.AuthState) => state.registerError
);
