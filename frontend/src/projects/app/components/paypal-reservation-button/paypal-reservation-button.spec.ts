import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalReservationButton } from './paypal-reservation-button';

describe('PaypalReservationButton', () => {
  let component: PaypalReservationButton;
  let fixture: ComponentFixture<PaypalReservationButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalReservationButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalReservationButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
