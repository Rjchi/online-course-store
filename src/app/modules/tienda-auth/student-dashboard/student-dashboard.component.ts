import { Component } from '@angular/core';

import { TiendaAuthService } from '../service/tienda-auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  navOpt: number = 1;

  constructor(public tiendaAuthService: TiendaAuthService) {}

  ngOnInit(): void {
    this.tiendaAuthService.profileStudent().subscribe((response: any) => {
      console.log(response);
    });
  }

  navOption(option: number) {
    this.navOpt = option;
  }

  logout() {
    console.log("logout");
  }
}
