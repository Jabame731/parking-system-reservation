import { TestBed } from '@angular/core/testing';

import { ParkingDatasource } from './parking-datasource';

describe('Parking', () => {
  let service: ParkingDatasource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingDatasource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
