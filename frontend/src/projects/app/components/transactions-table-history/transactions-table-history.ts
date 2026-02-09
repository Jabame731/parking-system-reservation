import { Component, computed, input, signal } from '@angular/core';
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
import { CommonModule, DatePipe } from '@angular/common';
import { Reservation } from '../../models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    DatePipe,
    MatProgressSpinner,
  ],
  templateUrl: './transactions-table-history.html',
  styleUrl: './transactions-table-history.scss',
})
export class TransactionsTableHistory {
  dataSource = input<Reservation[]>([]);

  userRole = input<string>();

  skeleton = input<boolean | null>(false);

  displayedColumns = computed(() => {
    const baseColumns = [
      'plateNumber',
      'slotName',
      'carType',
      'timeStart',
      'endTime',
      'paymentType',
      'status',
      'actions',
    ];

    if (this.userRole() === 'user') {
      return baseColumns.filter((col) => col !== 'actions');
    }

    return baseColumns;
  });

  trackById = (index: any, item: any) => {
    return item.id || index;
  };
}
