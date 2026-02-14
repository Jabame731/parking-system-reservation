import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../../reducer/user/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);

export const getUserData = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state && state.data,
);

export const loading = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.loading,
);

export const loaded = createSelector(selectUserState, (state: fromUser.UserState) => state.loaded);

export const error = createSelector(selectUserState, (state: fromUser.UserState) => state.error);
