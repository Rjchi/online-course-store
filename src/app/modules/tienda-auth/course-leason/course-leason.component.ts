import { Component } from '@angular/core';

import { TiendaAuthService } from '../service/tienda-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-leason',
  templateUrl: './course-leason.component.html',
  styleUrls: ['./course-leason.component.css'],
})
export class CourseLeasonComponent {
  slug: string = '';

  constructor(
    public tiendaAuthService: TiendaAuthService,
    public activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: any) => {
      this.slug = params.slug;
    });

    this.tiendaAuthService
      .courseLeason(this.slug)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
