import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
})
export class SellerPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  subscription = new Observable().subscribe();

  viewportHeight;
  itemList = [1,2,3,4,5,6,7,8,9,10,11,12]

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewportHeight = window.innerHeight - 60;
  }

  fetchSellerDetails(sellerId): void {
    this.commonService.fetchSellerDetails(sellerId).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.viewportHeight = window.innerHeight - 60;

    this.subscription.add(
      this.route.params.subscribe((param) => {
        const sellerId = param.id;
        this.fetchSellerDetails(sellerId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
