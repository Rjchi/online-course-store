import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

import { TiendaAuthService } from '../service/tienda-auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  navOpt: number = 4;

  actived_course_count: number = 0;
  enrolled_course_count: number = 0;
  termined_course_count: number = 0;

  profile: any = null;

  actived_course_news: any = null;
  termined_course_news: any = null;
  enrolled_course_news: any = null;

  sales: any = null;

  name: string = '';
  email: string = '';
  phone: string = '';
  avatar: any = null;
  surname: string = '';
  birthday: string = '';
  password: string = '';
  profession: string = '';
  avatar_prev: any = null;
  description: string = '';
  password_confir: string = '';

  rating: number = 0;
  sales_details: any = null;
  description_review: string = '';
  sale_detail_selected: any = null;

  constructor(
    public toaster: Toaster,
    public tiendaAuthService: TiendaAuthService
  ) {}

  ngOnInit(): void {
    this.tiendaAuthService.profileStudent().subscribe((response: any) => {
      console.log(response);
      this.actived_course_count = response.activated_course_count;
      this.enrolled_course_count = response.enrolled_course_count;
      this.termined_course_count = response.termined_course_count;

      this.profile = response.profile;

      this.name = this.profile.name;
      this.email = this.profile.email;
      this.phone = this.profile.phone;
      // this.avatar = this.profile.avatar
      this.surname = this.profile.surname;
      this.birthday = this.profile.birthday;
      this.avatar_prev = this.profile.avatar;
      this.profession = this.profile.profession;
      this.description = this.profile.description;

      this.actived_course_news = response.actived_course_news;
      this.termined_course_news = response.termined_course_news;
      this.enrolled_course_news = response.enrolled_course_news;

      this.sales = response.sales;
      this.sales_details = response.sales_details;
    });
  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this.toaster.open({
        text: 'NECESITA UN ARCHIVO DE TIPO IMAGEN',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    this.avatar = $event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.avatar);
    reader.onloadend = () => (this.avatar_prev = reader.result);
  }

  navOption(option: number) {
    this.navOpt = option;
  }

  showDetails(sale: any) {
    sale.is_detail = true;
  }

  updateStudent() {
    if (!this.name || !this.surname || !this.email) {
      this.toaster.open({
        text: 'NECESITAS COMPLETAR LOS CAMPOS',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    if (this.password != this.password_confir) {
      this.toaster.open({
        text: 'LA CONTRASEÑA DEBE SER IGUAL',
        caption: 'VALIDACIONES',
        type: 'danger',
      });
      return;
    }

    let formData = new FormData();

    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }
    formData.append('surname', this.surname);
    if (this.password) {
      formData.append('password', this.password);
    }
    if (this.birthday) {
      formData.append('birthday', this.birthday);
    }
    formData.append('profession', this.profession);
    formData.append('description', this.description);

    this.tiendaAuthService
      .updateStudent(formData)
      .subscribe((response: any) => {
        if (response.message === 403) {
          this.toaster.open({
            text: response.msg,
            caption: 'VALIDACIONES',
            type: 'danger',
          });

          return;
        } else {
          this.toaster.open({
            text: response.msg,
            caption: 'VALIDACIONES',
            type: 'primary',
          });

          localStorage.setItem(
            'user',
            JSON.stringify({
              name: this.name,
              email: this.email,
              surname: this.surname,
            })
          );
        }
      });
  }

  showReview(sale_detail: any) {
    this.sale_detail_selected = sale_detail;
  }

  saveReview() {
    if (this.rating === 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR UNA CLASIFICACIÓN',
        caption: 'VALIDACIONES',
        type: 'primary',
      });

      return;
    }

    if (!this.description_review) {
      this.toaster.open({
        text: 'NECESITAR INGRESAR UNA DESCRIPCIÓN',
        caption: 'VALIDACIONES',
        type: 'primary',
      });

      return;
    }

    const data = {
      rating: this.rating,
      description: this.description_review,
      sale_detail: this.sale_detail_selected._id,
      course: this.sale_detail_selected.course._id,
    };

    this.tiendaAuthService.reviewRegister(data).subscribe((response: any) => {
      this.toaster.open({
        text: response.message_text,
        caption: 'VALIDACIONES',
        type: 'primary',
      });

      this.rating = 0;
      this.description_review = "";
      this.sale_detail_selected = null;
    });
  }

  selectedRating(option: number) {
    this.rating = option;
  }

  back() {
    this.sale_detail_selected = null;
  }

  logout() {
    console.log('logout');
  }
}
