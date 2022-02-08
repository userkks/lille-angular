import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { localStorageVariable } from 'src/app/common/appConstant';
import { CommonService } from 'src/app/common/common.service';
import { HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { checkIfErrorInputField } from 'src/app/common/commonMethods';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonService, private router: Router, private fb: FormBuilder) { }

  subscription: Subscription = new Observable().subscribe();

  stateList = [];
  cartTotalAmount;
  oneProductToCheckout = false;
  productDetailsList = [];
  mobileContinueClicked = false;
  desktopScreen;
  placeOrderForm;
  componentLoaded = false;
  commonFieldErrorMessage = 'Please enter proper value';

  fetchProductDetails(): void {
    const productObjectList = JSON.parse(localStorage.getItem(localStorageVariable.buyNowItemList));
    const orderSizeList = productObjectList.map(productObj => productObj.size);
    const productDetailsObservableList = productObjectList.map(productObj => {
      return this.commonService.fetchProductDetails(productObj.id);
    });
    const productDetailsSubscription = forkJoin(productDetailsObservableList).subscribe(resList => {
      this.productDetailsList = this.mergeWithOrderSize(resList, orderSizeList);
      this.cartTotalAmount = this.calculateCartTotalAmount();
      this.componentLoaded = true;
    }, err => {
      alert('Error fetching order details');
      this.router.navigate(['cart']);
    });
    this.subscription.add(productDetailsSubscription);
  }

  mergeWithOrderSize(resList, productSizeList): any {
    let index = 0;
    const resultList = resList.map(item => {
      item.selectedSize = productSizeList[index];
      // adding some initial parameter
      item.deliveryDate = this.commonService.getDeliveryDate();
      index = index + 1;
      return item;
    });
    return resultList;
  }

  calculateCartTotalAmount() {
    let totalAmount = 0;
    this.productDetailsList.forEach(productItem => {
      totalAmount = totalAmount + productItem.actualPrice;
    });
    return totalAmount;
  }

  checkIfSingleOrder() {
    const orderObjectList = JSON.parse(localStorage.getItem(localStorageVariable.buyNowItemList));
    this.oneProductToCheckout = orderObjectList.length === 1;
    this.fetchProductDetails();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    const windowSize = window.innerWidth;
    this.desktopScreen = windowSize >= 600 ? true : false;
  }

  mobileContinueButtonClick() {
    this.mobileContinueClicked = true;
  }

  placeOrder() {
    if (this.placeOrderForm.valid) {
      const formValue = this.placeOrderForm.value;
      const orderProductIdList = JSON.parse(localStorage.getItem(localStorageVariable.buyNowItemList)).map(item => item.id);
      const orderObject = {
        productIdList: orderProductIdList,      // refers to the product unique id
        emailId: formValue.emailField,
        mailOfferAcceptence: formValue.checkMailOffers,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        addressLine1: formValue.addressLine1,
        addressLine2: formValue.addressLine2,
        city: formValue.city,
        State: formValue.state,
        pinCode: formValue.pinCode,
        phoneNumber: formValue.phoneNumber,
        phoneNumberVerified: false
    };
      const placeOrderSubscription = this.commonService.placeOrder(orderObject).subscribe(res => {
        localStorage.setItem(localStorageVariable.orderSuccessFlag, 'true');
        this.router.navigate(['place-order', 'order-success']);
      }, err => {
        alert('Could\'nt place the order please try again');
      });
      this.subscription.add(placeOrderSubscription);
    } else {
      alert('Please provide valid details');
    }
  }

  inputErrorCheck(fieldName: string): any {
    const errorMessage = checkIfErrorInputField(this.placeOrderForm, fieldName);
    return errorMessage;
  }

  definePlaceOrderForm(): void {
    this.placeOrderForm = this.fb.group({
      emailField: ['', [Validators.required, Validators.email]],
      checkMailOffers: [false],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: [null, Validators.required],
      pinCode: ['', [Validators.required, this.checkIfPinCode]],
      phoneNumber: ['', [Validators.required, this.checkIfPhoneNumber]]
    });
    this.checkIfSingleOrder();
  }

  checkIfPinCode(control: FormControl): any {
    return (/^[0-9]+$/.test(control.value) && control.value.length === 6) ? null : {message: 'Pin code not valid'};
  }

  checkIfPhoneNumber(control: FormControl): any {
    return (/^[0-9]+$/.test(control.value) && control.value.length === 10) ? null : {message: 'Phone number not valid'};
  }

  ngOnInit(): void {
    this.stateList = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
      'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat',
      'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh',
      'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim',
      'Tamil Nadu', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'West Bengal'];

    if (!localStorage.getItem(localStorageVariable.buyNowItemList)) {
      this.router.navigate(['']);
    }

    this.onResize();
    this.definePlaceOrderForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(localStorageVariable.buyNowItemList);
    this.subscription.unsubscribe();
  }

}

