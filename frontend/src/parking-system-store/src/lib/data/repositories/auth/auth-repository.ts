import { inject, Injectable } from '@angular/core';
import { AuthRepositoryInterface } from '../../../domain/index';
import { Observable } from 'rxjs';
import { RegisterUserData, UserResponseModel } from '../../models';
import { AuthDatasource } from '../../datasources/index';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements AuthRepositoryInterface {
  private authDatasource = inject(AuthDatasource);

  login(email: string, password: string): Observable<UserResponseModel> {
    return this.authDatasource.login(email, password);
  }

  register(data: RegisterUserData): Observable<{ message: string }> {
    return this.authDatasource.registerUser(data);
  }
}
