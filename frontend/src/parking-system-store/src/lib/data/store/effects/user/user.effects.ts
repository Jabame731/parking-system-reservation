import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserRepository } from '../../../repositories';
import * as fromUser from '../../actions/user/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userRepo = inject(UserRepository);
  private snackBar = inject(MatSnackBar);

  initiateGetAllUserAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUser.getUsersAttempted),
      switchMap(() => {
        return this.userRepo.getAllUsers().pipe(
          map((res) =>
            fromUser.getUserSucceeded({
              users: res,
            }),
          ),
          catchError((err) => {
            console.log('failes ?');

            return of(fromUser.getUsersFailed({ error: err }));
          }),
        );
      }),
    );
  });

  initiateEditUserAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUser.editUserAttempted),
      switchMap((action) => {
        return this.userRepo.editUser(action.data).pipe(
          map(() => {
            action.callBacks.onSuccess();
            this.snackBar.open('User updated successfully', 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return fromUser.editUserSucceeded({ data: action.data });
          }),
          catchError((err) => {
            const cleanMessage = err.message.replace('Error: ', '');
            this.snackBar.open(cleanMessage, 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            action.callBacks.onFailure?.({ errorMsg: cleanMessage });
            return [fromUser.editUserFailed({ error: cleanMessage })];
          }),
        );
      }),
    );
  });

  initiateDeleteUserAttempted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUser.deleteUserAttempted),
      switchMap((action) => {
        return this.userRepo.deleteUser(action.id).pipe(
          map(() => {
            this.snackBar.open('User deleted successfully', 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return fromUser.deleteUserSucceeded({ id: action.id });
          }),
          catchError((err) => {
            const cleanMessage = err.message.replace('Error: ', '');
            this.snackBar.open(cleanMessage, 'x', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5 * 1000,
            });
            return [fromUser.deleteUserFailed({ error: err })];
          }),
        );
      }),
    );
  });
}
