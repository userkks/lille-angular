import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerAppRoutingModule } from './seller-app-routing.module';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';


@NgModule({
  declarations: [SellerHomeComponent, LoginScreenComponent, RegisterScreenComponent],
  imports: [
    CommonModule,
    SellerAppRoutingModule
  ]
})
export class SellerAppModule { }
