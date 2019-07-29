import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores';

@Component({
  selector: 'muser-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isConnected$: Observable<boolean> = this.store.select(fromRoot.isUserConnected);

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() { }

}
