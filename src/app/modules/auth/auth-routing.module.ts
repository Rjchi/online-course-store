import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent, // Siempre apunta al componente central
    children: [ // Y aqui van los componentes hijos
      {
        path: "login",
        component: LoginAndRegisterComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
