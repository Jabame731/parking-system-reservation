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

@Component({
  selector: 'app-parking',
  imports: [CdkPortal, CommonModule, ParkingCardStatus, MatIcon, ParkingCardAvailability],
  templateUrl: './parking.html',
  styleUrl: './parking.scss',
})
export class Parking implements OnInit, OnDestroy {
  private pageTitlePortal = inject(PageTitlePortal);
  private dialog = inject(MatDialog);

  @ViewChild(CdkPortal) pageTitle!: CdkPortal;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageTitlePortal.setPortal(this.pageTitle);
    });
  }

  handleAddReservation(data: any) {
    this.dialog.open(AddParkingReservation);
  }

  ngOnDestroy(): void {
    if (this.pageTitle?.isAttached) {
      this.pageTitle.detach();
      this.pageTitlePortal.setPortal(null!);
    }
  }
}
