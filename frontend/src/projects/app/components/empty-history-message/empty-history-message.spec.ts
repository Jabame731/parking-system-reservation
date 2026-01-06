import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyHistoryMessage } from './empty-history-message';

describe('EmptyHistoryMessage', () => {
  let component: EmptyHistoryMessage;
  let fixture: ComponentFixture<EmptyHistoryMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyHistoryMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyHistoryMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
