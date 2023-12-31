import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}

  login(email: string, password: string) {
    let URL = URL_SERVICIOS + 'auth/login';

    return this.http.post(URL, { email, password }).pipe(
      map((auth: any) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);

        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(undefined);
      })
    );
  }

  saveLocalStorage(auth: any) {
    if (auth && auth.USER.token) {
      localStorage.setItem('token', auth.USER.token);
      localStorage.setItem('user', JSON.stringify(auth.USER.user));

      return true;
    } else {
      return false;
    }
  }
}
