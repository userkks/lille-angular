import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.css']
})
export class NotificationContentComponent implements OnInit {

  constructor() { }

  public notificationConfiguration: any;
  public uniqueKey: number;
  
  ngOnInit(): void {
  }

}
