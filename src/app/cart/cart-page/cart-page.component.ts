import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { localStorageVariable } from 'src/app/common/appConstant';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  cartItemLoaded = false;
  emptyCart;
  productDetailsList = [];
  totalGrossCartPrice;
  totalActualCartPrice;
  totalDiscountCartPrice;

  checkEmptyCart() {
    const cartProductItems = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
    if (cartProductItems && cartProductItems.length) {
      this.emptyCart = false;
    } else {
      this.emptyCart = true;
      this.cartItemLoaded = true;
    }
  }

  fetchProductDetails(cartProductItems) {
    const productDetailsObservableList = cartProductItems.map(item => {
      return this.commonService.fetchProductDetails(item.id);
    });
    forkJoin(productDetailsObservableList).subscribe(resList => {
      this.productDetailsList = this.processDetailsList(resList);
      this.calculateTotalBilling();
      this.cartItemLoaded = true;
    }, err => {
      alert('Error fetching cart Items');
      this.router.navigate(['']);
    });
  }

  processDetailsList(resList) {
    const cartProductItems = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
    let index = 0;
    const resultList = resList.map(res => {
      res.selectedSize = 'size' in cartProductItems[index] ? cartProductItems[index].size : null;
      index = index + 1;
      return res;
    });
    return resultList;
  }

  deleteFromCart(productId) {
    const cartProductItems = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
    const itemIndex = cartProductItems.indexOf(productId);
    this.productDetailsList.splice(itemIndex, 1);
    cartProductItems.splice(itemIndex, 1);
    localStorage.setItem(localStorageVariable.cartItemList, JSON.stringify(cartProductItems));
    this.checkEmptyCart();
    this.calculateTotalBilling();
  }

  moveToWishList(productId) {
    this.deleteFromCart(productId);
    const wishList = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    if (wishList && !wishList.includes(productId)) {
      wishList.push(productId);
      localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(wishList));
    } else if (!wishList) {
      const tempList = [productId];
      localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(tempList));
    }
  }

  calculateTotalBilling() {
    let totalGrossPrice = 0;
    let totalActualPrice = 0;
    this.productDetailsList.forEach(item => {
      totalGrossPrice += item.grossPrice;
    });
    this.productDetailsList.forEach(item => {
      totalActualPrice += item.actualPrice;
    });
    this.totalGrossCartPrice = totalGrossPrice;
    this.totalActualCartPrice = totalActualPrice;
    this.totalDiscountCartPrice = totalGrossPrice - totalActualPrice;
  }

  cartCheckout(): any {
    const orderObjectList = this.productDetailsList.map(product => {
      return {id: product._id, size: product.selectedSize};
    });
    localStorage.setItem(localStorageVariable.buyNowItemList, JSON.stringify(orderObjectList));
    this.router.navigate(['place-order']);
  }

  ngOnInit(): void {
    const cartProductItems = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
    this.checkEmptyCart();
    this.fetchProductDetails(cartProductItems);

  }

}
