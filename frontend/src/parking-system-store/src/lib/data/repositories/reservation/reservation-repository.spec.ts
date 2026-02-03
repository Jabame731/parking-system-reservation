import { TestBed } from '@angular/core/testing';

import { ReservationRepository } from './reservation-repository';

describe('ReservationRepository', () => {
  let service: ReservationRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
