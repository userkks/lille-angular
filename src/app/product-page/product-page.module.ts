import { NgModule } from '@angular/core';
import { ProductMainPageComponent } from './product-main-page/product-main-page.component';
import { ProductMainPageRoutingModule } from './product-main-page-routing.module';
import { SharedModule } from '../shared/shared.module'
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ProductMainPageComponent],
  imports: [
    SharedModule,
    ProductMainPageRoutingModule,
    CommonModule
  ]
})
export class ProductPageModule { }
