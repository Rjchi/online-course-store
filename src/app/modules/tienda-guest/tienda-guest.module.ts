import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaGuestRoutingModule } from './tienda-guest-routing.module';
import { TiendaGuestComponent } from './tienda-guest.component';
import { LandingCourseComponent } from './landing-course/landing-course.component';


@NgModule({
  declarations: [
    TiendaGuestComponent,
    LandingCourseComponent
  ],
  imports: [
    CommonModule,
    TiendaGuestRoutingModule
  ]
})
export class TiendaGuestModule { }
