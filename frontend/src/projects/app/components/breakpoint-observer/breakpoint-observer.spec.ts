import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointObserver } from './breakpoint-observer';

describe('BreakpointObserver', () => {
  let component: BreakpointObserver;
  let fixture: ComponentFixture<BreakpointObserver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakpointObserver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakpointObserver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
