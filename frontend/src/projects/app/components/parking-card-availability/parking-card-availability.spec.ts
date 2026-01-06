import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingCardAvailability } from './parking-card-availability';

describe('ParkingCardAvailability', () => {
  let component: ParkingCardAvailability;
  let fixture: ComponentFixture<ParkingCardAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingCardAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingCardAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
