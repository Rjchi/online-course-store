import { Toaster } from 'ngx-toast-notifications';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { CartService } from '../../home/service/cart.service';
import { TiendaAuthService } from '../service/tienda-auth.service';

declare var paypal: any;
@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent {
  carts: any = [];
  code: any = null;
  total_sum: number = 0;

  /**------------------------------------------------------------
   * | Con este ViewChild hacemos referencia al identificador
   * | #paypal
   * ------------------------------------------------------------*/
  @ViewChild('paypal', { static: true }) paypalElement?: ElementRef;
  constructor(
    public cartService: CartService,
    public toaster: Toaster,
    public tiendaAuthService: TiendaAuthService
  ) {}

  ngOnInit() {
    this.cartService.currentData$.subscribe((response: any) => {
      this.carts = response;
      this.total_sum = response.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.total,
        0
      );
    });

    paypal
      .Buttons({
        /**---------------------
         * | Estilos del botón
         * ---------------------*/
        style: {
          color: 'white',
          shape: 'rect',
          layout: 'vertical',
        },

        createOrder: (data: any, actions: any) => {
          // https://developer.paypal.com/api/orders/v2/#orders-create-request-body

          if (this.total_sum === 0) {
            this.toaster.open({
              text: 'PARA PROCESAR EL PAGO EL MONTO TIENE QUE SER MAYOR A CERO',
              caption: 'VALIDATIONS',
              type: 'danger',
            });

            return false; // con esto cerramos la ventana emergente de paypal
          }

          if (this.carts.length === 0) {
            this.toaster.open({
              text: 'PARA PROCESAR EL PAGO EL CARRITO TIENE QUE TENER ALMENOS UN ITEM',
              caption: 'VALIDATIONS',
              type: 'danger',
            });

            return false;
          }

          const createOrderPayload = {
            purchase_units: [
              {
                amount: {
                  description: 'COMPRAR POR EL LMS',
                  value: this.total_sum, // Valor total de los cursos
                },
              },
            ],
          };

          return actions.order.create(createOrderPayload);
        },

        /**----------------------------------
         * | Cuando finalice la transacción
         * ----------------------------------*/
        onApprove: async (data: any, actions: any) => {
          let Order = await actions.order.capture();

          let dataOrder = {
            total: this.total_sum,
            method_payment: 'PAYPAL',
            currency_total: 'USD', // Moneda con la que trabaja paypal
            currency_payment: 'USD', // Moneda local
            n_transaction: Order.purchase_units[0].payments.captures[0].id,
          };

          this.tiendaAuthService.registerOrder(dataOrder).subscribe((response: any) => {
            console.log(response);
          });

          // return actions.order.capture().then(captureOrderHandler);
        },

        // handle unrecoverable errors
        onError: (err: any) => {
          console.error(
            'An error prevented the buyer from checking out with PayPal'
          );
        },
      })
      .render(this.paypalElement?.nativeElement);
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
