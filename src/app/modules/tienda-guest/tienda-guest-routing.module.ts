import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TiendaGuestComponent } from './tienda-guest.component';
import { LandingCourseComponent } from './landing-course/landing-course.component';
import { FiltersCourseComponent } from './filters-course/filters-course.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaGuestComponent,
    children: [
      {
        path: 'landig-course/:slug',
        component: LandingCourseComponent,
      },
      {
        path: 'filters-course',
        component: FiltersCourseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaGuestRoutingModule {}
