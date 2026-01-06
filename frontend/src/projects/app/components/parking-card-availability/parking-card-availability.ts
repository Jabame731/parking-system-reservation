import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';

export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface ParkingSlot {
  id: string;
  status: SlotStatus;
  plate?: string;
}

@Component({
  selector: 'app-parking-card-availability',
  imports: [MatCardModule, MatIcon, NgClass, CommonModule],
  templateUrl: './parking-card-availability.html',
  styleUrl: './parking-card-availability.scss',
})
export class ParkingCardAvailability {
  slots: ParkingSlot[] = [
    { id: 'A1', status: 'reserved' },
    { id: 'A2', status: 'occupied', plate: 'MT 81 YA 4915' },
    { id: 'A3', status: 'occupied', plate: 'BP 39 ND 4608' },
    { id: 'A4', status: 'occupied', plate: 'MB 19 AQ 6980' },
    { id: 'A5', status: 'available' },
    { id: 'A6', status: 'available' },
    { id: 'A7', status: 'available' },
    { id: 'A8', status: 'available' },
    { id: 'A9', status: 'occupied', plate: 'WX 71 EB 9064' },
  ];

  @Output() handleReservation: EventEmitter<{
    slot: any;
  }> = new EventEmitter<{
    slot: any;
  }>();

  onSlotClick(slot: any) {
    this.handleReservation.emit(slot);
  }
}
