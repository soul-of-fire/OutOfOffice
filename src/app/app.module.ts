import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEventPage } from '../pages/add-event/add-event';
import { CalendarModule } from 'ionic3-calendar-en';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessagesPage } from '../pages/messages/messages';
import { EditEventPage } from '../pages/add-event/edit-event';
import { EventService } from '../providers/event-service';
import { UtilsService } from '../providers/utils-service';
import { Network } from '@ionic-native/network';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [
    MyApp,
    HomePage,
    AddEventPage,
    EditEventPage,
    LoginPage,
    MessagesPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEventPage,
    EditEventPage,
    LoginPage,
    MessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    UtilsService,
    Network
  ]
})
export class AppModule {}
