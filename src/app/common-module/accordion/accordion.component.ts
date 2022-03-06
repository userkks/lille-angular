import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  constructor() { }

  accordionState = 'close';

  ngOnInit(): void {
  }

  toggleAccordionState() {
    this.accordionState = this.accordionState === 'open' ? 'close' : 'open';
  }

}
