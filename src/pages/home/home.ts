import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { Calendar } from '@ionic-native/calendar';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('calendar') calendar;
  currentEvents: Observer<any>;
  selected: any;

  constructor(public navCtrl: NavController,
    public customEventProvider: CustomEventProvider) {
    this.currentEvents = customEventProvider.currentEvents;
  }

  ngAfterViewInit(): void {
    this.customEventProvider.calendar = this.calendar;
  }

  onDaySelect($event) {
    this.selected = this.customEventProvider.findEvent($event);
  }

  onAddEvent() {
    this.navCtrl.push(AddEventPage);
  }
}
