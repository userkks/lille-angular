import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  popupSubject = new Subject();
  popupResultSubject = new Subject();
  private currentPopupConfiguration;
  notificationSubject = new Subject();


  // expected input object format is 
  // {
  //   open: boolean,
  //   type: string,
  //   closeButton: boolean,
  //   confirmationMessage: string,
  //   key: string
  // }

  openPopup(popupConfiguration) {
    this.currentPopupConfiguration = popupConfiguration;
    this.popupSubject.next(popupConfiguration);
    return this.popupResultSubject.pipe(take(1));
  }

  closePopup(popupKey: String) {
    if (popupKey && this.currentPopupConfiguration.open && this.currentPopupConfiguration.key === popupKey) { 
      this.popupSubject.next({ open: false }); 
    } else if (!popupKey) {
      this.popupSubject.next({ open: false }); 
    }
  }

  openNotification(notificationObject) {
    this.notificationSubject.next(notificationObject);
  }

  getNotificationSubject() {
    return this.notificationSubject;
  }
}
