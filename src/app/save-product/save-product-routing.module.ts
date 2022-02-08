import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveProductComponent } from './save-product/save-product.component';

const routes: Routes = [
  {
    path: '',
    component: SaveProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveProductRoutingModule { }
