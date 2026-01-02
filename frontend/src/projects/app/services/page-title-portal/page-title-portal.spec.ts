import { TestBed } from '@angular/core/testing';

import { PageTitlePortal } from './page-title-portal';

describe('PageTitlePortal', () => {
  let service: PageTitlePortal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitlePortal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
