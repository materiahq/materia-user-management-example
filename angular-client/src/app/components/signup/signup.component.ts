import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup, CheckConnection } from '../../stores/user/user.state';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'muser-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

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

  constructor(private fb: FormBuilder, private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signup() {
    if (this.form.valid) {
      this.store.dispatch(new Signup(this.form.value))
        .subscribe(
          () => this.store.dispatch(new CheckConnection())
            .subscribe(() => {
              this.store.dispatch(new Navigate(['/profile']));
            },
              (err) => this.snackBar.open(err.error, null, { duration: 1500 })
            ),
          (err) => this.snackBar.open(err.error, null, { duration: 1500 }));
    }
  }
}
