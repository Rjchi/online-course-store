import { Component } from '@angular/core';

import { TiendaAuthService } from '../service/tienda-auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  navOpt: number = 1;

  actived_course_count: number = 0;
  enrolled_course_count: number = 0;
  termined_course_count: number = 0;

  profile: any = null;

  actived_course_news: any = null;
  termined_course_news: any = null;
  enrolled_course_news: any = null;

  constructor(public tiendaAuthService: TiendaAuthService) {}

  ngOnInit(): void {
    this.tiendaAuthService.profileStudent().subscribe((response: any) => {
      console.log(response);
      this.actived_course_count = response.activated_course_count;
      this.enrolled_course_count = response.enrolled_course_count;
      this.termined_course_count = response.termined_course_count;

      this.profile = response.profile;

      this.actived_course_news = response.actived_course_news;
      this.termined_course_news = response.termined_course_news;
      this.enrolled_course_news = response.enrolled_course_news;
    });
  }

  navOption(option: number) {
    this.navOpt = option;
  }

  logout() {
    console.log('logout');
  }
}
