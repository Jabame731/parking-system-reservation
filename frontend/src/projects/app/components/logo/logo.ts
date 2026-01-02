import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  title = input<string>();

  expanded = input<boolean | undefined>();
}
