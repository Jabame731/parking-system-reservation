import { TestBed } from '@angular/core/testing';

import { ParkingRepository } from './parking-repository';

describe('ParkingRepository', () => {
  let service: ParkingRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
