import { TestBed } from '@angular/core/testing';

import { ParkingUsecase } from './parking.usecase';

describe('ParkingUsecase', () => {
  let service: ParkingUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
