import { TestBed } from '@angular/core/testing';

import { ReservationDatasource } from './reservation-datasource';

describe('ReservationDatasource', () => {
  let service: ReservationDatasource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationDatasource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
