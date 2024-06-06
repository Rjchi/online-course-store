import { Component } from '@angular/core';

import { TiendaGuestService } from '../service/tienda-guest.service';

declare var $: any;
@Component({
  selector: 'app-filters-course',
  templateUrl: './filters-course.component.html',
  styleUrls: ['./filters-course.component.css'],
})
export class FiltersCourseComponent {
  levels: any = [];
  idiomas: any = [];
  categories: any = [];
  instructores: any = [];

  constructor(public tiendaGuestService: TiendaGuestService) {}

  ngOnInit(): void {
    this.tiendaGuestService.getConfigAll().subscribe((response: any) => {
      this.levels = response.levels;
      this.idiomas = response.idiomas;
      this.categories = response.categories;
      this.instructores = response.instructores;
    });

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
