import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsComponent } from './carts/carts.component';
import { TiendaAuthRoutingModule } from './tienda-auth-routing.module';
import { TiendaAuthComponent } from './tienda-auth.component';


@NgModule({
  declarations: [
    CartsComponent,
    TiendaAuthComponent
  ],
  imports: [
    CommonModule,
    TiendaAuthRoutingModule
  ]
})
export class TiendaAuthModule { }
