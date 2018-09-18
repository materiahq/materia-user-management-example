import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser, Logout, ChangePassword, ChangeEmail } from '../../stores/user/user.state';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PasswordEditorComponent } from '../../dialogs/password-editor/password-editor.component';
import { EmailEditorComponent } from '../../dialogs/email-editor/email-editor.component';

@Component({
  selector: 'muser-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(state => state.user) user$: Observable<IUser>;

  constructor(private store: Store, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  changePassword() {
    const dialogRef = this.dialog.open(PasswordEditorComponent, { panelClass: 'classic-dialog' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(new ChangePassword({old_password: result.old_password, new_password: result.new_password})).subscribe(() => {
          this.snackBar.open('Password successfully changed !', null, {duration: 1500});
        });
      }
    });
  }

  changeEmail() {
    const dialogRef = this.dialog.open(EmailEditorComponent, { panelClass: 'classic-dialog' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'cancel') {
        this.store.dispatch(new ChangeEmail(result)).subscribe(() => {
          this.snackBar.open(`A verification email has been sent to '${ result.new_email }' !`, null, {duration: 1500});
        });
      }
    });
  }

}
