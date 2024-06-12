import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { ActivatedRoute, Router } from '@angular/router';

import { TiendaAuthService } from '../service/tienda-auth.service';
@Component({
  selector: 'app-course-leason',
  templateUrl: './course-leason.component.html',
  styleUrls: ['./course-leason.component.css'],
})
export class CourseLeasonComponent {
  slug: string = '';
  course: any = null;

  constructor(
    public router: Router,
    public toaster: Toaster,
    public activatedRouter: ActivatedRoute,
    public tiendaAuthService: TiendaAuthService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: any) => {
      this.slug = params.slug;
    });

    this.tiendaAuthService
      .courseLeason(this.slug)
      .subscribe((response: any) => {
        console.log(response);
        if (response.message && response.message === 403) {
          this.toaster.open({
            text: response.message_text,
            caption: 'VALIDATIONS',
            type: 'danger',
          });

          this.router.navigateByUrl('/');
          return;
        } else {
          this.course = response.course;
        }
      });
  }
}
