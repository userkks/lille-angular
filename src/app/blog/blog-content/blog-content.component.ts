import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.css']
})
export class BlogContentComponent implements OnInit, OnDestroy {

  postTitle = "";
  subscription: Subscription = new Observable().subscribe();
  blogPostDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((res: any) => {
        this.postTitle = res.postTitle;
        this.fetchBlogPost();
      })
    );
  }

  fetchBlogPost() {
    this.commonService.fetchBlogPost(this.postTitle).subscribe((res) => {
      this.blogPostDetails = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
