import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ParkingSlotGuard } from './parking-slot-guard';

describe('parkingSlotGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => ParkingSlotGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
