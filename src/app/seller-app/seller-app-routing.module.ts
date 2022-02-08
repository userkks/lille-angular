import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';

const routes: Routes = [
  {
    path: '',
    component: SellerHomeComponent,
  },
  {
    path: 'login',
    component: LoginScreenComponent,
  },
  {
    path: 'register',
    component: RegisterScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerAppRoutingModule {}
