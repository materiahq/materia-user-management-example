import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';

export interface UserState {
  inited: boolean;
  connected: boolean;
  processing: boolean;
  user?: User;
}

export const initialState: UserState = {
  inited: false,
  connected: false,
  processing: false
};

const userReducer = createReducer(
  initialState,
  on(UserActions.checkAuthenticationSuccess, (state, payload) => ({
    ...state,
    inited: true,
    connected: payload.connected,
    user: payload.user
  })),
  on(UserActions.signIn || UserActions.signUp, state => ({
    ...state,
    processing: true
  })),
  on(
    UserActions.signInSuccess || UserActions.signUpSuccess,
    (state, action) => ({
      ...state,
      processing: false,
      connected: true,
      user: action.user
    })
  ),
  on(UserActions.signInFail || UserActions.signUpFail, state => ({
    ...state,
    processing: false,
    connected: false
  })),
  on(UserActions.logOutSuccess, state => ({
    ...state,
    user: null,
    connected: false
  }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
