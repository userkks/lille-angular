import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSuccessComponent } from './order-success/order-success.component';


@NgModule({
  declarations: [PlaceOrderComponent, OrderSuccessComponent],
  imports: [
    SharedModule,
    CommonModule,
    OrderRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
