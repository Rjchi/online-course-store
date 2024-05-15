import { Component } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CartService } from 'src/app/modules/home/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any = null;
  carts: any = [];
  sum_total: number = 0;

  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    /**--------------------------
     * | Llamamos al observador
     * --------------------------*/
    this.cartService.currentData$.subscribe((response: any) => {
      console.log('header', response);
      this.carts = response;
      /**-----------------------------------------------------------------------
       * | reduce(acumulador, iterable) => acumulador + iterable, valorInicial
       * -----------------------------------------------------------------------*/
      this.sum_total = this.carts.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.total,
        0
      );
    });

    /**--------------------------------------------------------------------
     * | Agregamos los cursos que ya esten en la base de datos al bihevor
     * --------------------------------------------------------------------*/
    this.cartService.listCart().subscribe((response: any) => {
      response.carts.forEach((cart: any) => {
        this.cartService.addCart(cart);
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
