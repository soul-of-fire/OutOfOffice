import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { Calendar } from '@ionic-native/calendar';
import { NativeCalendarPage } from '../native-calendar/native-calendar';
import { AngularCalendarPage } from '../angular-calendar/angular-calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public currentEvents = [
    {
      year: 2018,
      month: 11,
      date: 25
    },
    {
      year: 2018,
      month: 11,
      date: 26
    }
  ];

  constructor(public navCtrl: NavController) { }

  onNativeCalendar() {
    this.navCtrl.push(NativeCalendarPage)
  }

  onAngularCalendar() {
    this.navCtrl.push(AngularCalendarPage)
  }

  onDaySelect($event) {
    console.log($event);
  }
}
