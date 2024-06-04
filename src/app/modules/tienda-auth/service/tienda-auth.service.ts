import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class TiendaAuthService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  registerOrder(data: any) {
    let url = URL_SERVICIOS + 'checkout/register';
    let headers = new HttpHeaders({ token: this.authService.token });

    return this.http.post(url, data, { headers });
  }

  profileStudent() {
    let url = URL_SERVICIOS + 'profile/client';
    let headers = new HttpHeaders({ token: this.authService.token });

    return this.http.get(url, { headers });
  }

  updateStudent(data: any) {
    let url = URL_SERVICIOS + 'profile/update';
    let headers = new HttpHeaders({ token: this.authService.token });

    return this.http.put(url, data, { headers });
  }
}
