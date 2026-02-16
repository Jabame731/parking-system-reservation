import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../data/store';
import { Callbacks, EditUserData } from '../../data/models';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUsecase {
  private store = inject(Store<fromStore.UserState>);

  loading$ = this.store.pipe(select(fromStore.loading));

  loaded$ = this.store.pipe(select(fromStore.loaded));

  error$ = this.store.pipe(select(fromStore.error));

  data$ = this.store.pipe(select(fromStore.getUserData));

  getUsers(): Observable<boolean> {
    const loading = this.store.pipe(select(fromStore.loading));
    const loaded = this.store.pipe(select(fromStore.loaded));

    return combineLatest([loaded, loading]).pipe(
      tap(([loaded, loading]) => {
        if (!loaded && !loading) {
          this.store.dispatch(fromStore.getUsersAttempted());
        }
      }),
      filter(([loaded]) => loaded),
      map(() => true),
    );
  }

  editUserData(data: EditUserData, callBacks: Callbacks) {
    this.store.dispatch(
      fromStore.editUserAttempted({
        data,
        callBacks,
      }),
    );
  }

  deleteUser(id: string) {
    this.store.dispatch(
      fromStore.deleteUserAttempted({
        id,
      }),
    );
  }
}
