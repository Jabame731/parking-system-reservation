import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-history-message',
  imports: [MatIcon],
  template: `
    <div class="flex flex-col justify-center items-center h-full w-full">
      <mat-icon class="!mb-7">{{ icon() }}</mat-icon>

      <p class="text-2xl !font-display font-semibold !mb-7">{{ message() }}</p>
    </div>
  `,
  styles: `
    mat-icon {
      display: flex;
      align-items: center;
      justify-items: center;
      margin-top: 50px;
      transform: scale(2);
    }
  `,
})
export class EmptyHistoryMessage {
  icon = input<string>();

  message = input<string>();
}
