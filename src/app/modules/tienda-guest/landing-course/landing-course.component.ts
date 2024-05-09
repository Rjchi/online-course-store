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
    window.scroll(0, 0);

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

  getNewTotal(course: any, campaing_banner: any) {
    if (campaing_banner.type_discount === 1) {
      return Math.round(
        course.price_usd - course.price_usd * (campaing_banner.discount * 0.01)
      );
    } else {
      return Math.round(course.price_usd - campaing_banner.discount);
    }
  }

  getTotalPriceCourse(COURSE: any) {
    if (COURSE.discount_g) {
      return this.getNewTotal(COURSE, COURSE.discount_g);
    } else {
      return COURSE.price_usd;
    }
  }
}
