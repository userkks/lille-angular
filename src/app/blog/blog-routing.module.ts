import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogContentComponent } from './blog-content/blog-content.component';
import { BlogListComponent } from './blog-list/blog-list.component';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: ':postTitle',
    component: BlogContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
