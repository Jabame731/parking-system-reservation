import { UserResponseModel } from '../../data/models';
import { Observable } from 'rxjs';

export interface AuthRepositoryInterface {
  login(email: string, password: string): Observable<UserResponseModel>;
}
