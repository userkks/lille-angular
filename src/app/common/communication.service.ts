import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  
  private _searchQueryResult;
  public get searchQueryResult() {
    return this._searchQueryResult;
  }
  public set searchQueryResult(value) {
    this._searchQueryResult = value;
  }

  sidebarService = new BehaviorSubject(false);
  profileDetails = new BehaviorSubject(null);

  constructor() {}
}
