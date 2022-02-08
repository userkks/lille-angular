import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {
    path: '',
    component: PlaceOrderComponent
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
