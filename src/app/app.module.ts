import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DatePipe } from '@angular/common';
import { ToastNotificationsModule } from "ngx-toast-notifications"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNotificationsModule.forRoot({duration: 6000, type: 'primary',position: 'top-right'}),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
