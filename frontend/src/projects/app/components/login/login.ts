import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubmitButton } from '../submit-button/submit-button';
import { SignInAttributes } from '../../models';

@Component({
  selector: 'app-login',
  imports: [
    MatError,
    MatLabel,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,

    SubmitButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading = input<boolean>();

  error = input<string>();

  input = input<SignInAttributes>();

  isHandset = input<boolean>();

  @Output() submit = new EventEmitter<NgForm>();

  login(data: NgForm) {
    this.submit.emit(data);
  }
}
