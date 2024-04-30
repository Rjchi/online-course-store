import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  home() {
    let URL = URL_SERVICIOS + 'home/list';
    return this.http.get(URL);
  }
}
