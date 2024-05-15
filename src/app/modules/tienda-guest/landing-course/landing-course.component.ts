import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../home/service/cart.service';
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
  campaing_special: any = null;
  courses_relateds: any[] = [];
  courses_instructor: any[] = [];

  user: any;

  constructor(
    public toaster: Toaster,
    public cartService: CartService,
    public activatedRoute: ActivatedRoute,
    public tiendaGuestService: TiendaGuestService,
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.user = this.cartService.authService.user;

    this.activatedRoute.params.subscribe((params: any) => {
      this.slug = params.slug;
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.campaing_special = params.campaing_discount;
    })

    this.tiendaGuestService.showCourse(this.slug, this.campaing_special).subscribe((response: any) => {
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

  addCart() {
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
      total: this.getTotalPriceCourse(this.course),
      course: { _id: this.course._id },
      discount: this.course.discount_g ? this.course.discount_g.discount : null,
      subtotal: this.getTotalPriceCourse(this.course),
      price_unit: this.course.price_usd,
      code_cupon: null,
      type_discount: this.course.discount_g
        ? this.course.discount_g.type_discount
        : null,
      code_discount: this.course.discount_g
        ? this.course.discount_g._id
        : null,
      campaing_discount: this.course.discount_g
        ? this.course.discount_g.type_campaing
        : null,
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
