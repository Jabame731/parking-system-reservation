import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentity } from './user-identity';

describe('UserIdentity', () => {
  let component: UserIdentity;
  let fixture: ComponentFixture<UserIdentity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIdentity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIdentity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
