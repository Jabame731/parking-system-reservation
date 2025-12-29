import { Observable } from 'rxjs';
import { UserResponseModel } from './user.attributes.model';

export interface AuthInterface {
  login(email: string, password: string): Observable<UserResponseModel>;
}
