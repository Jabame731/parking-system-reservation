import { createAction, props } from '@ngrx/store';
import { Callbacks, EditUserData, User } from '../../../models';

export const getUsersAttempted = createAction('[User] Get All Users Attempted');

export const getUsersFailed = createAction(
  '[User] Get All Users Failed',
  props<{ error: string }>(),
);

export const getUserSucceeded = createAction(
  '[User] Get All Users Succeeded',
  props<{ users: User[] }>(),
);

export const editUserAttempted = createAction(
  '[User] Edit User Attempted',
  props<{ data: EditUserData; callBacks: Callbacks }>(),
);

export const editUserFailed = createAction('[User] Edit User Failed', props<{ error: string }>());

export const editUserSucceeded = createAction(
  '[User] Edit User Succeeded',
  props<{
    data: EditUserData;
  }>(),
);

export const deleteUserAttempted = createAction(
  '[User] Delete User Attempted',
  props<{ id: string }>(),
);

export const deleteUserFailed = createAction(
  '[User] Delete User Failed',
  props<{ error: string }>(),
);

export const deleteUserSucceeded = createAction(
  '[User] Delete User Succeeded',
  props<{
    id: string;
  }>(),
);
