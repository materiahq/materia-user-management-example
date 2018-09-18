import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'muser-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(state => state.user.connected) isConnected$: Observable<boolean>;
  user: any;
  isConnected: boolean;

  constructor() { }

  ngOnInit() {
    this.isConnected$.subscribe(connected => this.isConnected = connected);
  }

}
