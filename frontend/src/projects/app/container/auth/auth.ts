import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUp, Login } from '../../components';
import { SignInAttributes, SignUpAttributes } from '../../models';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [SignUp, Login, MatButton, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  showSignUp = signal<boolean>(false);

  inputSignIn: SignInAttributes = { email: '', password: '' };
  inputSignUp: SignUpAttributes = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    contactNumber: '',
    password: '',
    cPassword: '',
  };

  switchToSignUp() {
    this.showSignUp.set(true);
  }

  switchToSignIn() {
    this.showSignUp.set(false);
  }

  handleSubmitLogin(data: NgForm) {
    const email = data.value?.email;
    const password = data.value?.password;
    if (data.value !== undefined) {
      console.log(email, password);
    }
  }
}
