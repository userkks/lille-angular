import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { commonGridFormatter } from 'src/app/common/commonMethods';
import { PopupService } from 'src/app/common/popup.service';
import { environment } from '../../../environments/environment'

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
  rowData = [];
  columns = [];
  selectedTable;
  selectedTableRow;
  selectedTableColumnNameMapping;
  selectedRowKeyList;
  selectedTableSchema;
  showDataTable = false;
  env = environment;

  ngOnInit(): void {
    if (!this.env.profile) { 
      this.router.navigate(['home']); return; 
    } else if (!environment.profile.userName) {
      this.popupService.openPopup({
        open: true,
        type: "userName",
        closeButton: false,
        key: 'userNameRegistration'
      });
    } else {
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
  }

  createDataTable() {
    this.router.navigate(['dashboard', 'create-table']);
  }

  backFromTableCreation() {
    console.log('table creation successfull');
  }

  openTable(table) {
    this.selectedTableRow = null;
    this.showDataTable = false;
    this.selectedTable = table;
    this.commonService.getTableData(table.apiKey).subscribe((res: any) => {
      const columnWidth = this.calculateColumnWidth(res.schema.columnFormArray.length);
      this.columns = res.schema.columnFormArray.map((column) => {
        return {
          field: column.columnKey,
          header: `<div class="text-center">${column.columnName} <br> <i class="font-0">${column.columnKey}</i></div>`,
          formatter: commonGridFormatter,
          width: columnWidth
        }
      });
      this.rowData = res.dataList;
      this.selectedTableColumnNameMapping = {};
      res.schema.columnFormArray.forEach(column => {
        this.selectedTableColumnNameMapping[column.columnKey] = column.columnName;
      });
      this.selectedTableSchema = res.schema;
      this.showDataTable = true;
    })
  }

  rowSelect(event) {
    console.log(event);
    this.selectedTableRow = event[0].source;
    this.selectedRowKeyList = Object.keys(this.selectedTableRow);
  }

  calculateColumnWidth(columnCount) {
    if (columnCount) {
      const widgetWidth = window.innerWidth > 720 ? window.innerWidth > 1200 ? window.innerWidth * 0.6 : 720 : 330;
      const calculatedWidth = widgetWidth / columnCount;
      return calculatedWidth < 100 ? 100 : calculatedWidth;
    } else {
      return undefined;
    }
  }


}
