import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores';
import { User } from '../../models/user.model';
import { logOut, sendVerificationEmail, changeEmail, changePassword } from '../../stores/user/user.actions';

import { PasswordEditorComponent } from '../../dialogs/password-editor/password-editor.component';
import { EmailEditorComponent } from '../../dialogs/email-editor/email-editor.component';

@Component({
  selector: 'muser-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> = this.store.select(fromRoot.getConnectedUser);

  constructor(
    private store: Store<fromRoot.AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {}

  logout() {
    this.store.dispatch(logOut());
  }

  changePassword() {
    const dialogRef = this.dialog.open(PasswordEditorComponent, { panelClass: 'classic-dialog' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(changePassword({ old_password: result.old_password, new_password: result.new_password }));
      }
    });
  }

  changeEmail() {
    const dialogRef = this.dialog.open(EmailEditorComponent, { panelClass: 'classic-dialog' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(changeEmail(result));
      }
    });
  }

  sendVerificationEmail() {
    this.store.dispatch(sendVerificationEmail());
  }
}
