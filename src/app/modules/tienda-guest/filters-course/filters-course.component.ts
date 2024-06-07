import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';

import { CartService } from '../../home/service/cart.service';
import { TiendaGuestService } from '../service/tienda-guest.service';

declare var $: any;
@Component({
  selector: 'app-filters-course',
  templateUrl: './filters-course.component.html',
  styleUrls: ['./filters-course.component.css'],
})
export class FiltersCourseComponent {
  select_option: number = 1;

  user: any;
  levels: any = [];
  courses: any = [];
  idiomas: any = [];
  categories: any = [];
  instructores: any = [];
  select_levels: any = [];
  select_idiomas: any = [];
  select_categories: any = [];
  select_instructors: any = [];

  constructor(
    public toaster: Toaster,
    public cartService: CartService,
    public tiendaGuestService: TiendaGuestService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.user = this.cartService.authService.user;

    this.tiendaGuestService.getConfigAll().subscribe((response: any) => {
      this.levels = response.levels;
      this.idiomas = response.idiomas;
      this.categories = response.categories;
      this.instructores = response.instructores;
    });

    this.filterCourses();
  }

  addOption(option: number) {
    this.select_option = option;

    if (this.select_option === 2) {
      setTimeout(() => {
        $('#slider-range').slider({
          range: true,
          min: 10,
          max: 500,
          values: [100, 300],
          slide: function (event: any, ui: any) {
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
          },
        });
        $('#amount').val(
          '$' +
            $('#slider-range').slider('values', 0) +
            ' - $' +
            $('#slider-range').slider('values', 1)
        );
      }, 50);
    }
  }

  addCategorie(idCategorie: string) {
    let index = this.select_categories.findIndex(
      (categorie: any) => categorie._id === idCategorie
    );

    if (index != -1) {
      this.select_categories.splice(index, 1);
    } else {
      this.select_categories.push(idCategorie);
    }

    this.filterCourses();
  }

  addInstructor(idInstructor: string) {
    let index = this.select_instructors.findIndex(
      (instructor: any) => instructor._id === idInstructor
    );

    if (index != -1) {
      this.select_instructors.splice(index, 1);
    } else {
      this.select_instructors.push(idInstructor);
    }

    this.filterCourses();
  }

  addLevels(levelName: string) {
    let index = this.select_levels.findIndex(
      (level: any) => level === levelName
    );

    if (index != -1) {
      this.select_levels.splice(index, 1);
    } else {
      this.select_levels.push(levelName);
    }

    this.filterCourses();
  }

  addIdiomas(idioma: string) {
    let index = this.select_idiomas.findIndex(
      (idiom: any) => idiom === idioma
    );

    if (index != -1) {
      this.select_idiomas.splice(index, 1);
    } else {
      this.select_idiomas.push(idioma);
    }

    this.filterCourses();
  }

  filterCourses() {
    let data = {
      select_levels: this.select_levels,
      select_idiomas: this.select_idiomas,
      select_categories: this.select_categories,
      select_instructors: this.select_instructors,
    };

    this.tiendaGuestService.searchCourse(data).subscribe((response: any) => {
      this.courses = response.courses;
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

  getTotalPriceCourse(course: any) {
    if (course.discount_g) {
      return this.getNewTotal(course, course.discount_g);
    } else {
      return course.price_usd;
    }
  }

  addCart(course: any, campaing: any = null) {
    if (!this.user) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR CON TU CUENTA AL SISTEMA',
        caption: 'VALIDATIONS',
        type: 'danger',
      });
      this.cartService.authService.router.navigateByUrl('auth/login');

      return;
    }

    if (campaing) {
      course.discount_g = campaing;
    }

    let data = {
      total: this.getTotalPriceCourse(course),
      course: { _id: course._id },
      discount: course.discount_g.discount ? course.discount_g.discount : null,
      subtotal: this.getTotalPriceCourse(course),
      price_unit: course.price_usd,
      code_cupon: null,
      type_discount: course.discount_g.type_discount
        ? course.discount_g.type_discount
        : null,
      code_discount: course.discount_g._id ? course.discount_g._id : null,
      campaing_discount: course.discount_g.type_campaing
        ? course.discount_g.type_campaing
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
