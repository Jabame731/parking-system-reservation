import { RegisterUserData, UserResponseModel } from '../../data/models';
import { Observable } from 'rxjs';

export interface AuthRepositoryInterface {
  login(email: string, password: string): Observable<UserResponseModel>;
  register(data: RegisterUserData): Observable<{ message: string }>;
}
