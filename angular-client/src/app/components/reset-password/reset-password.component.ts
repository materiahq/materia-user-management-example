import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChangeLostPassword, CheckConnection } from '../../stores/user/user.state';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'muser-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  params: any;

  get passwordsMatch() {
    return this.form &&
      this.form.value &&
      this.form.value.new_password.length &&
      this.form.value.new_password === this.form.value.new_password_2;
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      new_password: ['', Validators.required],
      new_password_2: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  ngOnInit() { }

  confirm() {
    if (this.form.valid && this.passwordsMatch) {
      console.log({ new_password: this.form.value.new_password, id_user: parseInt(this.params.id_user, 10), key: this.params.key });
      this.store.dispatch(
        new ChangeLostPassword({ new_password: this.form.value.new_password,
          id_user: parseInt(this.params.id_user, 10), key: this.params.key })
      ).subscribe(() => {
        this.store.dispatch(new CheckConnection())
        .subscribe(
          () => this.store.dispatch(new Navigate(['/profile'])),
          errorResponse => this.snackBar.open(errorResponse.error, null, {duration: 1500})
        );
      }, errorResponse => this.snackBar.open(errorResponse.error, null, {duration: 1500}));
    }
  }
}
