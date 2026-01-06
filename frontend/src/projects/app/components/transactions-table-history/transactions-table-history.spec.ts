import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTableHistory } from './transactions-table-history';

describe('TransactionsTableHistory', () => {
  let component: TransactionsTableHistory;
  let fixture: ComponentFixture<TransactionsTableHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsTableHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsTableHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
