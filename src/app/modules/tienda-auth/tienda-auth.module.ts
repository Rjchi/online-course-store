import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaAuthRoutingModule } from './tienda-auth-routing.module';
import { CartsComponent } from './carts/carts.component';


@NgModule({
  declarations: [
    CartsComponent
  ],
  imports: [
    CommonModule,
    TiendaAuthRoutingModule
  ]
})
export class TiendaAuthModule { }
