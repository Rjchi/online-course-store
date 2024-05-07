import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TiendaGuestService } from '../service/tienda-guest.service';

declare function HOMEINIT([]): any;
declare var $: any;
declare function magnigyPopup([]): any;
declare function showMoreBtn([]): any;
@Component({
  selector: 'app-landing-course',
  templateUrl: './landing-course.component.html',
  styleUrls: ['./landing-course.component.css'],
})
export class LandingCourseComponent {
  course: any;
  slug: string = '';
  courses_relateds: any[] = [];
  courses_instructor: any[] = [];

  constructor(
    public tiendaGuestService: TiendaGuestService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.slug = params.slug;
    });

    this.tiendaGuestService.showCourse(this.slug).subscribe((response: any) => {
      console.log(response);
      this.course = response.course;
      this.courses_relateds = response.course_relateds;
      this.courses_instructor = response.course_instructor;

      setTimeout(() => {
        HOMEINIT($);
        magnigyPopup($);
        showMoreBtn($);
      }, 50);
    });
  }
}
