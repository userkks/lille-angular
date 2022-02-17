import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-creation-form',
  templateUrl: './table-creation-form.component.html',
  styleUrls: ['./table-creation-form.component.css']
})
export class TableCreationFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  tableCreationForm: FormGroup;
  dataSaving = false;
  dataTypeList = ['String', 'Number', 'Boolean', 'Object', 'Array']

  ngOnInit(): void {
    this.tableCreationForm = this.fb.group({
      tableName: ['', Validators.required],
      apiKey: ['', Validators.required],
      columnFormArray: this.fb.array([this.columnFormGroup()])
    })
  }

  columnFormGroup(): FormGroup {
    return this.fb.group({
      columnName: ['', Validators.required],
      columnKey: ['', Validators.required],
      columnType: [null, Validators.required],
      defaultValue: ['']
    })
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
    return this.tableCreationForm.controls[field].touched && this.tableCreationForm.controls[field].invalid;
  }

  showColumnErrorMessage(columnNo, field) {
    const fieldObject = (this.columnFormArray.controls[columnNo] as FormArray).controls[field];
    return fieldObject.touched && fieldObject.invalid;
  }

}
