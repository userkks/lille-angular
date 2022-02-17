import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  constructor(private fb: FormBuilder) {
  }

  componentState = 'showTable';       // values could be 'createTable' or 'showTable'

  createDataTable() {
    this.componentState = 'createTable';
  }

}
