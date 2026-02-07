import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { PageTitlePortal } from 'projects/app/services';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  AddParkingReservation,
  ParkingCardAvailability,
  ParkingCardStatus,
} from 'projects/app/components';
import {
  AuthUsecase,
  ParkingUsecase,
  ReservationUsecase,
} from '@parking-system-store/lib/usecases';
import { toSignal } from '@angular/core/rxjs-interop';
import { ParkingSlotItemsPipe } from 'projects/app/pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ParkingSlotConverted } from '../../models';
import { CreateReservation } from '@parking-system-store/public-api';
import { CdkNoDataRow } from '@angular/cdk/table';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { environment } from '@parking-system-store/environments/environment.development';

@Component({
  selector: 'app-parking',
  imports: [
    CdkPortal,
    CommonModule,
    ParkingCardStatus,
    MatIcon,
    ParkingCardAvailability,
    ParkingSlotItemsPipe,
    MatProgressSpinner,
    CdkNoDataRow,
    NgxPayPalModule,
  ],
  templateUrl: './parking.html',
  styleUrl: './parking.scss',
})
export class Parking implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);
  private parkingUsecase = inject(ParkingUsecase);
  private authUsecase = inject(AuthUsecase);
  private reservationUsecase = inject(ReservationUsecase);
  private dialog = inject(MatDialog);

  parkingSlotData = toSignal(this.parkingUsecase.parkingData$);
  loading = toSignal(this.parkingUsecase.loading$);
  authProfile = toSignal(this.authUsecase.authProfile$);

  userId = computed(() => {
    return this.authProfile()?.id;
  });

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  handleAddReservation(data: { slot: ParkingSlotConverted }) {
    this.dialog.open(AddParkingReservation, {
      data: {
        slot: data.slot,
        onSubmit: this.addReservation.bind(this),
      },
    });
  }

  addReservation({
    data,
    onSuccess,
    onFailure,
  }: {
    data: CreateReservation;
    onSuccess: () => void;
    onFailure: (errors: { errorMsg: string }) => void;
  }) {
    const reservationData = {
      ...data,
      userId: this.userId()!,
    };

    this.reservationUsecase.addReservation(reservationData, {
      onSuccess: () => {
        onSuccess();
      },
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
