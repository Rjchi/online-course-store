import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /**--------------------------------------------
   * | <Tipo de dato> (valor inicial)
   * | Aqui vamos a almacenar todo lo que el
   * | usuario este registrando
   * --------------------------------------------*/
  public cart = new BehaviorSubject<Array<any>>([]);

  /**---------------------------------------------
   * | Observador (va a estar atento de los
   * | cambios en el behavior) de la variable cart
   * ---------------------------------------------*/
  public currentData$ = this.cart.asObservable();

  constructor(public http: HttpClient, public authService: AuthService) {}
}
