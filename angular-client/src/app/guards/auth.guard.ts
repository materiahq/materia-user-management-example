import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(state => state.user.inited) isInited$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.isInited$.pipe(
      filter(inited => inited === true),
      map(() => {
        const isConnected = this.store.selectSnapshot<boolean>((state) => state.user.connected);
        if ( ! isConnected) {
          this.store.dispatch(new Navigate(['/']));
          return false;
        }
        return true;
      })
    );
  }
}
