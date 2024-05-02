import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';

import { HomeService } from './service/home.service';

declare function HOMEINIT([]): any;
declare var $: any;
declare function countdownT(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  CATEGORIES: any[] = [];
  COURSES_TOP: any[] = [];

  constructor(public toaster: Toaster, public homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.home().subscribe((response: any) => {
      this.CATEGORIES = response.categories;
      console.log(response.categories);
      this.COURSES_TOP = response.courses_top;
    });

    setTimeout(() => {
      HOMEINIT($);
      countdownT();
    }, 50);
  }
}
