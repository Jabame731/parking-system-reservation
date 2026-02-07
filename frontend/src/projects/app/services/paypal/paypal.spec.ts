import { TestBed } from '@angular/core/testing';

import { PaypalService } from './paypal';

describe('Paypal', () => {
  let service: PaypalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaypalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
