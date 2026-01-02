import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../../repositories/index';
import { Router } from '@angular/router';
import * as fromAuth from '../../actions/auth.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserResponseModel } from '@parking-system-store/lib/data/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authRepository = inject(AuthRepository);
  private snackBar = inject(MatSnackBar);

  private router = inject(Router);

  initiateLoginAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.initiateLoginAttempted),
      switchMap((action) => {
        const { email, password } = action;
        return this.authRepository.login(email, password).pipe(
          map((data: UserResponseModel) => fromAuth.initiateLoginSucceeded({ data })),
          catchError((error) => {
            this.snackBar.open(error, 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return of(fromAuth.initiateLoginFailed({ email, password, error }));
          })
        );
      })
    );
  });

  initiateRegisterAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.initiateRegisterAttempted),
      switchMap((action) => {
        const { data } = action;

        return this.authRepository.register(data).pipe(
          map((response) => {
            this.snackBar.open(response.message, 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return fromAuth.initiateRegisterSucceeded({
              response: response.message,
            });
          }),
          catchError((error) => {
            this.snackBar.open(error, 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return of(fromAuth.initiateRegisterFailed({ error }));
          })
        );
      })
    );
  });

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuth.logoutAttempted),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
