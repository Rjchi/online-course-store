import { Component } from '@angular/core';

declare function HOMEINIT([]): any;
declare var $: any;
declare function countdownT():any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  ngOnInit(): void {
    setTimeout(() => {
      HOMEINIT($);
      countdownT();
    }, 50);
  }
}
