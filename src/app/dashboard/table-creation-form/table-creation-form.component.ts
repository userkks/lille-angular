import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-creation-form',
  templateUrl: './table-creation-form.component.html',
  styleUrls: ['./table-creation-form.component.css']
})
export class TableCreationFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  tableCreationForm: FormGroup;

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

}
