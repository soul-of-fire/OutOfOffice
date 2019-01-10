import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { Calendar } from '@ionic-native/calendar';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { Observer } from 'rxjs/Observer';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('calendar') calendar;
  currentEvents: Observer<any>;
  selected: any;
  
  constructor(public navCtrl: NavController,
    public customEventProvider: CustomEventProvider,
    public storage: Storage) {
    this.currentEvents = customEventProvider.currentEvents;
  }

  ngAfterViewInit(): void {
    this.customEventProvider.calendar = this.calendar;
    this.customEventProvider.loadEvents();
  }

  onDaySelect($event) {
    this.selected = this.customEventProvider.findEvent($event, null);
  }

  onAddEvent() {
    this.navCtrl.push(AddEventPage);
  }

  onLogOut() {
    this.storage.remove('user');
    this.navCtrl.push(LoginPage);
  }

  swipe(event) {
    event.direction === 2 && this.calendar.forward();
    event.direction === 4 && this.calendar.back();
  }
}
