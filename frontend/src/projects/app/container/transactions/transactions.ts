import { CdkPortal } from '@angular/cdk/portal';
import { Component, computed, effect, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageTitlePortal } from 'projects/app/services';
import { TransactionsTableHistory } from 'projects/app/components';
import { AuthUsecase } from '@parking-system-store/lib/usecases';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReservationStore } from '@parking-system-store/public-api';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Reservation } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemModal } from '../../components';
@Component({
  selector: 'app-transactions',
  imports: [CdkPortal, MatButtonModule, AsyncPipe, TransactionsTableHistory, JsonPipe],
  providers: [ReservationStore],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);
  private authUsecase = inject(AuthUsecase);
  private reservationStore = inject(ReservationStore);
  private dialog = inject(MatDialog);

  user$ = this.authUsecase.authProfile$;

  user = toSignal(this.user$);

  userId = computed(() => {
    return this.user()?.id;
  });
  userRole$ = this.authUsecase.userRole$;

  data$ = this.reservationStore.data$;

  loading$ = this.reservationStore.loading$;

  userRole = toSignal(this.userRole$);

  data = toSignal(this.data$);
  loading = toSignal(this.loading$);

  callReservationEffect = effect(() => {
    const role = this.userRole();
    const uid = this.userId();

    if (!role || !uid) return;

    if (role === 'admin') {
      this.reservationStore.getAllReservations();
    } else {
      this.reservationStore.getReservationsByUserId({ userId: uid });
    }
  });

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  openDeleteModal(data: { reservation: Reservation }) {
    const dialogRef = this.dialog.open(DeleteItemModal, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!!res) {
        this.reservationStore.deleteReservation({ reservationId: data.reservation.id });
      }
    });
  }

  updateReservation(data: { id: string }) {
    if (data.id) {
      this.reservationStore.updateReservation({ reservationId: data.id });
    }
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }
}
