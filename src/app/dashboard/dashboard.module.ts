import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';
import { TableCreationFormComponent } from './table-creation-form/table-creation-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GuiGridModule } from '@generic-ui/ngx-grid'
import { CommonModuleModule } from '../common-module/common-module.module'


@NgModule({
  declarations: [DashboardComponent, DataTableComponent, TableCreationFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    GuiGridModule,
    CommonModuleModule
  ]
})
export class DashboardModule { }
