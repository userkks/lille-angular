import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testing-component',
  templateUrl: './testing-component.component.html',
  styleUrls: ['./testing-component.component.css']
})
export class TestingComponentComponent implements OnInit {

  constructor() { }

  apcData = [1, 2, 3, 4, 5];
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 15,
    autoWidth: true,                                                                                   // 10August2020
    // startPosition: this.positionSlide,                                                               // 6August2020
    navSpeed: 200,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 3,                                                                                         // 10August2020
        autoWidth: true
      },
      400: {                                                                                                        // 16July2020                                          //16July2020
        items: 3,                                                                                           // 10August2020
        autoWidth: true
      },
      600: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };


  ngOnInit(): void {
  }

}
