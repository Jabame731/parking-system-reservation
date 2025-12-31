import { Observable } from 'rxjs';
import { RegisterUserData, UserResponseModel } from './user.attributes.model';

export interface AuthInterface {
  login(email: string, password: string): Observable<UserResponseModel>;
  registerUser(data: RegisterUserData): Observable<{ message: string }>;
}
