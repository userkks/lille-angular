import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageVariable } from 'src/app/common/appConstant';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  checkIfOrderPlaced() {
    if (localStorage.getItem(localStorageVariable.orderSuccessFlag) !== 'true') {
      localStorage.removeItem(localStorageVariable.orderSuccessFlag);
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.checkIfOrderPlaced();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(localStorageVariable.orderSuccessFlag);
  }

}
