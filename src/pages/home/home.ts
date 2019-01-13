import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { CustomEventProvider } from '../../providers/custom-event/custom-event';
import { Observer } from 'rxjs/Observer';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import firebase from 'Firebase';
import { Observable } from 'rxjs/Observable';
import Rx from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('calendar') calendar;
  selected: any;
  currentEvents: any;
  
  constructor(public navCtrl: NavController,
    public customEventProvider: CustomEventProvider,
    public storage: Storage) {
  }

  ngAfterViewInit(): void {
    this.customEventProvider.calendar = this.calendar;
    // this.customEventProvider.loadEvents();
    this.currentEvents = Rx.Observable.fromEvent(firebase.database().ref('calendar'), 'value').pipe(
      map((data: any) =>  data.val() && data.val().data || [])
    );
  }
  
  onDaySelect($event) {
    this.selected = this.customEventProvider.findEvent($event, null);
    // console.log($event);
    // this.selected = this.currentEvents.pipe(
    //   filter((e: any) => {
    //     console.log(e)
    //     return e.year == $event.year && e.month == $event.month && e.date == $event.date;
    //   })
    // )
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
