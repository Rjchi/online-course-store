import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

import { HomeService } from './service/home.service';
import { CartService } from './service/cart.service';

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

  user: any;

  constructor(
    public toaster: Toaster,
    public datePipe: DatePipe,
    public homeService: HomeService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.user = this.cartService.authService.user;

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

  addCart(course: any) {
    if (!this.user) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR CON TU CUENTA AL SISTEMA',
        caption: 'VALIDATIONS',
        type: 'danger',
      });
      this.cartService.authService.router.navigateByUrl('auth/login');

      return;
    }

    let data = {
      total: course.price_usd,
      course: { _id: course._id },
      discount: null,
      subtotal: course.price_usd,
      price_unit: course.price_usd,
      code_cupon: null,
      type_discount: null,
      code_discount: null,
      campaing_discount: null,
    };

    this.cartService.registerCart(data).subscribe((response: any) => {
      if (response.message && response.message === 403) {
        this.toaster.open({
          text: response.message_text,
          caption: 'VALIDATIONS',
          type: 'danger',
        });
      } else {
        this.cartService.addCart(response.cart);

        this.toaster.open({
          text: response.message_text,
          caption: 'VALIDATIONS',
          type: 'primary',
        });
      }
    });
  }
}
