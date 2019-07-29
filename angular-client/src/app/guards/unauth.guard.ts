import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../stores';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  private isInited$: Observable<boolean> = this.store.select(fromRoot.isUserInited);

  constructor(private store: Store<fromRoot.AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.isInited$.pipe(
      filter(inited => inited === true),
      withLatestFrom(this.store.select(fromRoot.isUserConnected)),
      map(([isInited, isConnected ]) => {
        if (isConnected) {
          this.router.navigateByUrl('/profile');
          return false;
        }
        return true;
      })
    );
  }
}
