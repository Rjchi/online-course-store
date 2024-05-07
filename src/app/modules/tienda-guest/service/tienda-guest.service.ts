import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class TiendaGuestService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  showCourse(slug: any, time_now = null) {
    let URL = URL_SERVICIOS + 'home/landig-course/' + slug;

    return this.http.get(URL);
  }
}
