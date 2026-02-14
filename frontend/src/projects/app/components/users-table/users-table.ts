import { Component, EventEmitter, input, Output } from '@angular/core';
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
import { User } from '../../models';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-users-table',
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
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable {
  dataSource = input<User[]>([]);

  @Output() editUser: EventEmitter<{
    user: User;
  }> = new EventEmitter<{ user: User }>();

  @Output() deleteUser: EventEmitter<{
    user: User;
  }> = new EventEmitter<{ user: User }>();

  skeleton = input<boolean | undefined>(false);

  displayedColumns = ['fullName', 'email', 'phoneNumber', 'role', 'address', 'actions'];

  handleEdit(user: User) {
    this.editUser.emit({ user });
  }

  handleDelete(user: User) {
    this.deleteUser.emit({ user });
  }

  trackById = (index: any, item: any) => {
    return item.id || index;
  };
}
