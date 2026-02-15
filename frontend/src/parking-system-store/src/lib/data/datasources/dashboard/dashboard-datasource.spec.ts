import { TestBed } from '@angular/core/testing';

import { DashboardDatasource } from './dashboard-datasource';

describe('DashboardDatasource', () => {
  let service: DashboardDatasource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDatasource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
