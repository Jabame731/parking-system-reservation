import { Component, input } from '@angular/core';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatCellDef,
  MatHeaderRowDef,
  MatCell,
  MatRow,
  MatRowDef,
  MatNoDataRow,
  MatHeaderRow,
} from '@angular/material/table';
import { SkeletonText } from '../skeleton-text/skeleton-text';
import { EmptyHistoryMessage } from '../empty-history-message/empty-history-message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-table-history',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatHeaderRow,
    MatHeaderRowDef,
    CommonModule,
    SkeletonText,
    EmptyHistoryMessage,
  ],
  templateUrl: './transactions-table-history.html',
  styleUrl: './transactions-table-history.scss',
})
export class TransactionsTableHistory {
  dataSource = input<any>();

  skeleton = input<boolean | null>(false);

  displayedColumns = ['plateNumber', 'slotName', 'date', 'timeStart', 'paymentType'];

  trackById = (index: any, item: any) => {
    return item.id || index;
  };
}
