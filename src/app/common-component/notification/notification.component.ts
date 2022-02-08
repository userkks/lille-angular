import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from 'src/app/common/popup.service';
import { NotificationContentComponent } from './notification-content/notification-content.component'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @ViewChild('notificationWrapperRef', { read: ViewContainerRef })
  VCR: ViewContainerRef;

  childUniqueKey = 0;
  componentRefList = Array<ComponentRef<NotificationContentComponent>>();

  constructor(private popupService: PopupService, private CFR: ComponentFactoryResolver) { }

  notificationConfiguration = {
    open: true,
    type: 'success',
    message: 'This notification looks awesome'
  };
  notificationInShow = false;
  timer;

  createNotificationContent(notificationConfiguration) {
    const componentFactory = this.CFR.resolveComponentFactory(NotificationContentComponent);
    const notificationContentRef = this.VCR.createComponent(componentFactory);
    const notificationContent = notificationContentRef.instance;
    notificationContent.notificationConfiguration = notificationConfiguration;
    notificationContent.uniqueKey = ++this.childUniqueKey;
    this.componentRefList.push(notificationContentRef)
    return notificationContent.uniqueKey;
  }

  removeNotificationContent() {
    const that = this;
    if (this.notificationInShow) {
      window.clearTimeout(that.timer);
      this.timer = setTimeout(function () {
        if (that.VCR.length < 1) return;
        // const componentRef = that.componentRefList.filter(item => item.instance.uniqueKey === uniqueKey)[0];
        // const componentRefIndex = that.VCR.indexOf(componentRef as any);
        // that.VCR.remove(componentRefIndex);
        that.VCR.clear();
        // that.componentRefList = that.componentRefList.filter(item => item.instance.uniqueKey !== uniqueKey);
        that.notificationInShow = false;
      }, 4000);
    }
  }

  subscribeNotificationService() {
    this.popupService.getNotificationSubject().subscribe((res: any) => {
      this.notificationInShow = true;
      this.createNotificationContent(res);
      this.removeNotificationContent();
    });
  }

  ngOnInit(): void {
    console.log('notification component initialized');
    this.subscribeNotificationService();
  }

}
