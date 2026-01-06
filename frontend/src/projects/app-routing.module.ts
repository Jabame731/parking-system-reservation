import { RouterModule, Routes } from '@angular/router';
import { Auth, Parking, Shell, Transactions } from './app/container';
import { NgModule } from '@angular/core';

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
      {
        path: 'dashboard',
        component: Parking,
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
