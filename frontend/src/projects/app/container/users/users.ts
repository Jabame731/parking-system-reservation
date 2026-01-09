import { Component } from '@angular/core';
import { UsersTable } from 'projects/app/components';

@Component({
  selector: 'app-users',
  imports: [UsersTable],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {}
