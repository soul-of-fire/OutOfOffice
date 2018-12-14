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
  constructor(public navCtrl: NavController) { }

  onNativeCalendar() {
    this.navCtrl.push(NativeCalendarPage)
  }

  onAngularCalendar() {
    this.navCtrl.push(AngularCalendarPage)
  }
}
