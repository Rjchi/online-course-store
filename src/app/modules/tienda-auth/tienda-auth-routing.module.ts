import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartsComponent } from './carts/carts.component';
import { TiendaAuthComponent } from './tienda-auth.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaAuthComponent,
    children: [
      {
        path: 'shopping-cart',
        component: CartsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaAuthRoutingModule {}
