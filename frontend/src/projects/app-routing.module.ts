import { RouterModule, Routes } from '@angular/router';
import { Auth } from './app/container';
import { NgModule } from '@angular/core';

export const routes: Routes = [
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
