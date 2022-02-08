import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  productDetailsList;
  keyword;
  componentInitialized = false;
  subscription: Subscription;

  fetchProductDetails() {
    this.subscription = this.commonService
      .fetchProductOnKeyword(this.keyword)
      .subscribe(
        (res) => {
          this.productDetailsList = res;
          this.componentInitialized = true;
        },
        (err) => {
          alert('Error fetching product list');
        }
      );
  }

  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe((param) => {
      this.keyword = param.keyword;
      this.fetchProductDetails();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
