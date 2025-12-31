import { Component, inject, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUp, Login } from '../../components';
import { SignInAttributes, SignUpAttributes } from '../../models';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthUsecase } from '@parking-system-store/lib/usecases';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth',
  imports: [SignUp, Login, MatButton, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authRepository = inject(AuthUsecase);

  userAuthProfile = toSignal(this.authRepository.authProfile$);
  userAuthLoading = toSignal(this.authRepository.loading$);
  userAuthError = toSignal(this.authRepository.error$);

  isRegisterLoading = toSignal(this.authRepository.isRegisterLoading$);
  isRegisterSucceeded = toSignal(this.authRepository.isRegisterSucceeded$);
  getSuccessRegisterMessage = toSignal(this.authRepository.getSuccessRegisterMessage$);
  getRegisterErrorMessage = toSignal(this.authRepository.getRegisterErrorMessage$);

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
    const email: string = data.value?.email;
    const password: string = data.value?.password;
    if (data.value !== undefined) {
      this.authRepository.login(email, password);
    }
  }

  handleSubmitRegister(data: NgForm) {
    if (data.value !== undefined) {
      const { cPassword, ...registerData } = data.value;
      this.authRepository.register(registerData);
      data.resetForm();
    }
  }
}
