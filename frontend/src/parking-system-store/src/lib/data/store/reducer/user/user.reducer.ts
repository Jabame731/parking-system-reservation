import { createReducer, on } from '@ngrx/store';
import { User } from '../../../models';
import * as fromUser from '../../actions/user/user.actions';
import * as fromAuth from '../../actions/auth/auth.actions';

export const userFeatureKey = 'userz';

export interface UserState {
  data: User[];
  loading: boolean;
  loaded: boolean;
  error: null | string;
}

export const initialUserState: UserState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
};

export const intiateUserReducer = createReducer(
  initialUserState,
  on(fromUser.getUsersAttempted, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(fromUser.getUsersFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    };
  }),
  on(fromUser.getUserSucceeded, (state, { users }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null,
      data: users,
    };
  }),
  on(fromUser.editUserSucceeded, (state, { data }) => {
    return {
      ...state,
      data: state.data.map((user) => (user.id === data.id ? { ...user, ...data } : user)),
    };
  }),
  on(fromUser.deleteUserSucceeded, (state, { id }) => {
    const updatedData = state.data.filter((user) => user.id !== id);

    return {
      ...state,
      data: updatedData,
    };
  }),
  on(fromAuth.logoutAttempted, () => initialUserState),
);
