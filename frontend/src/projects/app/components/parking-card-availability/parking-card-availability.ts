import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { ParkingSlotConverted } from '../../models';

@Component({
  selector: 'app-parking-card-availability',
  imports: [MatCardModule, MatIcon, NgClass, CommonModule],
  templateUrl: './parking-card-availability.html',
  styleUrl: './parking-card-availability.scss',
})
export class ParkingCardAvailability {
  slots = input<ParkingSlotConverted[]>();

  @Output() handleReservation: EventEmitter<{
    slot: ParkingSlotConverted;
  }> = new EventEmitter<{
    slot: ParkingSlotConverted;
  }>();

  onSlotClick(slot: ParkingSlotConverted) {
    this.handleReservation.emit({ slot });
  }
}
