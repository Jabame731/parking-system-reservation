import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { initialAuthReducer, authFeatureKey, AuthState } from '..';
import * as authActions from '../../actions/auth/auth.actions';

export const clearStateMetaReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state: any, action: Action) => {
    if (action.type === authActions.logoutAttempted.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
};
