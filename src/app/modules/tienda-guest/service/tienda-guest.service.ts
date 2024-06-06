import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class TiendaGuestService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  showCourse(slug: any, campaing_special = null) {
    let URL =
      URL_SERVICIOS +
      'home/landig-course/' +
      slug +
      '?time_now=' +
      new Date().getTime() +
      '&campaing_special=' +
      (campaing_special ? campaing_special : '');
    return this.http.get(URL);
  }

  searchCourse(data: any) {
    let URL =
      URL_SERVICIOS +
      'home/search-course/' +
      '?time_now=' +
      new Date().getTime();

    return this.http.post(URL, data);
  }
}
