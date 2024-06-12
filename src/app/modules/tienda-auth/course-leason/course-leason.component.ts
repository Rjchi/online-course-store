import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  clase_selected: any = null;
  clases_selecteds: any = [];

  constructor(
    public router: Router,
    public toaster: Toaster,
    public sanitizer: DomSanitizer,
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
          this.clase_selected = this.course.malla_curricular[0].clases[0];
        }
      });
  }

  selectedClass(clase: any) {
    this.clase_selected = clase;
  }

  urlVideo(clase: any) {
    if (clase && clase.vimeo_id) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(clase.vimeo_id);
    } else {
      return (this.clase_selected = null);
    }
  }

  checkedClass(clase: any) {
    let index = this.clases_selecteds.findIndex((item: any) => {
      item === clase._id;
    });

    if (index != -1) { // = a -1 no existe
      this.clases_selecteds.splice(index, 1);
    } else {
      this.clases_selecteds.push(clase._id);
    }
  }
}
