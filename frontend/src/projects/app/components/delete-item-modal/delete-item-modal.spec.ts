import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemModal } from './delete-item-modal';

describe('DeleteItemModal', () => {
  let component: DeleteItemModal;
  let fixture: ComponentFixture<DeleteItemModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteItemModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteItemModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
