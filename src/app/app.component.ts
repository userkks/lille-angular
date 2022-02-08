import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { removableStorageKeyList } from './common/appConstant';
import { CommonService } from './common/common.service';
import { CommunicationService } from './common/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-project';

  constructor(private router: Router, private commonService: CommonService, private communicationService: CommunicationService) { }

  isSellerApp: Boolean = false;
  profile;

  ngOnInit(): void {
    for (const eachKey of removableStorageKeyList) {
      localStorage.removeItem(eachKey);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSellerApp = event.url === '/seller';
      }
    });
    this.commonService.fetchProfile().subscribe((res: any) => {
      this.profile = res;
      environment.profile = res;    
    }, (error) => {
      console.log(error);
    })
  }
}
