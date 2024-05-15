import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /**--------------------------------------------
   * | BehaviorSub<Tipo de dato> (valor inicial)
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

  addCart(data: any) {
    /**---------------------------------------------------------------
     * | Traemos todo lo que este almacenado en el carrito de compra
     * ---------------------------------------------------------------*/
    let listCart = this.cart.getValue();
    let index = listCart.findIndex((item) => item.course === data._id);

    if (index === -1) {
      listCart.unshift(data);
    }

    /**----------------------------------------------
     * | next es similar a push en un array normal
     * ----------------------------------------------*/
    this.cart.next(listCart);
  }

  resetData() {
    this.cart.next([]);
  }

  removeItemCart(data: any) {
    /**------------------------------------------------------
     * | Se actualiza el carrito con los registros actuales
     * | luego de la eliminación
     * ------------------------------------------------------*/
    let listCart = this.cart.getValue();
    let index = listCart.findIndex((item) => item.course === data._id);

    if (index === -1) {
      listCart.splice(index, 1);
    }

    this.cart.next(listCart);
  }

  /**------------
   * | Enpoints
   * ------------*/
  listCart() {
    let URL = URL_SERVICIOS + 'cart/list';
    let headers = new HttpHeaders({
      token: this.authService.token,
    });

    return this.http.get(URL, { headers });
  }

  registerCart(data: any) {
    let URL = URL_SERVICIOS + 'cart/register';
    let headers = new HttpHeaders({
      token: this.authService.token,
    });

    return this.http.post(URL, data, { headers });
  }

  deleteCart(id: any) {
    let URL = URL_SERVICIOS + 'cart/remove/' + id;
    let headers = new HttpHeaders({
      token: this.authService.token,
    });

    return this.http.delete(URL, { headers });
  }

  applyCupon(data: any) {
    let URL = URL_SERVICIOS + 'cart/update';
    let headers = new HttpHeaders({
      token: this.authService.token,
    });

    return this.http.put(URL, data, { headers });
  }
}
