import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingSlotModal } from './add-parking-slot-modal';

describe('AddParkingSlotModal', () => {
  let component: AddParkingSlotModal;
  let fixture: ComponentFixture<AddParkingSlotModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParkingSlotModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParkingSlotModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
