import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { localStorageVariable } from 'src/app/common/appConstant';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  emptyWishList;
  wishListLoaded = false;
  productDetailsList = [];

  fetchAllProductDetails(productList): void {
    const productDetailsObservableList = productList.map(eachId => {
      return this.commonService.fetchProductDetails(eachId);
    });
    forkJoin(productDetailsObservableList).subscribe(resList => {
      this.productDetailsList = resList;
      this.wishListLoaded = true;
    }, err => {
      alert('Error loading wishlist');
      this.router.navigate(['']);
    });
  }

  deleteFromWishList(productId) {
    const wishListProductList = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    const deleteItemIndex = wishListProductList.indexOf(productId);
    wishListProductList.splice(deleteItemIndex, 1);
    this.productDetailsList.splice(deleteItemIndex, 1);
    localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(wishListProductList));
    this.checkEmptyWishlist();
  }

  checkEmptyWishlist() {
    const productList = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    if (productList && productList.length) {
      this.emptyWishList = false;
    } else {
      this.emptyWishList = true;
      this.wishListLoaded = true;
    }
  }

  ngOnInit(): void {
    const productList = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    this.checkEmptyWishlist();
    this.fetchAllProductDetails(productList);
  }

}
