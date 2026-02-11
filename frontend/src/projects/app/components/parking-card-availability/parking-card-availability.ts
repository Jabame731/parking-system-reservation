import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { ParkingSlotConverted, Stats } from '../../models';
import { PaypalReservationButton } from '../paypal-reservation-button/paypal-reservation-button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-parking-card-availability',
  imports: [
    MatCardModule,
    MatIcon,
    CommonModule,
    PaypalReservationButton,
    MatProgressSpinner,
    MatIconButton,
  ],
  templateUrl: './parking-card-availability.html',
  styleUrl: './parking-card-availability.scss',
})
export class ParkingCardAvailability {
  slots = input<ParkingSlotConverted[]>();
  loading = input<boolean>();
  userId = input<string>();
  userRole = input<string>();

  @Output() handleReservation: EventEmitter<{
    slot: ParkingSlotConverted;
  }> = new EventEmitter<{
    slot: ParkingSlotConverted;
  }>();

  @Output() handleDelete: EventEmitter<{
    id: string;
    name: string;
  }> = new EventEmitter<{
    id: string;
    name: string;
  }>();

  onSlotClick(slot: ParkingSlotConverted) {
    this.handleReservation.emit({ slot });
  }

  onDeleteSlot(id: string, name: string) {
    this.handleDelete.emit({ id, name });
  }
}
