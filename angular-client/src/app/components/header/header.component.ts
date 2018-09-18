import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../stores/user/user.state';

@Component({
  selector: 'muser-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(state => state.user.connected) isConnected$: Observable<boolean>;
  @Select(state => state.user.email) email$: Observable<string>;
  connected: boolean;

  constructor(private store: Store) { }

  ngOnInit() {
    this.isConnected$.subscribe(connected => {
      this.connected = connected;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
