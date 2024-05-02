import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';

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
  CAMPAING_BANNER: any = [];
  COURSES_BANNER: any[] = [];
  COURSES_SECTIONS: any[] = [];

  constructor(public toaster: Toaster, public homeService: HomeService) {}

  ngOnInit(): void {
    let time_now = new Date().getTime();

    this.homeService.home(time_now + '').subscribe((response: any) => {
      console.log(response);
      this.CATEGORIES = response.categories;
      this.COURSES_TOP = response.courses_top;
      this.COURSES_BANNER = response.courses_banner;
      this.CAMPAING_BANNER = response.campaing_banner;
      this.COURSES_SECTIONS = response.courses_sections;
    });

    setTimeout(() => {
      HOMEINIT($);
      countdownT();
    }, 50);
  }

  getNewTotal(course: any, campaing_banner: any) {
    if (campaing_banner.type_discount === 1) {
      return (
        course.price_usd - course.price_usd * (campaing_banner.discount * 0.01)
      );
    } else {
      return course.price_usd - campaing_banner.discount;
    }
  }
}
