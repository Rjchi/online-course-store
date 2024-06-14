import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartsComponent } from './carts/carts.component';
import { TiendaAuthComponent } from './tienda-auth.component';
import { CourseLeasonComponent } from './course-leason/course-leason.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaAuthComponent,
    children: [
      {
        path: 'shopping-cart',
        component: CartsComponent,
      },
      {
        path: 'student-profile',
        component: StudentDashboardComponent,
      },
      {
        path: 'course-leason/:slug',
        component: CourseLeasonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaAuthRoutingModule {}
