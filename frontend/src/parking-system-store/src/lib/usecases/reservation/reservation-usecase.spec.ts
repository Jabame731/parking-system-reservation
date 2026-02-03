import { TestBed } from '@angular/core/testing';

import { ReservationUsecase } from './reservation-usecase';

describe('ReservationUsecase', () => {
  let service: ReservationUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
