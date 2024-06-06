import { debounceTime, fromEvent } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CartService } from 'src/app/modules/home/service/cart.service';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

declare function cartSidenav(): any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  source: any;
  search: string = '';
  listCourses: any = [];

  user: any = null;
  carts: any = [];
  sum_total: number = 0;

  @ViewChild('filter') filter?: ElementRef; // elemento referencial
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public tiendaGuestService: TiendaGuestService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    /**----------------------------------------------------------------
     * | Esto es para evitar que se añadan los cursos varias veces
     * | al carrito de compras
     * ----------------------------------------------------------------*/
    this.cartService.resetData();

    /**--------------------------
     * | Llamamos al observador
     * --------------------------*/
    this.cartService.currentData$.subscribe((response: any) => {
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

    if (this.user) {
      /**--------------------------------------------------------------------
       * | Agregamos los cursos que ya esten en la base de datos al bihevor
       * --------------------------------------------------------------------*/
      this.cartService.listCart().subscribe((response: any) => {
        response.carts.forEach((cart: any) => {
          this.cartService.addCart(cart);
        });
      });
    }

    setTimeout(() => {
      cartSidenav();
    }, 50);
  }

  ngAfterViewInit() { // Evento que es parte del ciclo de renderización de un componente en angular
    /**----------------------------------------------------------------
     * | parametros (2): 1- Elemento al que hacemos la referencia
     * | 2- Le asignamos al elemento el evento 'keyup'
     * ----------------------------------------------------------------*/
    this.source = fromEvent(this.filter?.nativeElement, "keyup");
    /**----------------------------------------------------------------
     * | Tiempo de demora para enviar lo que digita el usuario
     * | al servidor (en milisegundos)
     * ----------------------------------------------------------------*/
    this.source.pipe(debounceTime(500)).subscribe((response: any) => {
      let data = {
        search: this.search
      };

      if (this.search.length > 0) {
        this.tiendaGuestService.searchCourse(data).subscribe((response: any) => {
          this.listCourses = response.courses;
        })
      }
    })
  }

  getNewTotal(course: any, campaing_banner: any) {
    if (campaing_banner.type_discount === 1) {
      return Math.round(
        course.price_usd - course.price_usd * (campaing_banner.discount * 0.01)
      );
    } else {
      return Math.round(course.price_usd - campaing_banner.discount);
    }
  }

  getTotalPriceCourse(course: any) {
    if (course.discount_g) {
      return this.getNewTotal(course, course.discount_g);
    } else {
      return course.price_usd;
    }
  }

  logout() {
    this.authService.logout();
  }

  removeItem(cart: any) {
    this.cartService.deleteCart(cart._id).subscribe((response: any) => {
      this.cartService.removeItemCart(cart);
    });
  }
}
