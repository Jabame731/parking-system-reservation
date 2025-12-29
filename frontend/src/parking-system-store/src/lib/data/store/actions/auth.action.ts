import { createAction, props } from '@ngrx/store';
import { UserResponseModel } from '../../models';

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
