import { createAction, props } from '@ngrx/store';
import { RegisterUserData, UserResponseModel } from '../../models';

export const initiateLoginAttempted = createAction(
  '[Auth] Initiate Login Attempted',
  props<{ email: string; password: string }>()
);

export const initiateLoginSucceeded = createAction(
  '[Auth] Initiate Login Succeeded',
  props<{ data: UserResponseModel }>()
);

export const initiateLoginFailed = createAction(
  '[Auth] Initiate Login Failed',
  props<{ email: string; password: string; error: any }>()
);

export const initiateRegisterAttempted = createAction(
  '[Auth] Initiate Register Attempted',
  props<{
    data: RegisterUserData;
  }>()
);

export const initiateRegisterSucceeded = createAction(
  '[Auth] Initiate Register Succeeded',
  props<{ response: string }>()
);

export const initiateRegisterFailed = createAction(
  '[Auth] Initiate Register Failed',
  props<{ error: any }>()
);

export const logoutAttempted = createAction('[Auth] Logout Attempted');
