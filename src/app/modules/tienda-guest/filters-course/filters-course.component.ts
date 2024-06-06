import { Component } from '@angular/core';

import { TiendaGuestService } from '../service/tienda-guest.service';

@Component({
  selector: 'app-filters-course',
  templateUrl: './filters-course.component.html',
  styleUrls: ['./filters-course.component.css'],
})
export class FiltersCourseComponent {
  levels: any = [];
  idiomas: any = [];
  categories: any = [];
  intructores: any = [];

  constructor(public tiendaGuestService: TiendaGuestService) {}

  ngOnInit(): void {
    this.tiendaGuestService.getConfigAll().subscribe((response: any) => {
      this.levels = response.levels;
      this.idiomas = response.idiomas;
      this.categories = response.categories;
      this.intructores = response.intructores;
    });
  }
}
