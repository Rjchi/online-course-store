import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartsComponent } from './carts/carts.component';
import { TiendaAuthComponent } from './tienda-auth.component';
import { TiendaAuthRoutingModule } from './tienda-auth-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseLeasonComponent } from './course-leason/course-leason.component';

@NgModule({
  declarations: [
    CartsComponent,
    TiendaAuthComponent,
    StudentDashboardComponent,
    CourseLeasonComponent
  ],
  imports: [
    CommonModule,
    TiendaAuthRoutingModule,

    FormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class TiendaAuthModule { }
