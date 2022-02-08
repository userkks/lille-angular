import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestingComponentComponent } from './testing-component/testing-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product-page/product-page.module').then(
        (mod) => mod.ProductPageModule
      ),
  },
  {
    path: 'test',
    component: TestingComponentComponent,
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((mod) => mod.CartModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search-page/search-page.module').then(
        (mod) => mod.SearchPageModule
      ),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist/wishlist.module').then((mod) => mod.WishlistModule),
  },
  {
    path: 'place-order',
    loadChildren: () =>
      import('./order/order.module').then((mod) => mod.OrderModule),
  },
  {
    path: 'save-product',
    loadChildren: () =>
      import('../app/save-product/save-product.module').then(
        (mod) => mod.SaveProductModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('../app/seller/seller.module').then((mod) => mod.SellerModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('../app/seller-app/seller-app.module').then(
        (mod) => mod.SellerAppModule
      ),
  },
  {
    path: 'blog',
    loadChildren: () => import('../app/blog/blog.module').then(
      (mod) => mod.BlogModule
    ),
  }, {
    path: 'login',
    loadChildren: () => import('../app/login/login.module').then(
      (mod) => mod.LoginModule
    ),
  }, {
    path: 'dashboard',
    loadChildren: () => import('../app/dashboard/dashboard.module').then(
      (mod) => mod.DashboardModule
    ),
  }, {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
