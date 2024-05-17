import { Component } from '@angular/core';
import { CartService } from '../../home/service/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent {
  carts: any = [];
  total_sum: number = 0;

  constructor(public cartService: CartService) {}

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
    let name = "";

    if (campaing_discount === 1) {
      name = "CAMPAÑA DE DESCUENTO NORMAL";
    }

    if (campaing_discount === 2) {
      name = "CAMPAÑA DE DESCUENTO FLASH";
    }

    if (campaing_discount === 3) {
      name = "CAMPAÑA DE DESCUENTO BANNER";
    }

    return name;
  }
}
