import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMainPageComponent } from './product-main-page/product-main-page.component';


const routes: Routes = [
  {
    path: ':title/:id',
    component: ProductMainPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductMainPageRoutingModule { }
