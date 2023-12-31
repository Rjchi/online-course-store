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

  name_register: string = '';
  email_register: string = '';
  surname_register: string = '';
  password_register: string = '';
  password_confirmation: string = '';

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

  register() {
    if (
      !this.name_register ||
      !this.email_register ||
      !this.surname_register ||
      !this.password_register ||
      !this.password_confirmation
    ) {
      alert('No te puedes registrar sin llenar todos los datos');
      return;
    }

    if (this.password_register !== this.password_confirmation) {
      alert('Las contraseñas no son iguales');
      return;
    }

    let data = {
      rol: 'cliente',
      email: this.email_register,
      name: this.name_register,
      password: this.password_register,
      surname: this.surname_register,
    };

    this.authService.register(data).subscribe((res: any) => {
      console.log(res);
      if (res.message === 403) {
        alert(res.msg);
      } else {
        this.name_register = "";
        this.email_register = "";
        this.surname_register = "";
        this.password_register = "";
        this.password_confirmation = "";
        alert('EL USUARIO SE CREO CORRECTAMENTE');
      }
    });
  }
}
