import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { CommunicationService } from 'src/app/common/communication.service';
import { environment } from 'src/environments/environment';
import { PopupService } from 'src/app/common/popup.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private communicationService: CommunicationService, private commonService: CommonService, private popupService: PopupService) { }

  subscription: Subscription = new Observable().subscribe();
  apiPathValidationSubscription;
  apiList = [];
  apiPathValidationError;
  apiPath = '';
  jsonField = '';
  jsonFieldValidationError;
  responseApiPath;
  responseApiObject;
  savingData = false;
  messageContent;
  env = environment;
  apiFormState = 'create';
  popupResultSubscription;

  ngOnInit(): void {
    if (!environment.profile) {
      this.router.navigate(['home']);
    } else if (!environment.profile.userName) {
      this.popupService.openPopup({
        open: true,
        type: "userName",
        closeButton: false,
        key: 'userNameRegistration'
      });
    } else {
      this.fetchApiList();
    }
  }

  fetchApiList() {
    this.subscription.add(this.commonService.fetchAllApi().subscribe((res: any) => {
      this.apiList = res;
    }, (error) => {
      console.log(error);
    }));
  }

  apiPathValidation(event) {
    const fieldValue = event.target.value;
    if (!fieldValue) {
      this.apiPathValidationError = '';
      return;
    }
    const validationRegex = /^[a-zA-Z0-9]+$/;
    if (validationRegex.test(fieldValue)) {
      if (this.apiPathValidationSubscription && !this.apiPathValidationSubscription.closed) {
        this.apiPathValidationSubscription.unsubscribe();
      }
      this.apiPathValidationSubscription = this.commonService.checkUserApiPathValid(fieldValue).subscribe(
        res => {
          this.apiPathValidationError = "";
        },
        error => {
          this.apiPathValidationError = "**Please Choose Another. Path already exists";
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

  saveApiData() {
    if (this.apiPathValidationError || this.jsonFieldValidationError || !this.apiPath || !this.jsonField) {
      return;
    }
    this.savingData = true;
    const dataObject = {
      apiName: this.apiPath,
      responseBody: JSON.parse(this.jsonField)
    }
    const subscriptionObject = this.apiFormState === 'create' ? this.commonService.saveUserApiData(dataObject) : this.commonService.updateUserApiData(dataObject);
    const saveDataSubscription = subscriptionObject.subscribe(
      (res: any) => {
        this.responseApiPath = res.apiName;
        this.responseApiObject = res.responseBody;
        this.messageContent = {
          status: "success",
          message: this.apiFormState === 'create' ? "New api created!! Access your api from anywhere." :
            "Api updated successfully!! Access your api from anywhere."
        };
        this.savingData = false;
        this.popupService.openNotification({
          type: 'success',
          open: true,
          message: this.apiFormState === 'create' ? 'New Api Created Successfully' : 'Api Updated Successfully'
        })
        if (this.commonService.getIfMobileScreen())
          this.commonService.scrollToElment('readOnlyField');
        this.fetchApiList();
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

  editApi(editItem) {
    if (editItem.type === 'POST') {
      this.router.navigate(['dashboard', 'data-table']);
    } else {
      this.apiFormState = 'edit';
      this.resetFormState();
      this.apiPath = editItem.key;
      this.commonService.scrollToElment('createOrEditButton');
      this.commonService.commonGetService(editItem.url).subscribe((res) => {
        this.jsonField = JSON.stringify(res);
      }, (error) => {
        console.log(error);
      })
    }
  }

  deleteApi(item) {
    this.popupResultSubscription = this.popupService.openPopup({
      open: true,
      type: 'confirmation',
      closeButton: true,
      confirmationMessage: `This api "${item.url}" and all it's data will be deleted. This action is not reversible.Do you want to continue?`,
      key: 'deleteConfirmation'
    }).subscribe((res: any) => {
      if (res.action === 'confirmed') {
        this.subscription.add(this.commonService.deleteUserApi({ key: item.key, type: item.type }).subscribe((res) => {
          // here an alert need to be added on success
          this.popupService.openNotification({
            open: true,
            message: 'API Deleted Successfully',
            type: 'success'
          });
          this.fetchApiList();
        }, (error) => {
          console.log(error);
          this.popupService.openNotification({
            open: true,
            message: 'Some Error Occurred. Please Try Again.'
          });
          this.fetchApiList();
        }))
      }
    });
  }

  topCreateNewButtonClick() {
    if (this.apiFormState === 'edit') {
      this.apiFormState = 'create';
      this.resetFormState();
    }
    this.commonService.scrollToElment('createOrEditButton');
  }

  goToDataTable() {
    this.router.navigate(['dashboard', 'data-table']);
  }

  resetFormState() {
    this.apiPathValidationError = '';
    this.jsonFieldValidationError = '';
    this.apiPath = '';
    this.jsonField = '';
    this.messageContent = null;
    this.responseApiPath = '';
    this.responseApiObject = '';
  }

  ngOnDestroy(): void {
    // closing the popup
    if (environment.profile && !environment.profile.userName) {
      this.popupService.closePopup('userNameRegistration');
    }
    this.subscription.unsubscribe();
    this.popupResultSubscription?.unsubscribe();
  }

}
