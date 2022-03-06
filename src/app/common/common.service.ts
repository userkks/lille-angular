import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from './appConstant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  baseUrl = `${environment.BACKEND_URL}/utility`;
  header = environment.header;

  saveProduct(productObject): any {
    return this.http.post(this.baseUrl + Url.saveProductUrl, productObject);
  }

  fetchKeywordSuggestion(keyword): any {
    return this.http.get(this.baseUrl + Url.fetchKeywordSuggestion + keyword);
  }

  fetchProductDetails(productId) {
    return this.http.get(`${this.baseUrl}${Url.fetchProductDetails}${productId}`);
  }

  getDeliveryDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    return currentDate;
  }

  placeOrder(requestObject) {
    return this.http.post(`${this.baseUrl}${Url.placeOrder}`, requestObject);
  }

  fetchProductOnKeyword(keyWord) {
    return this.http.get(`${this.baseUrl}product/query/${keyWord}`);
  }

  fetchSellerDetails(sellerId) {
    return this.http.get(`${this.baseUrl}seller/${sellerId}`);
  }
  // new project
  // utility

  scrollToElment(id) {
    const scrollHeight = document.getElementById(id).getBoundingClientRect().top + scrollY - 60;
    window.scrollTo(0, scrollHeight);
  }

  getIfMobileScreen() {
    return (window.innerWidth < 720)
  }

  // new project
  // api services

  commonGetService(url) {
    return this.http.get(`${url}`, this.header);
  }

  saveApiData(dataObj) {
    return this.http.post(`${this.baseUrl}/saveData`, dataObj, this.header);
  }

  checkApiPathValid(apiPath) {
    return this.http.get(`${this.baseUrl}/checkApiValid/${apiPath}`, this.header);
  }

  fetchBlogPost(blogTitle) {
    return this.http.get(`${this.baseUrl}/blogPost/${blogTitle}`, this.header);
  }

  fetchAllPosts() {
    return this.http.get(`${this.baseUrl}/blogPost/getAllPosts`, this.header);
  }

  fetchProfile() {
    return this.http.get(`${this.baseUrl}/getProfile`, this.header);
  }

  logoutSession() {
    return this.http.post(`${this.baseUrl}/login/logout`, {}, {...this.header, headers: {'Content-Type': 'application/json'}});
  }

  checkUserNameValid(userName) {
    return this.http.get(`${this.baseUrl}/userName/checkUserNameValid/${userName}`, this.header);
  }

  saveUserName(userName) {
    return this.http.get(`${this.baseUrl}/userName/saveUserName/${userName}`, this.header);
  }

  fetchAllApi() {
    return this.http.get(`${this.baseUrl}/userApi/getAllApi`, this.header);
  }

  saveUserApiData(dataObj) {
    return this.http.post(`${this.baseUrl}/userApi/createUserApi`, dataObj, this.header);
  }

  checkUserApiPathValid(apiPath) {
    return this.http.get(`${this.baseUrl}/userApi/checkUserApiValid/${apiPath}`, this.header);
  }

  updateUserApiData(dataObj) {
    return this.http.post(`${this.baseUrl}/userApi/updateUserApi`, dataObj, this.header);
  }

  deleteUserApi(dataObj) {
    return this.http.post(`${this.baseUrl}/userApi/deleteUserApi`, dataObj, this.header);
  }

  createNewTable(dataObj) {
    return this.http.post(`${this.baseUrl}/userApi/createNewTable`, dataObj, this.header);
  }

  getAllTable() {
    return this.http.get(`${this.baseUrl}/userApi/getAllTable`, this.header);
  }

  getTableData(tableKey) {
    return this.http.get(`${this.baseUrl}/userApi/getTableData/${tableKey}`, this.header);
  }

}
