import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingReservation } from './add-parking-reservation';

describe('AddParkingReservation', () => {
  let component: AddParkingReservation;
  let fixture: ComponentFixture<AddParkingReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParkingReservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParkingReservation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
