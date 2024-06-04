import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

import { TiendaAuthService } from '../service/tienda-auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  navOpt: number = 6;

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
    reader.onloadend = () => this.avatar_prev = reader.result;
  }

  navOption(option: number) {
    this.navOpt = option;
  }

  showDetails(sale: any) {
    sale.is_detail = true;
  }

  logout() {
    console.log('logout');
  }
}
