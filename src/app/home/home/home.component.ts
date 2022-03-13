import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  apiPath = "";
  jsonField = "";
  responseApiPath;
  responseApiObject;
  messageContent = { status: "", message: "" };
  subscription: Subscription = new Observable().subscribe();
  apiPathValidationSubscription: Subscription;
  apiPathValidationError;
  jsonFieldValidationError;
  savingData = false;
  profile = environment.profile;

  ngOnInit(): void {
  }

  saveApiData() {
    if (this.apiPathValidationError || this.jsonFieldValidationError || !this.apiPath || !this.jsonField) {
      return;
    }
    this.savingData = true;
    const dataObject = {
      apiName: this.apiPath,
      responseBody: JSON.parse(this.jsonField)
    }
    const saveDataSubscription = this.commonService.saveApiData(dataObject).subscribe(
      (res: any) => {
        this.responseApiPath = res.apiName;
        this.responseApiObject = res.responseBody;
        this.messageContent = {
          status: "success",
          message: "New api created!! Access your api from anywhere."
        };
        this.savingData = false;
        if (window.outerWidth < 650)
          window.scrollTo(0, 1300);
      }, error => {
        this.responseApiPath = "";
        this.responseApiObject = "";
        this.messageContent = {
          status: "error",
          message: error.error.message || "Some error occurred. Try again."
        }
        console.log(error);
        this.savingData = false;
      }
    );
    this.subscription.add(saveDataSubscription);
  }

  apiPathValidation(event) {
    const fieldValue = event.target.value;
    if (!fieldValue) {
      this.apiPathValidationError = '';
      return;
    }
    const validationRegex = /^[a-zA-Z0-9]+$/
    if (validationRegex.test(fieldValue)) {
      if (this.apiPathValidationSubscription && !this.apiPathValidationSubscription.closed) {
        this.apiPathValidationSubscription.unsubscribe();
      }
      this.apiPathValidationSubscription = this.commonService.checkApiPathValid(fieldValue).subscribe(
        res => {
          this.apiPathValidationError = "";
        },
        error => {
          this.apiPathValidationError = "**Please Choose Another. Someone Already Using this Path";
        }
      );
    } else {
      this.apiPathValidationError = "Special Characters are not Allowed"
    }
  }

  jsonFieldValidation(event) {
    const fieldValue = event.target.value;
    if (!fieldValue) {
      this.jsonFieldValidationError = '';
      return;
    }
    try {
      JSON.parse(fieldValue);
      this.jsonFieldValidationError = "";
    } catch (error) {
      this.jsonFieldValidationError = "**Not a Valid JSON Input";
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
