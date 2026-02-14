import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeleteItemModal, EditUserModal, UsersTable } from '../../components';
import { PageTitlePortal } from '../../services';
import { UserUsecase } from '@parking-system-store/lib/usecases';
import { MatDialog } from '@angular/material/dialog';
import { CdkPortal } from '@angular/cdk/portal';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../models';
import { EditUserData } from '@parking-system-store/public-api';

@Component({
  selector: 'app-users',
  imports: [UsersTable, CdkPortal],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);
  private userUsecase = inject(UserUsecase);
  private dialog = inject(MatDialog);

  loading = toSignal(this.userUsecase.loading$);
  data = toSignal(this.userUsecase.data$);

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  handleDeleteUser(data: { user: User }) {
    const dialogRef = this.dialog.open(DeleteItemModal, {
      data: {
        label: data.user.firstName,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!!res) {
        this.userUsecase.deleteUser(data.user.id);
      }
    });
  }

  handleEditUser(data: { user: User }) {
    this.dialog.open(EditUserModal, {
      width: '600px',
      data: {
        onSubmit: this.editUser.bind(this),
        user: data.user,
        id: data.user.id,
      },
    });
  }

  editUser({
    user,
    onSuccess,
    onFailure,
  }: {
    user: EditUserData;
    id: string;
    onSuccess: () => void;
    onFailure: (errors: { errorMsg: string }) => void;
  }) {
    this.userUsecase.editUserData(user, {
      onSuccess,
      onFailure,
    });
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }
}
