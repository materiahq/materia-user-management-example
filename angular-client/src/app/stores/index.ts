import { UserState } from './user/user.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  authentication: UserState;
}

export const selectAuthState = (state: AppState) => state.authentication;

export const isUserInited = createSelector(
  selectAuthState,
  (state: UserState) => state.inited
);
export const isAuthenticationProcessing = createSelector(
  selectAuthState,
  (state: UserState) => state.processing
);
export const isUserConnected = createSelector(
  selectAuthState,
  (state: UserState) => state.connected
);
export const getConnectedUser = createSelector(
  selectAuthState,
  (state: UserState) => state.user
);
