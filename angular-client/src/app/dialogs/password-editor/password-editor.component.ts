import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'muser-password-editor',
  templateUrl: './password-editor.component.html',
  styleUrls: ['./password-editor.component.scss']
})
export class PasswordEditorComponent implements OnInit {
  form: FormGroup;

  get passwordsMatch() {
    return this.form.value && this.form.value.new_password.length && this.form.value.new_password === this.form.value.new_password_2;
  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PasswordEditorComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      new_password_2: ['', Validators.required]
    });
  }

  confirm() {
    if (this.form.valid && this.passwordsMatch) {
      this.dialogRef.close(this.form.value);
    }
  }

}
