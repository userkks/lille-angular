import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUsernameComponent } from './popup-username.component';

describe('PopupUsernameComponent', () => {
  let component: PopupUsernameComponent;
  let fixture: ComponentFixture<PopupUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
