import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthenticationService } from '../../services/authentication.service';
import {
  signInSuccess,
  signInFail,
  signIn,
  signUp,
  signUpSuccess,
  signUpFail,
  checkAuthentication,
  checkAuthenticationSuccess,
  logOut,
  logOutSuccess,
  sendVerificationEmail,
  sendVerificationEmailSuccess,
  sendVerificationEmailFail,
  sendLostPasswordEmail,
  sendLostPasswordEmailSuccess,
  sendLostPasswordEmailFail,
  updateLostPassword,
  updateLostPasswordSuccess,
  updateLostPasswordFail,
  changeEmail,
  changeEmailSuccess,
  changeEmailFail,
  changePassword,
  changePasswordSuccess,
  changePasswordFail
} from './user.actions';

@Injectable()
export class UserEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthentication),
      switchMap(() =>
        this.userService.me().pipe(
          map(user =>
            checkAuthenticationSuccess({ connected: true, user: user })
          ),
          catchError(() =>
            of(checkAuthenticationSuccess({ connected: false, user: null }))
          )
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      exhaustMap(action =>
        this.userService.signin(action).pipe(
          map(user => signInSuccess({ user })),
          catchError(err => of(signInFail({error: err.error})))
        )
      )
    )
  );
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      exhaustMap(action =>
        this.userService.signup(action).pipe(
          map(user => signUpSuccess({ user })),
          catchError(err => of(signUpFail(err)))
        )
      )
    )
  );
  signinOrSignupSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(signInSuccess || signUpSuccess),
        tap((payload) => {
          localStorage.setItem('access_token', payload.user.access_token);
          return this.router.navigateByUrl('/profile');
      })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      exhaustMap(() =>
        this.userService.logout().pipe(
          map(() => logOutSuccess())
        )
      )
    )
  );
  logOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOutSuccess),
      tap(() => {
        localStorage.removeItem('access_token');
        return this.router.navigateByUrl('/');
      })
    ),
    { dispatch: false }
  );

  sendVerificationEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendVerificationEmail),
      exhaustMap(() =>
        this.userService.sendVerificationEmail().pipe(
          map(() => sendVerificationEmailSuccess()),
          catchError((error) => of(sendVerificationEmailFail({error})))
        )
      )
    )
  );
  sendVerificationEmailSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendVerificationEmailSuccess || changeEmailSuccess),
      tap(() =>
        this.snackBar.open('Verification email has been sent !', null, { duration: 1500 })
      )
    ),
    {dispatch: false}
  );

  sendLostPasswordEmail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendLostPasswordEmail),
        exhaustMap((action) =>
          this.userService.lostPassword({email: action.email}).pipe(
            map(() => sendLostPasswordEmailSuccess()),
            catchError((error) => of(sendLostPasswordEmailFail({error})))
          )
        )
      )
    );

  changeLostPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLostPassword),
      exhaustMap((action) =>
        this.userService.changeLostPassword(action).pipe(
          map(() =>  updateLostPasswordSuccess()),
          catchError((error) => of(updateLostPasswordFail({error})))
        )
      )
    )
  );

  changeEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeEmail),
      exhaustMap((action) =>
        this.userService.changeEmail(action).pipe(
          map(() =>  changeEmailSuccess()),
          catchError((error) => of(changeEmailFail({error})))
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      exhaustMap((action) =>
        this.userService.changePassword(action).pipe(
          map(() => changePasswordSuccess()),
          catchError((error) => of(changePasswordFail({error})))
        )
      )
    )
  );
  changePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordSuccess),
      tap(() =>
        this.snackBar.open('Password successfully changed !', null, { duration: 1500 })
      )
    ),
    {dispatch: false}
  );

  snackbarError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendVerificationEmailFail || changeEmailFail || changePasswordFail),
      tap((payload) =>
        this.snackBar.open(payload.error && payload.error.message, null, { duration: 1500 }))
      ),
    {dispatch: false}
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private userService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}
}
