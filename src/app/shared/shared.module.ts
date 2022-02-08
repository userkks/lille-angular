import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { GallerySliderComponent } from './gallery-slider/gallery-slider.component';

@NgModule({
  declarations: [PageLoadingComponent, GallerySliderComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    CarouselModule,
    PageLoadingComponent,
    GallerySliderComponent
  ]
})
export class SharedModule { }
