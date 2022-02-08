import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveProductRoutingModule } from './save-product-routing.module';
import { SaveProductComponent } from './save-product/save-product.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SaveProductComponent],
  imports: [
    CommonModule,
    SaveProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class SaveProductModule { }
