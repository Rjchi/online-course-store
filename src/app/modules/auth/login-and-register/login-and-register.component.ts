import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css'],
})
export class LoginAndRegisterComponent {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    /**------------------------------------------------
     * | Validamos si el usuario ya esta autenticado
     * | Y lo redireccionamos al landig
     * ------------------------------------------------*/

    if (this.authService.user && this.authService.token) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    if (!this.email || !this.password) {
      alert('No puedes ingresar sin llenar todos los datos');
      return;
    }
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      console.log(res);
      if (res) {
        window.location.reload();
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }
}
