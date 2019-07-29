import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './stores';
import { checkAuthentication } from './stores/user/user.actions';

@Component({
  selector: 'muser-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.store.dispatch(checkAuthentication());
  }
}
