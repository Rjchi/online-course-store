import { Component } from '@angular/core';

declare function HOMEINIT([]): any;
declare var $: any;
@Component({
  selector: 'app-landing-course',
  templateUrl: './landing-course.component.html',
  styleUrls: ['./landing-course.component.css'],
})
export class LandingCourseComponent {
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      HOMEINIT($);
    }, 50);
  }
}
