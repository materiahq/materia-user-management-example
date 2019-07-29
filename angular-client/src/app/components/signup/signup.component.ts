import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores';
import { signUp } from '../../stores/user/user.actions';

@Component({
  selector: 'muser-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  isProcessing$: Observable<boolean> = this.store.select(fromRoot.isAuthenticationProcessing);

  get emailControl() {
    return this.form.get('email');
  }

  get emailControlErrors(): { required?: boolean; email?: boolean } {
    return this.form.get('email') ? this.form.get('email').errors : null;
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get passwordControlErrors(): { required?: boolean } {
    return this.form.get('password') ? this.form.get('password').errors : null;
  }

  constructor(private fb: FormBuilder, private store: Store<fromRoot.AppState>, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signup() {
    if (this.form.valid) {
      this.store.dispatch(signUp(this.form.value));
    }
  }
}
