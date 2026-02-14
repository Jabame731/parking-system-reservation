import { Observable } from 'rxjs';
import { EditUserData, User } from './user.attributes.model';

export interface UserInterface {
  getAllUsers(): Observable<User[]>;
  editUser(data: EditUserData): Observable<boolean>;
  deleteUser(id: string): Observable<boolean>;
}
