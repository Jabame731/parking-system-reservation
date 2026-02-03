import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUsecase } from '@parking-system-store/lib/usecases';
import { combineLatest, map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyAuthenticatedGuard {
  private authUsecase = inject(AuthUsecase);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return combineLatest([this.authUsecase.isAuthenticated$, this.authUsecase.userRole$]).pipe(
      take(1),
      map(([isAuth, role]) => ({
        isAuthenticated: isAuth ?? false,
        role: role,
      })),
      tap(({ isAuthenticated, role }) => {
        if (isAuthenticated) {
          const targetRoute = role === 'admin' ? '/analytics' : '/dashboard';
          this.router.navigate([targetRoute]);
        }
      }),
      map(({ isAuthenticated }) => !isAuthenticated),
    );
  }
}

export const VerifyAuthenticatedGuardFn: CanActivateFn = (route, state) => {
  return inject(VerifyAuthenticatedGuard).canActivate();
};
