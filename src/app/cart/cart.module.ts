import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SharedModule } from '../shared/shared.module';
import {CartRoutingModule} from './cart.routing.module'



@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class CartModule { }
