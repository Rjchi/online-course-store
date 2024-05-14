import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../auth/service/auth.service';

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

  addCart(data: any) {
    /**---------------------------------------------------------------
     * | Traemos todo lo que este almacenado en el carrito de compra
     * ---------------------------------------------------------------*/
    let listCart = this.cart.getValue();
    let index = listCart.findIndex(
      (item) => item.course._id === data.course._id
    );

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
    let index = listCart.findIndex(
      (item) => item.course._id === data.course._id
    );

    if (index === -1) {
      listCart.splice(index, 1);
    }

    this.cart.next(listCart);
  }
}
