import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SkeletonText } from '../skeleton-text/skeleton-text';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-parking-card-status',
  imports: [MatCardModule, SkeletonText, NgClass, MatIcon],
  templateUrl: './parking-card-status.html',
  styleUrl: './parking-card-status.scss',
})
export class ParkingCardStatus {
  loading = input<boolean>();

  cardCount = input<number>();

  cardIcon = input<string>();

  cardTitle = input<string>();

  bgColor = input<'bg-primary' | 'bg-accent' | 'bg-green-700' | 'bg-primary-800' | 'bg-alert-700'>(
    'bg-primary',
  );
}
