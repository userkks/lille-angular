import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreationFormComponent } from './table-creation-form.component';

describe('TableCreationFormComponent', () => {
  let component: TableCreationFormComponent;
  let fixture: ComponentFixture<TableCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
