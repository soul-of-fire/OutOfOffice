import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEventPage } from '../pages/add-event/add-event';
import { NativeCalendarPage } from '../pages/native-calendar/native-calendar';
import { AngularCalendarPage } from '../pages/angular-calendar/angular-calendar';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';
import { CalendarModule } from 'ionic3-calendar-en';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEventPage,
    NativeCalendarPage,
    AngularCalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEventPage,
    NativeCalendarPage,
    AngularCalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    CustomEventTitleFormatterProvider,
    CustomDateFormatterProvider
  ]
})
export class AppModule {}
