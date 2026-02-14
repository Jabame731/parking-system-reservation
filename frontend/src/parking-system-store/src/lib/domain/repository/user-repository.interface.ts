import { EditUserData, User } from '../../data/models';
import { Observable } from 'rxjs';

export interface UserRepositoryInterface {
  getAllUsers(): Observable<User[]>;
  editUser(data: EditUserData): Observable<boolean>;
  deleteUser(id: string): Observable<boolean>;
}
