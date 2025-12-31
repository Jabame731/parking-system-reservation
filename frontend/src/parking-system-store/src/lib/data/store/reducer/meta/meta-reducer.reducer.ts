import { ActionReducerMap } from '@ngrx/store';
import { initialAuthReducer, authFeatureKey, AuthState } from '../../reducer';

export interface AppState {
  [authFeatureKey]: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: initialAuthReducer,
};
