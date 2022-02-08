import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/common/communication.service';
import { PopupService } from 'src/app/common/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  popupConfiguration;

  ngOnInit(): void {
    this.popupService.popupSubject.subscribe((res) => {
      this.popupConfiguration = res;
    })
  }

  closePopup() {
    this.popupConfiguration.open = false;
    this.popupService.popupResultSubject.next({key: this.popupConfiguration.key, action:'closed'});
  }

  confirmPopup() {
    this.popupConfiguration.open = false;
    this.popupService.popupResultSubject.next({key: this.popupConfiguration.key, action:'confirmed'});

  }

}
