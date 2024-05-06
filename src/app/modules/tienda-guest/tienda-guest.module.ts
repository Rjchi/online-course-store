import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaGuestRoutingModule } from './tienda-guest-routing.module';
import { TiendaGuestComponent } from './tienda-guest.component';


@NgModule({
  declarations: [
    TiendaGuestComponent
  ],
  imports: [
    CommonModule,
    TiendaGuestRoutingModule
  ]
})
export class TiendaGuestModule { }
