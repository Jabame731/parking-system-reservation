import { inject, Injectable } from '@angular/core';
import { UserRepositoryInterface } from '../../../domain';
import { UserDatasource } from '../../datasources';
import { EditUserData, User } from '@parking-system-store/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements UserRepositoryInterface {
  private userDatasource = inject(UserDatasource);

  getAllUsers(): Observable<User[]> {
    return this.userDatasource.getAllUsers();
  }

  editUser(data: EditUserData): Observable<boolean> {
    return this.userDatasource.editUser(data);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.userDatasource.deleteUser(id);
  }
}
