import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { CommunicationService } from '../common/communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private communicationService: CommunicationService, private commonService: CommonService) {}

  @ViewChild('sidebar')
  sidebar: ElementRef;

  subscription: Subscription = new Observable().subscribe();
  sidebarOpen = false;
  sidebarWidth = '-75%';
  profileObject = environment.profile;

  closeSidebar(): void {
    this.communicationService.sidebarService.next(false);
  }

  logoutSession() {
    this.commonService.logoutSession().subscribe((res) => {
      window.location.reload();
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const siderbarSubscription = this.communicationService.sidebarService.subscribe(
      (res) => {
        if (res) {
          this.sidebarOpen = true;
          this.sidebar.nativeElement.style.left = "0%";
        } else {
          this.sidebarOpen = false;
          this.sidebar.nativeElement.style.left = this.sidebarWidth;
        }
      }
    );
    this.subscription.add(siderbarSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
