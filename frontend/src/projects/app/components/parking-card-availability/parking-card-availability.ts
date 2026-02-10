import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { ParkingSlotConverted, Stats } from '../../models';
import { PaypalReservationButton } from '../paypal-reservation-button/paypal-reservation-button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-parking-card-availability',
  imports: [MatCardModule, MatIcon, CommonModule, PaypalReservationButton, MatProgressSpinner],
  templateUrl: './parking-card-availability.html',
  styleUrl: './parking-card-availability.scss',
})
export class ParkingCardAvailability {
  slots = input<ParkingSlotConverted[]>();
  loading = input<boolean>();
  userId = input<string>();

  @Output() handleReservation: EventEmitter<{
    slot: ParkingSlotConverted;
  }> = new EventEmitter<{
    slot: ParkingSlotConverted;
  }>();

  onSlotClick(slot: ParkingSlotConverted) {
    this.handleReservation.emit({ slot });
  }
}
