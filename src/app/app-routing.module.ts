import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./modules/tienda-guest/tienda-guest.module').then(
        (m) => m.TiendaGuestModule
      ),
  },
  {
    path: 'store-auth',
    loadChildren: () =>
      import('./modules/tienda-auth/tienda-auth.module').then(
        (m) => m.TiendaAuthModule
      ),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
