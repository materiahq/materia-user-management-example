import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Signin, LostPassword } from '../../stores/user/user.state';
import { LostPasswordComponent } from '../../dialogs/lost-password/lost-password.component';

@Component({
  selector: 'muser-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: any;
  processing: boolean;

  get emailControl() {
    return this.form.get('email');
  }

  get emailControlErrors(): {required?: boolean; email?: boolean} {
    return this.form.get('email') ? this.form.get('email').errors : null;
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get passwordControlErrors(): {required?: boolean} {
    return this.form.get('password') ? this.form.get('password').errors : null;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn() {
    if (this.form.valid) {
      this.processing = true;
      this.store.dispatch(new Signin(this.form.value)).subscribe(
        () => this.store.dispatch(new Navigate(['/profile'])),
        (response) => {
          this.processing = false;
          this.errorMessage = response && response.error ? response.error.message : 'Internal error';
        });
    }
  }

  lostPassword() {
    const dialogRef = this.dialog.open(LostPasswordComponent, {panelClass: 'classic-dialog'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(new LostPassword(result)).subscribe(
          () => {
            this.snackBar.open(`A reset password email has been sent to ${result.email}`, null, {duration: 1500});
        },
        (errorResponse) => {
          this.snackBar.open(errorResponse.error, null, {duration: 1500});
        }
        );
      }
    });
  }
}
