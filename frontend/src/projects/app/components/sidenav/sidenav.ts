import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { SideNavMenuItem } from 'projects/app/models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  isExpanded = input<boolean | undefined>(false);

  menuItems = input<SideNavMenuItem[]>([]);

  canClose = input<boolean | undefined>(true);

  @Output() toggleExpansion = new EventEmitter();
}
