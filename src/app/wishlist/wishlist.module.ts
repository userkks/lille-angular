import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [WishlistPageComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModule,
  ]
})
export class WishlistModule { }
