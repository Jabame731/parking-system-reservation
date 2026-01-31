import { RouterModule, Routes } from '@angular/router';
import { Auth, Dashboard, Parking, Shell, Transactions, Users } from './app/container';
import { NgModule } from '@angular/core';
import { ParkingSlotGuard } from './app/guards';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      //admin only
      {
        path: 'analytics',
        component: Dashboard,
        title: 'Admin Dashboard',
      },
      {
        path: 'users',
        component: Users,
        title: 'Users',
      },
      //users and admin
      {
        path: 'dashboard',
        component: Parking,
        canActivate: [ParkingSlotGuard],
        title: 'Parking Slot',
      },
      {
        path: 'history',
        component: Transactions,
        title: 'Transactions',
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
