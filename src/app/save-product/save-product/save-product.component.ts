import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkIfErrorInputField } from '../../common/commonMethods';
import { CommonService } from '../../common/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private commonService: CommonService) { }

  shortPointList = [];
  specificationList = [];
  specificationListToShow = [];
  keywordListToShow = [];
  saveProductForm: FormGroup;
  keywordSuggestionFetchSubscription: Subscription;
  keywordSuggestion = '';
  subscription: Subscription;

  // creating the short points from the pipe separated string
  shortPointsFieldChange(event: any): void {
    const filteredShortPointList = [];
    const fieldValue = event.target.value;
    const tempPointList = fieldValue.split('|');
    tempPointList.forEach(eachPoint => {
      eachPoint = eachPoint.trim();
      eachPoint = eachPoint.replace(/ +(?= )/g, '');
      eachPoint !== '' ? filteredShortPointList.push(eachPoint) : null;
    });
    this.shortPointList = filteredShortPointList;
  }

  // triggers on change in specification box  textarea field change
  specificationListBoxChange(event: any): void {
    const fieldValue = event.target.value;
    try {
      const specificationItemList = JSON.parse(fieldValue);
      this.specificationListToShow = this.processSpecificationList(specificationItemList);
    } catch (error) { }
  }

  // process the specification object list to create object list to render in ui
  processSpecificationList(specificationList: any): any {
    const processedSpecificationList = specificationList.map(eachSpecification => {
      const objectKey = Object.keys(eachSpecification)[0].trim().replace(/ +(?= )/g, '');
      const objectValue = eachSpecification[Object.keys(eachSpecification)[0]].trim().replace(/ +(?= )/g, '');
      return { key: objectKey, value: objectValue };
    });
    return processedSpecificationList;
  }

  // validates the productname field
  productNameValidator(control: FormControl): any {
    // console.log(this.saveProductForm);
    if (control.value && control.value.split(' ').length > 2) {
      return { error: 'max 2 words allowed' };
    }
    return null;
  }

  // validates if input is valid json
  jsonValidator(control: FormControl): any {
    try {
      JSON.parse(control.value);
      return null;
    } catch (error) {
      return { error: 'Not proper json format' };
    }
  }

  saveProductSubmit(): void {
    console.log(this.saveProductForm);
    const httpObject = this.createFinalProductObject(this.saveProductForm.value);
    const saveProductSubscription = this.commonService.saveProduct(httpObject).subscribe(res => {
      alert('Product Saved Successfully');
      window.location.reload();
    }, err => {
      alert('Some error occurred please try again');
    });
    this.subscription = saveProductSubscription;
  }

  inputErrorCheck(fieldName: string): any {
    const errorMessage = checkIfErrorInputField(this.saveProductForm, fieldName);
    return errorMessage;
  }

  // returns processed classification types from input field value
  splitAndTrim(valueString): any {
    let sizeList = valueString.split('|');
    sizeList = sizeList.map(size => size.trim().replace(/ +(?= )/g, ''));
    sizeList = sizeList.filter(size => size !== '');
    return sizeList;
  }

  // processing specification list object
  filterSpecificationList(specificationList: any): any {
    const resultList = specificationList.map((eachSpec: any) => {
      const key = eachSpec.key;
      const value = eachSpec.value;
      return { key: value };
    });
    return resultList;
  }

  createFinalProductObject(productObj: any): any {
    const resultObject = {
      mainName: productObj.productName,
      oneLineDescription: productObj.oneLineDescription,
      grossPrice: parseInt(productObj.grossPrice),
      discount: parseInt(productObj.discount),
      actualPrice: parseInt(productObj.actualPrice),
      shortOneLinePoints: this.shortPointList,
      uniqueSingleSpec: JSON.parse(productObj.uniqueSpecification),
      isClassificationAvailable: (productObj.sizeRelatedProperty).trim() !== '' ? true : false,
      classificationName: productObj.sizeRelatedProperty,
      classificationTypes: this.splitAndTrim(productObj.propertyClassification),
      productSpecificationList: this.filterSpecificationList(this.specificationListToShow),
      aboutProduct: productObj.aboutProductDescription,
      productImageList: this.splitAndTrim(productObj.productImageLink),
      productUrlTitle: productObj.productTitleInUrl
    };
    return resultObject;
  }

  // // fetching keyword suggestions for product
  // fetchKeywordSuggestion(keyword): any {
  //   if (this.keywordSuggestionFetchSubscription && !this.keywordSuggestionFetchSubscription.closed) {
  //     this.keywordSuggestionFetchSubscription.unsubscribe();
  //   }
  //   this.keywordSuggestionFetchSubscription = this.commonService.fetchKeywordSuggestion(keyword).subscribe((res: any) => {
  //     this.keywordSuggestion = res;
  //   }, (error) => {
  //     alert('Getting network issue to fetch keyword suggestions');
  //   });
  //   // this.keywordSuggestionFetchSubscription = keywordSubscription;
  // }

  // // triggers on each key up in keyword field
  // keywordFieldChange(textString): any {
  //   this.keywordListToShow = this.splitAndTrim(textString);
  //   if (textString[textString.length - 1] === '|') {
  //     this.keywordSuggestionFetchSubscription.unsubscribe();
  //   } else {
  //     this.fetchKeywordSuggestion(this.keywordListToShow[this.keywordListToShow.length - 1]);
  //   }

  // }

  // changes the value in the keyword box and updates the keywords in show area
  // clickOnSuggestion(): void {
  //   this.keywordListToShow = this.keywordListToShow.pop().push(this.keywordSuggestion);
  //   const textString = this.keywordListToShow.join('|');
  //   this.saveProductForm.controls.productKeyword.setValue(textString);
  // }

  ngOnInit(): void {
    this.saveProductForm = this.fb.group({
      productName: ['', [Validators.required, this.productNameValidator]],
      oneLineDescription: ['', Validators.required],
      grossPrice: ['', Validators.required],
      discount: ['', Validators.required],
      actualPrice: ['', Validators.required],
      shortPoints: ['', Validators.required],
      uniqueSpecification: ['', [Validators.required, this.jsonValidator]],
      sizeRelatedProperty: [''],
      propertyClassification: [''],
      productSpecification: ['', [Validators.required, this.jsonValidator]],
      productImageLink: ['', Validators.required],
      aboutProductDescription: ['', Validators.required],
      productTitleInUrl: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
