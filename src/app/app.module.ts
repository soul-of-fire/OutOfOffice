import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEventPage } from '../pages/add-event/add-event';
import { CalendarModule } from 'ionic3-calendar-en';
import { CustomEventProvider } from '../providers/custom-event/custom-event';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [
    MyApp,
    HomePage,
    AddEventPage,
    LoginPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEventPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomEventProvider
  ]
})
export class AppModule {}
