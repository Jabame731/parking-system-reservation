import { Component, inject, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
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
import { ParkingUsecase } from '@parking-system-store/lib/usecases';
import { toSignal } from '@angular/core/rxjs-interop';
import { ParkingSlotItemsPipe } from 'projects/app/pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ParkingSlotConverted } from '../../models';

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
  ],
  templateUrl: './parking.html',
  styleUrl: './parking.scss',
})
export class Parking implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);
  private parkingUsecase = inject(ParkingUsecase);
  private dialog = inject(MatDialog);

  parkingSlotData = toSignal(this.parkingUsecase.parkingData$);
  loading = toSignal(this.parkingUsecase.loading$);

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
      },
    });
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }
}
