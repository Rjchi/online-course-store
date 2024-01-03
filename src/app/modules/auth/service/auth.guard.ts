import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**-----------------------------------------------------------
   * | Con este guard evitamos que accedan a un componente
   * | En este caso si no estan autenticados
   * -----------------------------------------------------------*/

  constructor(public authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**----------------------------
     * | Si el usuario no existe
     * ----------------------------*/
    if (!this.authService.user) {
      this.authService.logout();
      return false;
    }

    let token = this.authService.token;

    if (!token) {
      this.authService.logout();
      return false;
    }

    /**---------------------------------------------
     * | Validamos que el token no haya expirado
     * ---------------------------------------------*/

    let expiration = JSON.parse(atob(token.split('.')[1])).exp;

    if (Math.floor(new Date().getTime() / 1000) >= expiration) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
