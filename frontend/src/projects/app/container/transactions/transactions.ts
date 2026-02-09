import { CdkPortal } from '@angular/cdk/portal';
import { Component, computed, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageTitlePortal } from 'projects/app/services';
import { TransactionsTableHistory } from 'projects/app/components';
import { AuthUsecase } from '@parking-system-store/lib/usecases';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReservationStore } from '@parking-system-store/public-api';
import { AsyncPipe, JsonPipe } from '@angular/common';

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

  callReservationAPIbyUserRole = computed(() => {
    if (this.userRole() === 'admin') {
      return this.reservationStore.getAllReservations();
    } else {
      return this.reservationStore.getReservationsByUserId({ userId: this.userId()! });
    }
  });

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    this.callReservationAPIbyUserRole();

    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }

  dataSource = [];
}
