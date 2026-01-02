import { RouterModule, Routes } from '@angular/router';
import { Auth, Shell } from './app/container';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
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
