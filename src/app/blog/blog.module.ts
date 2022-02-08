import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogContentComponent } from './blog-content/blog-content.component';
import { BlogListComponent } from './blog-list/blog-list.component';


@NgModule({
  declarations: [BlogContentComponent, BlogListComponent],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
