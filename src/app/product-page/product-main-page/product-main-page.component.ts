import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription } from 'rxjs';
import { localStorageVariable } from 'src/app/common/appConstant';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-product-main-page',
  templateUrl: './product-main-page.component.html',
  styleUrls: ['./product-main-page.component.css']
})
export class ProductMainPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private commonService: CommonService, private router: Router) { }

  productImageCarouselConfig: OwlOptions = {
    items: 4,
    skip_validateItems: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,                                                                              // 10August2020
    // startPosition: this.positionSlide,
    margin: 5,
    navSpeed: 200,
    navText: ['<img src="/assets/left-arrow.svg" alt="">', '<img src="/assets/right-arrow.svg" alt="">'],
    nav: true
  };
  productImageCarouselItem = [];

  mobMainImageCarouselConfig: OwlOptions = {
    items: 1,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true
  };

  subscription = new Observable().subscribe();
  productDetails: any;
  estimatedDeliveryDate;
  pageLoaded = false;
  innerHeight = window.innerHeight;
  selectedMainImageIndex = 0;
  pinCodeCheckClicked = false;
  pinCodeValue = '';
  validPinCode = false;
  chosenSizeIndex;
  specAboutFlag = true;
  productId;
  productInCart;
  productInWishList;

  fetchProductDetails(productId) {
    const tempObservable = this.commonService.fetchProductDetails(productId).subscribe(res => {
      this.setProductVariables(res);
    }, err => {
      this.router.navigate(['/']);
    });
    this.subscription.add(tempObservable);
  }

  setProductVariables(productDetails) {
    this.productDetails = productDetails;
    this.productImageCarouselItem = productDetails.productImageList;
    this.setPageLoaded();
  }

  initialConfiguration() {
    this.estimatedDeliveryDate = new Date().setDate(new Date().getDate() + 10);
    this.productInCart = this.checkIfProductInCart();
    this.productInWishList = this.checkIfProductinWishList();
  }

  setPageLoaded() {
    this.pageLoaded = true;
  }

  changeMainPic(index) {
    this.selectedMainImageIndex = index;
  }

  pinCodeCheckButtonClick() {
    this.pinCodeCheckClicked = true;
    this.validPinCode = /^[0-9]{6}$/g.test(this.pinCodeValue);
  }

  chooseSize(index) {
    this.chosenSizeIndex = index;
  }

  addToCart() {
    if (this.checkIfProductInCart()) {
      this.router.navigate(['cart']);
      return;
    }

    if (!this.checkIfSizeSelected()) {
      return;
    }
    if (!localStorage.getItem(localStorageVariable.cartItemList)) {
      const cartItemList = [{ id: this.productId, size: this.productDetails.classificationTypes[this.chosenSizeIndex] }];
      localStorage.setItem(localStorageVariable.cartItemList, JSON.stringify(cartItemList));
    } else {
      const cartItemList = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
      cartItemList.push({ id: this.productId, size: this.productDetails.classificationTypes[this.chosenSizeIndex] });
      localStorage.setItem(localStorageVariable.cartItemList, JSON.stringify(cartItemList));
    }
    this.productInCart = this.checkIfProductInCart();
  }

  buyNow(): void {
    if (!this.checkIfSizeSelected()) {
      return;
    }
    const orderObj = [{ id: this.productId.toString(), size: this.productDetails.classificationTypes[this.chosenSizeIndex] }];
    localStorage.setItem(localStorageVariable.buyNowItemList, JSON.stringify(orderObj));
    this.router.navigate(['place-order']);
  }

  checkIfSizeSelected(): boolean {
    if (this.chosenSizeIndex === undefined) {
      alert('Please choose a product size');
      return false;
    }
    return true;
  }

  checkIfProductInCart(): boolean {
    const cartItemList = JSON.parse(localStorage.getItem(localStorageVariable.cartItemList));
    if (cartItemList) {
      const cartFilterList = cartItemList.filter(item => item.id === this.productId);
      if (cartFilterList.length) {
        return true;
      }
    }
    return false;
  }

  clickWishlistButton(): void {
    const wishListProducts = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    if (this.checkIfProductinWishList()) {
      // need to remove the item from wishlist
      wishListProducts.splice(wishListProducts.indexOf(this.productId), 1);
      localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(wishListProducts));
      alert('Item removed from your Wishlist.');
    } else {
      // need to add the item in wishlist
      if (wishListProducts) {
        wishListProducts.push(this.productId);
        localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(wishListProducts));
      } else {
        const tempList = [this.productId];
        localStorage.setItem(localStorageVariable.wishListItems, JSON.stringify(tempList));
      }
      alert('Item added to your Wishlist');
    }
    this.productInWishList = this.checkIfProductinWishList();
  }

  checkIfProductinWishList(): boolean {
    const wishListProducts = JSON.parse(localStorage.getItem(localStorageVariable.wishListItems));
    if (wishListProducts && wishListProducts.includes(this.productId)) {
      return true;
    }
    return false;
  }

  clickProductSpecification() {
    if (!this.specAboutFlag) {
      this.specAboutFlag = !this.specAboutFlag;
    }
  }

  clickProductAbout() {
    if(this.specAboutFlag) {
      this.specAboutFlag = !this.specAboutFlag;
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.subscribe(param => {
      const productId = param.id;
      const productTitle = param.title;
      this.productId = productId;
      this.fetchProductDetails(productId);
      this.initialConfiguration();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
