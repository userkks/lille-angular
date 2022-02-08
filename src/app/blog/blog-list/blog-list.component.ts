import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonService) { }

  postList = [];
  subscription: Subscription = new Observable().subscribe();

  ngOnInit(): void {
    this.fetchAllPosts();
  }

  fetchAllPosts() {
    this.subscription.add(this.commonService.fetchAllPosts().subscribe((res: any) => {
      this.postList = res;
    }, (error) => {
      console.log(error);
    }))
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
