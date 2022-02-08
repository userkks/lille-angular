import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-gallery-slider',
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.css'],
})
export class GallerySliderComponent implements OnInit {
  @Input()
  configObject;

  // {
  //   configuration: ...,
  //   data: [
  //     {
  //       itemName:
  //       itemLink:
  //       itemImage:
  //       itemDescription:
  //       grossPrice:
  //       discount:
  //       actualPrice
  //     }
  //   ]
  // }

  constructor() {}

  owlConfiguration: OwlOptions;
  itemList: any;

  count = Array(10).fill(0);

  ngOnInit(): void {
    // this.owlConfiguration = this.configObject.configuration;
    // this.itemList = this.configObject.data;
    this.owlConfiguration = {
      items: 5,
      skip_validateItems: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false, // 10August2020
      // startPosition: this.positionSlide,
      // margin: 5,
      navSpeed: 200,
      navText: [
        '<img src="/assets/left-arrow.svg" alt="">',
        '<img src="/assets/right-arrow.svg" alt="">',
      ],
      nav: true,
    };
    this.itemList = [
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
      '/assets/large-1.jpg',
    ];
  }
}
