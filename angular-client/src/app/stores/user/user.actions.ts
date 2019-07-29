import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const checkAuthentication = createAction(
  '[User] Check authentication'
);
export const checkAuthenticationSuccess = createAction(
  '[User] Check authentication success',
  props<{connected: boolean, user: User | null}>()
);

export const signIn = createAction(
  '[User] Sign-in',
  props<{ email: string; password: string }>()
);
export const signInSuccess = createAction(
  '[User] Sign-in Success',
  props<{user: User}>()
);
export const signInFail = createAction(
  '[User] Sign-in Fail',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[User] Sign-up',
  props<{ email: string; password: string }>()
);
export const signUpSuccess = createAction(
  '[User] Sign-up Success',
  props<{user: User}>()
);
export const signUpFail = createAction(
  '[User] Sign-up Fail',
  props<{ error: any }>()
);

export const logOut = createAction(
  '[User] Logout'
);
export const logOutSuccess = createAction(
  '[User] Logout success'
);

export const sendVerificationEmail = createAction(
  '[User] Send verification email'
);
export const sendVerificationEmailSuccess = createAction(
  '[User] Send verification email success'
);
export const sendVerificationEmailFail = createAction(
  '[User] Send verification email fail',
  props<{error: any}>()
);

export const changePassword = createAction(
  '[User] Change password',
  props<{new_password: string, old_password: string}>()
);
export const changePasswordSuccess = createAction(
  '[User] Change password success'
);
export const changePasswordFail = createAction(
  '[User] Change password fail',
  props<{error: any}>()
);

export const changeEmail = createAction(
  '[User] Change email',
  props<{new_email: string}>()
);
export const changeEmailSuccess = createAction(
  '[User] Change email success'
);
export const changeEmailFail = createAction(
  '[User] Change email fail',
  props<{error: any}>()
);

export const sendLostPasswordEmail = createAction(
  '[User] Send lost password email',
  props<{email: string}>()
);
export const sendLostPasswordEmailSuccess = createAction(
  '[User] Send lost password email success'
);
export const sendLostPasswordEmailFail = createAction(
  '[User] Send lost password email fail',
  props<{error: any}>()
);

export const updateLostPassword = createAction(
  '[User] Update lost password',
  props<{key: string, id_user: number, new_password: string}>()
);
export const updateLostPasswordSuccess = createAction(
  '[User] Update lost password success'
);
export const updateLostPasswordFail = createAction(
  '[User] Update lost password fail',
  props<{error: any}>()
);
