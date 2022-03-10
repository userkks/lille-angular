import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { PopupService } from 'src/app/common/popup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-creation-form',
  templateUrl: './table-creation-form.component.html',
  styleUrls: ['./table-creation-form.component.css']
})
export class TableCreationFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private popupService: PopupService, private commonService: CommonService, private router: Router) { }

  tableCreationForm: FormGroup;
  dataSaving = false;
  dataTypeList = ['String', 'Number', 'Boolean', 'Object', 'Array'];
  submitButtonClicked = false;
  allTableList = [];
  env = environment;

  ngOnInit(): void {
    if (!environment.profile) {
      this.router.navigate(['home']); return;
    } else if (!environment.profile.userName) {
      this.popupService.openPopup({
        open: true,
        type: "userName",
        closeButton: false,
        key: 'userNameRegistration'
      });
    } else {
      this.commonService.getAllTable().subscribe((res: any) => {
        this.allTableList = (res.length && res.map(item => item.apiKey)) || [];
      }, (error) => {
        console.log(error);
      })
    }
    this.tableCreationForm = this.fb.group({
      tableName: ['', Validators.required],
      apiKey: ['', [Validators.required, this.apiKeyValidation.bind(this)]],
      columnFormArray: this.fb.array([this.columnFormGroup()])
    }, { validators: this.checkIfAllColumnsValid })
  }

  columnFormGroup(): FormGroup {
    return this.fb.group({
      columnName: ['', Validators.required],
      columnKey: ['', [Validators.required, this.columnKeyValidation]],
      columnType: [null, Validators.required],
      defaultValue: ['']
    }, { validators: this.validateDefaultValue })
  }

  validateDefaultValue(group: AbstractControl) {
    const columnType = group.get('columnType').value;
    const defaultValue = group.get('defaultValue').value;
    if (columnType && defaultValue) {
      if (['Array', 'Boolean', 'Object'].includes(columnType)) {
        try {
          const defaultValueObject = JSON.parse(defaultValue);
          if (columnType === 'Array' && !Array.isArray(defaultValueObject)) return { errorMessage: "Default Value should be the type of Array" }
          if (columnType === 'Boolean' && typeof defaultValueObject !== 'boolean') return { errorMessage: "Default Value should be the type of Boolean" }
          if (columnType === 'Object' && typeof defaultValueObject !== 'object') return { errorMessage: "Default Value should be the type of Object" }
        } catch (error) {
          return { errorMessage: "Please enter valid value" };
        }
      } else {
        if (columnType === 'Number' && window.isNaN(defaultValue)) return { errorMessage: "Default Value should be the type of Number" }
      }
    }
    return null;

  }

  get columnFormArray() {
    return <FormArray>this.tableCreationForm.get('columnFormArray');
  }

  addColumn() {
    this.columnFormArray.push(this.columnFormGroup());
  }

  deleteColumn(index) {
    this.columnFormArray.removeAt(index);
  }

  showErrorMessage(field) {
    return (this.tableCreationForm.controls[field].touched || this.submitButtonClicked) && this.tableCreationForm.controls[field].errors?.required;
  }

  showColumnErrorMessage(columnNo, field) {
    const fieldObject = (this.columnFormArray.controls[columnNo] as FormArray).controls[field];
    return (fieldObject.touched || this.submitButtonClicked) && fieldObject.errors?.required;
  }

  createTable() {
    this.submitButtonClicked = true;
    if (this.tableCreationForm.valid) {
      const formValue = { ...this.tableCreationForm.value };
      // setting all the default values according to their type
      formValue.columnFormArray.forEach(columnObject => {
        if (columnObject.defaultValue) {
          if (['Array', 'Object', 'Boolean'].includes(columnObject.columnType)) columnObject.defaultValue = JSON.parse(columnObject.defaultValue);
          if (columnObject.columnType === 'Number') columnObject.defaultValue = Number(columnObject.defaultValue);
        }
      });
      this.commonService.createNewTable(formValue).subscribe((res) => {
        this.popupService.openNotification({
          type: 'success',
          open: true,
          message: 'New Table Created Successfully'
        });
        this.backToTable('table created');
      }, (error) => {
        this.popupService.openNotification({
          type: 'error',
          open: true,
          message: 'Some Error Occurred, Try Again'
        })
      })
    } else if (this.tableCreationForm.errors) {
      this.popupService.openNotification({
        type: 'error',
        open: true,
        message: this.tableCreationForm.errors.errorMessage
      })
    }
  }

  checkIfAllColumnsValid(group) {
    const formArrayControl = group.controls.columnFormArray.controls;
    const columnKeyList = formArrayControl.map(column => column.controls.columnKey.value);
    for (let index = 0; index < formArrayControl.length; index++) {
      if (formArrayControl[index].errors) return { errorMessage: "Columns are not valid" }
      if (columnKeyList.filter(columnKey => columnKey === formArrayControl[index].controls.columnKey.value).length > 1) return { errorMessage: "Column Keys can not be same for two columns." }
    }
    if (!formArrayControl.length) return { errorMessage: "At least one column is required" }

    return null;
  }

  apiKeyValidation(control: FormControl) {
    if (control.value && !/^[a-zA-Z0-9]+$/.test(control.value)) return { errorMessage: 'Special Characters are not Allowed' }
    if (control.value && this.allTableList.includes(control.value)) return { errorMessage: 'This Key is being used in some other table.' }
    return null;
  }

  columnKeyValidation(control: FormControl) {
    if (control.value && !/^[a-zA-Z0-9]+$/.test(control.value)) return { errorMessage: 'Special Characters are not Allowed' }
    return null;
  }

  showColumnApiErrorMessage(index) {
    const fieldObject = (this.columnFormArray.controls[index] as FormArray).controls['columnKey'];
    return (this.submitButtonClicked || fieldObject.touched) && fieldObject.errors?.errorMessage;
  }

  backToTable(message) {
    this.router.navigate(['dashboard', 'data-table']);
  }

}
