import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { BrowserAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PopupComponent } from './common-component/popup/popup.component';
import { PopupUsernameComponent } from './common-component/popup-username/popup-username.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './common-component/notification/notification.component';
import { NotificationContentComponent } from './common-component/notification/notification-content/notification-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    TestingComponentComponent,
    SidebarComponent,
    PopupComponent,
    PopupUsernameComponent,
    NotificationComponent,
    NotificationContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
