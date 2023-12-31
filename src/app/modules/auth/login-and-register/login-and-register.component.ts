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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      console.log(res);
    });
  }
}
