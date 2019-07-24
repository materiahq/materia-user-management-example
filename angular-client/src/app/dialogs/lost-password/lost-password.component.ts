import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'muser-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
  form: FormGroup;

  get emailControl() {
    return this.form.get('email');
  }

  get emailControlErrors(): any {
    return this.emailControl.errors;
  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LostPasswordComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  confirm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
