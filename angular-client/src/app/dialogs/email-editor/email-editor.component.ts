import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'muser-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements OnInit {
  form: FormGroup;

  get emailControl() {
    return this.form.get('new_email');
  }

  get emailControlErrors(): {required?: boolean; email?: boolean} {
    return this.emailControl.errors;
  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EmailEditorComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      new_email: ['', [Validators.required, Validators.email]]
    });
  }

  confirm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
