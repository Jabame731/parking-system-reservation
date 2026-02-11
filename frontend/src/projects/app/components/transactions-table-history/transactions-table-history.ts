import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
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
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

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
    MatButtonModule,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatIcon,
  ],
  templateUrl: './transactions-table-history.html',
  styleUrl: './transactions-table-history.scss',
})
export class TransactionsTableHistory {
  dataSource = input<Reservation[]>([]);

  userRole = input<string>();

  skeleton = input<boolean | null>(false);

  @Output() handleDeleteReservation: EventEmitter<{
    reservation: Reservation;
  }> = new EventEmitter<{ reservation: Reservation }>();

  @Output() handleUpdateReservation: EventEmitter<{
    id: string;
  }> = new EventEmitter<{ id: string }>();

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

  handleDelete(reservation: Reservation) {
    this.handleDeleteReservation.emit({ reservation });
  }

  handleUpdate(id: string) {
    this.handleUpdateReservation.emit({ id });
  }

  trackById = (index: any, item: any) => {
    return item.id || index;
  };
}
