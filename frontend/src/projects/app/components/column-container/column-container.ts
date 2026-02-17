import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, input, Output, TemplateRef } from '@angular/core';
import { BreakpointObserverComponent } from '../breakpoint-observer/breakpoint-observer';
import { SkeletonText } from '../skeleton-text/skeleton-text';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-column-container',
  imports: [SkeletonText, MatIconButton, MatDivider, MatIcon, CommonModule, MatIconButton],
  templateUrl: './column-container.html',
  styleUrl: './column-container.scss',
})
export class ColumnContainer extends BreakpointObserverComponent {
  title = input<string>();

  subtitle = input<string>();

  titleId = input<string>();

  removeHeader = input<boolean>(false);

  isCollapsible = input<boolean>(false);

  headerAction = input<TemplateRef<any>>();

  skeleton = input<boolean>(false);

  isCollapsed = input<boolean>(false);

  @Output() collapseContainer: EventEmitter<any> = new EventEmitter<any>();

  collapse() {
    this.collapseContainer.emit();
  }

  constructor(protected override breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }
}
