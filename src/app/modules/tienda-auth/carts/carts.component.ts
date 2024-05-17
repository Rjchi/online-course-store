import { Toaster } from 'ngx-toast-notifications';
import { Component } from '@angular/core';

import { CartService } from '../../home/service/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent {
  carts: any = [];
  code: any = null;
  total_sum: number = 0;

  constructor(public cartService: CartService, public toaster: Toaster) {}

  ngOnInit() {
    this.cartService.currentData$.subscribe((response: any) => {
      this.carts = response;
      this.total_sum = response.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.total,
        0
      );
    });
  }

  removeItem(cart: any) {
    this.cartService.deleteCart(cart._id).subscribe((response: any) => {
      this.cartService.removeItemCart(cart);
    });
  }

  getNameCampaing(campaing_discount: number) {
    let name = '';

    if (campaing_discount === 1) {
      name = 'CAMPAÑA DE DESCUENTO NORMAL';
    }

    if (campaing_discount === 2) {
      name = 'CAMPAÑA DE DESCUENTO FLASH';
    }

    if (campaing_discount === 3) {
      name = 'CAMPAÑA DE DESCUENTO BANNER';
    }

    return name;
  }

  applyCupon() {
    if (!this.code) {
      this.toaster.open({
        text: 'DEBES INGRESAR UN CODIGO DE CUPÓN',
        caption: 'VALIDATIONS',
        type: 'danger',
      });

      return;
    }

    let data = {
      cupon: this.code,
    };

    this.cartService.applyCupon(data).subscribe((response: any) => {
      console.log(response);
      if (response.message === 403) {
        this.toaster.open({
          text: response.message_text,
          caption: 'VALIDATIONS',
          type: 'danger',
        });
      } else {
        this.cartService.resetData();

        setTimeout(() => {
          response.carts.forEach((cart: any) => {
            this.cartService.addCart(cart);
          });

          this.code = null;
        }, 50);

        this.toaster.open({
          text: response.message_text,
          caption: 'VALIDATIONS',
          type: 'success',
        });
      }
    });
  }
}
