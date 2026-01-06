import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonText } from './skeleton-text';

describe('SkeletonText', () => {
  let component: SkeletonText;
  let fixture: ComponentFixture<SkeletonText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
