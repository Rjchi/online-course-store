import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TiendaGuestService } from '../service/tienda-guest.service';

declare function HOMEINIT([]): any;
declare var $: any;
@Component({
  selector: 'app-landing-course',
  templateUrl: './landing-course.component.html',
  styleUrls: ['./landing-course.component.css'],
})
export class LandingCourseComponent {
  course: any;
  slug: string = '';

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
    });

    setTimeout(() => {
      HOMEINIT($);
    }, 50);
  }
}
