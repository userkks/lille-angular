import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  pathToTitleMapping = {
    '/blog': 'Lille | Blog',
    '/blog/simplifying-api-development-with-lille': 'Simplifying API development with Lille | Lille',
    '/blog/how-to-develop-apis-without-prior-coding-knowledge': 'How to develop APIs without prior coding knowledge, with Lille | Lille',
    'default': 'Create API Instantly - Streamline Your Backend Development'
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.title = this.pathToTitleMapping[event.url] || this.pathToTitleMapping.default;
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
