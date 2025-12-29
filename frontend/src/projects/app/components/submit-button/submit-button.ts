import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-button',
  imports: [MatButton, MatIcon, MatProgressSpinner, CommonModule],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.scss',
})
export class SubmitButton {
  text = input<string>('Submit');

  isDisabled = input<boolean | null>(false);

  isHandset = input<boolean>(false);

  isLoading = input<boolean>(false);

  icon = input<string>();

  color = input<ThemePalette>('primary');

  type = input<string>('submit');

  form = input();
}
