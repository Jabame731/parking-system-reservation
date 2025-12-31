import { createReducer, on } from '@ngrx/store';
import { UserResponseModel } from '../../../models';
import * as fromAuth from '../../actions/auth.action';

export const authFeatureKey = 'authz';

export interface AuthState {
  data?: UserResponseModel;
  loading: boolean;
  loaded: boolean;
  error: null | string;
  isAuthenticated: boolean;

  //for register
  registerLoading: boolean;
  registerSucceeced: boolean;
  registerSuccessMessage: null | string;
  registerError: null | string;
}

export const initialAuthState: AuthState = {
  data: undefined,
  loaded: false,
  loading: false,
  error: null,
  isAuthenticated: false,
  registerLoading: false,
  registerError: null,
  registerSuccessMessage: null,
  registerSucceeced: false,
};

export const initialAuthReducer = createReducer(
  initialAuthState,
  on(fromAuth.initiateLoginAttempted, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(fromAuth.initiateLoginSucceeded, (state, { data }) => {
    return {
      ...state,
      data,
      loaded: true,
      loading: false,
      error: null,
    };
  }),
  on(fromAuth.initiateLoginFailed, (state, { email, password, error }) => {
    const data = { email, password };

    return {
      ...state,
      data: data as any,
      error,
      loading: false,
      loaded: false,
      isAuthenticated: false,
    };
  }),
  on(fromAuth.initiateRegisterAttempted, (state, { data }) => {
    return {
      ...state,
      registerLoading: true,
      registerSucceeced: false,
      registerSuccessMessage: null,
      registerError: null,
    };
  }),
  on(fromAuth.initiateRegisterSucceeded, (state, { response }) => {
    return {
      ...state,
      registerLoading: false,
      registerSucceeced: true,
      registerSuccessMessage: response,
      registerError: null,
    };
  }),
  on(fromAuth.initiateRegisterFailed, (state, { error }) => {
    return {
      ...state,
      registerLoading: false,
      registerSucceeced: false,
      registerSuccessMessage: null,
      registerError: error,
    };
  }),
  on(fromAuth.logoutAttempted, () => ({
    ...initialAuthState,
  }))
);
