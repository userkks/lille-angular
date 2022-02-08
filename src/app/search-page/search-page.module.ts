import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageRoutingModule } from './search-page.routing.module'
import { SharedModule } from '../shared/shared.module';
import { SearchProductComponent } from './search-product/search-product.component';



@NgModule({
  declarations: [SearchProductComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule
  ]
})
export class SearchPageModule { }
