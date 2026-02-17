import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserUsecase } from '@parking-system-store/lib/usecases';

export const UserGuard: CanActivateFn = (route, state) => {
  const userUsecase = inject(UserUsecase);

  return userUsecase.getUsers();
};
