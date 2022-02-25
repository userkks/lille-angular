import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { PopupService } from 'src/app/common/popup.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService, private popupService: PopupService) {
  }

  subscription: Subscription = new Observable().subscribe();
  allTableList = [];

  ngOnInit(): void {
    this.subscription.add(this.commonService.getAllTable().subscribe((res: any) => {
      this.allTableList = res;
    }, (error) => {
      console.log(error);
      this.popupService.openNotification({
        type: 'error',
        message: 'Some error occurred.'
      });
    }))
  }

  createDataTable() {
    this.router.navigate(['dashboard', 'create-table']);
  }

  backFromTableCreation() {
    console.log('table creation successfull');
  }

}
