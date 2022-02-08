import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-popup-username',
  templateUrl: './popup-username.component.html',
  styleUrls: ['./popup-username.component.css']
})
export class PopupUsernameComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonService) { }

  apiSubscription;
  subscription: Subscription = new Observable().subscribe();
  userNameValidationError = '';
  userNameValidationSubscription: Subscription;
  userNameFieldValue = '';

  ngOnInit(): void {
  }

  userNameValidation(event) {
    const fieldValue = event.target.value;
    if (!fieldValue) {
      this.userNameValidationError = '';
      return;
    }
    const validationRegex = /^[a-zA-Z0-9]+$/;
    if (validationRegex.test(fieldValue)) {
      if (this.userNameValidationSubscription && !this.userNameValidationSubscription.closed) {
        this.userNameValidationSubscription.unsubscribe();
      }
      this.userNameValidationSubscription = this.commonService.checkUserNameValid(fieldValue).subscribe(
        res => {
          this.userNameValidationError = "";
        },
        error => {
          this.userNameValidationError = "**Please Choose Another. Someone Already Using this Path";
        }
      );
    } else {
      this.userNameValidationError = "Special Characters are not Allowed"
    }

  }

  saveUserName() {
    if (!this.userNameFieldValue) {
      return;
    }
    this.commonService.saveUserName(this.userNameFieldValue).subscribe((res) => {
      window.location.reload();
    }, (error) => {
      console.log(error);
      this.userNameValidationError = "Some error occurred";
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
