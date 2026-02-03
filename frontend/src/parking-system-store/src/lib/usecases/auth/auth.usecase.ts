import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../data/store';
import { RegisterUserData } from '../../data/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUsecase {
  private store = inject(Store<fromStore.AuthState>);

  authProfile$ = this.store.pipe(select(fromStore.getAuthProfile));

  loading$ = this.store.pipe(select(fromStore.isLoading));

  error$ = this.store.pipe(select(fromStore.authError));

  isAuthenticated$ = this.store.pipe(select(fromStore.getAuthenticated));

  userRole$ = this.store.pipe(select(fromStore.userRole));

  getAuthFullName$ = this.store.pipe(select(fromStore.getUserName));

  //register
  isRegisterLoading$ = this.store.pipe(select(fromStore.isRegisterLoading));

  isRegisterSucceeded$ = this.store.pipe(select(fromStore.isRegisterSucceeded));

  getSuccessRegisterMessage$ = this.store.pipe(select(fromStore.getSuccessRegisterMessage));

  getRegisterErrorMessage$ = this.store.pipe(select(fromStore.getRegisterErrorMessage));

  //token
  getAccessToken$ = this.store.pipe(select(fromStore.getAccessToken));

  login(email: string, password: string) {
    this.store.dispatch(
      fromStore.initiateLoginAttempted({
        email,
        password,
      }),
    );
  }

  register(data: RegisterUserData) {
    this.store.dispatch(fromStore.initiateRegisterAttempted({ data }));
  }

  logOut() {
    this.store.dispatch(fromStore.logoutAttempted());
  }

  getAccessToken(): Observable<string | undefined> {
    return this.store.select(fromStore.getAccessToken);
  }
}
