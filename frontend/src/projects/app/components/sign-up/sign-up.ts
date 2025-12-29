import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatError, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SubmitButton } from '../submit-button/submit-button';
import { SignUpAttributes } from '../../models';
import { PasswordMatch } from '../../directives';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatError,
    MatLabel,
    MatProgressSpinner,
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    SubmitButton,
    PasswordMatch,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  input = input<SignUpAttributes>();
}
