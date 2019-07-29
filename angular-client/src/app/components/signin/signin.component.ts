import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Store} from '@ngrx/store';
import { signIn, sendLostPasswordEmail } from '../../stores/user/user.actions';
import { isAuthenticationProcessing, AppState } from '../../stores';

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
  isProcessing$: Observable<boolean> = this.store.select(isAuthenticationProcessing);

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
    private store: Store<AppState>,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.form.valid) {
      this.processing = true;
      this.store.dispatch(signIn(this.form.value));
    }
  }

  lostPassword() {
    const dialogRef = this.dialog.open(LostPasswordComponent, {panelClass: 'classic-dialog'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(sendLostPasswordEmail(result))
      }
    });
  }
}
