import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
// import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  /* {
    path: '',
    component: AuthPage
  }, */
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'login',
    component: AuthPage
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  }/* ,
  {
    path: '**',
    component: AuthPage
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
