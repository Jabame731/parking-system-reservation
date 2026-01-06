import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingCardStatus } from './parking-card-status';

describe('ParkingCardStatus', () => {
  let component: ParkingCardStatus;
  let fixture: ComponentFixture<ParkingCardStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingCardStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingCardStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
