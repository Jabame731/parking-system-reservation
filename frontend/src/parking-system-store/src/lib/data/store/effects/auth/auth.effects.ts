import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../../repositories/index';
import { Router } from '@angular/router';
import * as fromAuth from '../../actions/auth.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserResponseModel } from '@parking-system-store/lib/data/models';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authRepository = inject(AuthRepository);

  private router = inject(Router);

  initiateLoginAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuth.initiateLoginAttempted),
      switchMap((action) => {
        const { email, password } = action;

        return this.authRepository.login(email, password).pipe(
          map((data: UserResponseModel) => fromAuth.initiateLoginSucceeded({ data })),
          catchError((error) => {
            return of(fromAuth.initiateLoginFailed({ email, password, error }));
          })
        );
      })
    );
  });
}
