import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { TiendaGuestComponent } from './tienda-guest.component';
import { LandingCourseComponent } from './landing-course/landing-course.component';
import { TiendaGuestRoutingModule } from './tienda-guest-routing.module';


@NgModule({
  declarations: [
    TiendaGuestComponent,
    LandingCourseComponent
  ],
  imports: [
    CommonModule,
    TiendaGuestRoutingModule,

    FormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class TiendaGuestModule { }
