import { RouterModule, Routes } from '@angular/router';
import { Auth, Dashboard, Parking, Shell, Transactions, Users } from './app/container';
import { NgModule } from '@angular/core';
import { AuthGuardFn, ParkingSlotGuard, UserGuard, VerifyAuthenticatedGuardFn } from './app/guards';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    canActivate: [AuthGuardFn],
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      //admin only
      {
        path: 'analytics',
        component: Dashboard,
        canActivate: [UserGuard, ParkingSlotGuard],
        title: 'Admin Dashboard',
      },
      {
        path: 'users',
        component: Users,
        canActivate: [UserGuard],
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
        path: 'history/:id',
        component: Transactions,
        title: 'Transactions',
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
    canActivate: [VerifyAuthenticatedGuardFn],
    title: 'Credentials',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
