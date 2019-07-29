import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromRoot from '../../stores';
import { logOut } from '../../stores/user/user.actions';

@Component({
  selector: 'muser-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isConnected$: Observable<boolean> = this.store.select(fromRoot.isUserConnected);
  email$: Observable<string> = this.store.select(fromRoot.getConnectedUser).pipe(
    map(user => user && user.email)
  );

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() { }

  logout() {
    this.store.dispatch(logOut());
  }

}
