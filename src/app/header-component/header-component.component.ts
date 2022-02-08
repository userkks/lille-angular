import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { CommunicationService } from '../common/communication.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
})
export class HeaderComponentComponent implements OnInit, OnDestroy {

  constructor(
    private communicationService: CommunicationService,
    private commonService: CommonService
  ) { }

  profileObject = environment.profile;

  openSideBar(): void {
    this.communicationService.sidebarService.next(true);
  }

  logoutSession() {
    this.commonService.logoutSession().subscribe((res) => {
      window.location.reload();
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit(): void { }

  profile = environment.profile;

  ngOnDestroy(): void { }
}
