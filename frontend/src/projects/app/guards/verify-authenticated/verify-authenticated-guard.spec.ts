import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { VerifyAuthenticatedGuardFn } from './verify-authenticated-guard';

describe('verifyAuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => VerifyAuthenticatedGuardFn(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
