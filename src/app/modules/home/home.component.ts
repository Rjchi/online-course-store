import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

import { HomeService } from './service/home.service';

declare function HOMEINIT([]): any;
declare var $: any;
declare function countdownT(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  CATEGORIES: any[] = [];
  COURSES_TOP: any[] = [];
  CAMPAING_FLASH: any = [];
  COURSES_FLASH: any[] = [];
  CAMPAING_BANNER: any = [];
  COURSES_BANNER: any[] = [];
  COURSES_SECTIONS: any[] = [];

  constructor(
    public toaster: Toaster,
    public homeService: HomeService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    let time_now = new Date().getTime();

    this.homeService.home(time_now + '').subscribe((response: any) => {
      console.log(response);
      this.CATEGORIES = response.categories;
      this.COURSES_TOP = response.courses_top;
      this.COURSES_FLASH = response.courses_flash;
      this.COURSES_BANNER = response.courses_banner;
      this.CAMPAING_FLASH = response.campaing_flash;
      this.CAMPAING_BANNER = response.campaing_banner;
      this.COURSES_SECTIONS = response.courses_sections;

      setTimeout(() => {
        HOMEINIT($);
        countdownT();
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

  getParseDate(date: Date, type: number = 1) {
    if (type === 1) {
      return this.datePipe.transform(date, 'YYYY/MM/dd', 'UTC');
    } else {
      return this.datePipe.transform(date, 'YYYY-MM-dd', 'UTC');
    }
  }
}
