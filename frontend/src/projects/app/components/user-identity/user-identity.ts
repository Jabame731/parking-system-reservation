import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-user-identity',
  imports: [CommonModule],
  templateUrl: './user-identity.html',
  styleUrl: './user-identity.scss',
})
export class UserIdentity {
  username = input<{ firstName: string; lastName: string } | null>(null);

  clickEnabled = input<boolean>(false);

  isSmall = input<boolean>(false);

  skeleton = input<boolean>(false);

  skeletonMinLineWidth = input<number>(100);

  skeletonMaxLineWidth = input<number>(300);

  enableContainerQuery = input<boolean>(false);

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
}
